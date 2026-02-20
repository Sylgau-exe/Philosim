// api/auth/google/callback.js - Handle Google OAuth callback with state verification
import { UserDB } from '../../../lib/db.js';
import { generateToken } from '../../../lib/auth.js';

function getCookie(req, name) {
  const cookie = req.headers.cookie || '';
  const match = cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? match[1] : null;
}

export default async function handler(req, res) {
  const { code, error, state } = req.query;

  if (error) return res.redirect('/?error=google_auth_failed');
  if (!code) return res.redirect('/?error=no_code');

  // Check state nonce — prevents duplicate callback processing
  const savedState = getCookie(req, 'oauth_state');
  if (!savedState || savedState !== state) {
    console.log('OAuth state mismatch (duplicate callback), yielding');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-store');
    // Return HTML that polls for token (cookie or localStorage) set by the real callback
    return res.end(`<!DOCTYPE html><html><head></head>
<body style="background:#05050a;color:#888;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
<p>Signing in...</p>
<script>
var c=0,i=setInterval(function(){c++;
var t=localStorage.getItem('auth_token');
if(!t){var m=document.cookie.match(/(?:^|;\\s*)auth_token=([^;]*)/);if(m){t=m[1];localStorage.setItem('auth_token',t);document.cookie='auth_token=;Path=/;Max-Age=0';}}
if(t){clearInterval(i);window.location.replace('/app');}
else if(c>40){clearInterval(i);window.location.replace('/');}
},150);
</script></body></html>`);
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const host = req.headers.host;
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${protocol}://${host}/api/auth/google/callback`;

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code, client_id: clientId, client_secret: clientSecret,
        redirect_uri: redirectUri, grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return res.redirect('/?error=token_exchange_failed');
    }

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await userInfoResponse.json();
    if (!googleUser.email) return res.redirect('/?error=no_email');

    let user = await UserDB.findByEmail(googleUser.email);
    if (!user) {
      user = await UserDB.createGoogleUser(googleUser.email, googleUser.name || googleUser.email.split('@')[0], googleUser.id);
    } else if (!user.google_id) {
      await UserDB.linkGoogleAccount(user.id, googleUser.id);
    }

    console.log('Google OAuth: SUCCESS', googleUser.email);
    const token = generateToken(user);

    // Set cookie (processed at HTTP level even if browser shows the other response)
    // AND return HTML that saves to localStorage (if this page renders)
    res.setHeader('Set-Cookie', [
      'oauth_state=; Path=/; Max-Age=0',
      `auth_token=${token}; Path=/; SameSite=Lax; Secure; Max-Age=300`
    ]);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(`<!DOCTYPE html><html><head></head>
<body style="background:#05050a;color:white;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
<p>Welcome! Redirecting...</p>
<script>
localStorage.setItem('auth_token','${token}');
document.cookie='auth_token=;Path=/;Max-Age=0';
window.location.replace('/app');
</script></body></html>`);
  } catch (err) {
    console.error('Google OAuth error:', err);
    res.redirect('/?error=auth_failed');
  }
}
