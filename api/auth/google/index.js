// api/auth/google/index.js - Initiate Google OAuth
export default async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `https://${req.headers.host}/api/auth/google/callback`;
  const scope = encodeURIComponent('email profile');
  
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${scope}` +
    `&access_type=offline` +
    `&prompt=consent`;

  // Return HTML with JS redirect instead of HTTP 302
  // This prevents browsers from firing duplicate prefetch requests
  res.setHeader('Content-Type', 'text/html');
  res.end(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${googleAuthUrl}"><script>window.location.href="${googleAuthUrl}";</script></head><body>Redirecting to Google...</body></html>`);
}
