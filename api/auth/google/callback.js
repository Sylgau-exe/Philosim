// api/auth/google/callback.js - Handle Google OAuth callback
import { UserDB } from '../../../lib/db.js';
import { generateToken } from '../../../lib/auth.js';

export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) return res.redirect('/?error=google_auth_failed');
  if (!code) return res.redirect('/?error=no_code');

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
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      if (tokenData.error === 'invalid_grant') {
        // Race condition: parallel request used this code.
        // Return HTML that polls for the auth cookie (set by the successful parallel response)
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'no-store');
        return res.end(`<!DOCTYPE html><html><head><title>Signing in...</title></head>
<body style="background:#05050a;color:white;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
<div style="text-align:center"><p>Completing sign-in...</p></div>
<script>
var checks = 0;
var interval = setInterval(function() {
  checks++;
  // Check for cookie set by the successful parallel callback
  var match = document.cookie.match(/(?:^|;\\s*)auth_token=([^;]*)/);
  if (match) {
    clearInterval(interval);
    localStorage.setItem('auth_token', match[1]);
    document.cookie = 'auth_token=; Path=/; Max-Age=0';
    window.location.href = '/app';
  } else if (checks > 30) {
    clearInterval(interval);
    window.location.href = '/';
  }
}, 200);
</script></body></html>`);
      }
      return res.redirect('/?error=token_exchange_failed');
    }

    // Get user info
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await userInfoResponse.json();
    if (!googleUser.email) return res.redirect('/?error=no_email');

    let user = await UserDB.findByEmail(googleUser.email);
    let isNewUser = false;

    if (!user) {
      user = await UserDB.createGoogleUser(
        googleUser.email,
        googleUser.name || googleUser.email.split('@')[0],
        googleUser.id
      );
      isNewUser = true;
    } else if (!user.google_id) {
      await UserDB.linkGoogleAccount(user.id, googleUser.id);
    }

    console.log('Google OAuth:', isNewUser ? 'NEW USER' : 'EXISTING USER', googleUser.email);

    const token = generateToken(user);

    // Set cookie AND redirect — cookie survives even if this is a prefetch response
    res.setHeader('Set-Cookie', `auth_token=${token}; Path=/; SameSite=Lax; Secure; Max-Age=604800`);
    res.redirect(`/?token=${token}`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/?error=auth_failed');
  }
}
