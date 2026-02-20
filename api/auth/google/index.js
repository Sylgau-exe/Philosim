// api/auth/google/index.js - Initiate Google OAuth with state nonce
export default async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const host = req.headers.host;
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${protocol}://${host}/api/auth/google/callback`;
  const scope = encodeURIComponent('email profile');

  // Generate random state to prevent duplicate callbacks
  const state = Math.random().toString(36).substring(2) + Date.now().toString(36);

  // Store state in cookie so callback can verify
  res.setHeader('Set-Cookie', `oauth_state=${state}; Path=/; SameSite=Lax; Secure; Max-Age=300`);

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${scope}` +
    `&access_type=offline` +
    `&prompt=consent` +
    `&state=${state}`;

  res.redirect(googleAuthUrl);
}
