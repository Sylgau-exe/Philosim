// api/auth/google/callback.js - Handle Google OAuth callback (from BizSimHub)
import { UserDB } from '../../../lib/db.js';
import { generateToken } from '../../../lib/auth.js';

export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) return res.redirect('/?error=google_auth_failed');
  if (!code) return res.redirect('/?error=no_code');

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `https://${req.headers.host}/api/auth/google/callback`;

    // Exchange code for tokens
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
        // Parallel request likely succeeded — wait for its cookie then redirect
        res.setHeader('Content-Type', 'text/html');
        return res.end(`<!DOCTYPE html><html><head><script>setTimeout(function(){window.location.href='/app';},1500);</script></head><body style="background:#05050a;color:#9ca3af;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">Completing sign in...</body></html>`);
      }
      return res.redirect('/?error=token_exchange_failed');
    }

    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await userInfoResponse.json();

    if (!googleUser.email) return res.redirect('/?error=no_email');

    // Find or create user
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
    
    // Set token as cookie and redirect to app
    res.setHeader('Set-Cookie', `auth_token=${token}; Path=/; HttpOnly=false; SameSite=Lax; Secure; Max-Age=604800`);
    res.redirect('/app');
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/?error=auth_failed');
  }
}
