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
  // Also carry UTM params through OAuth flow
  const { utm_source, utm_medium, utm_campaign } = req.query;
  const cookies = [
    `oauth_state=${state}; Path=/; SameSite=Lax; Secure; Max-Age=300`
  ];
  if (utm_source || utm_medium || utm_campaign) {
    const utmData = JSON.stringify({ source: utm_source || '', medium: utm_medium || '', campaign: utm_campaign || '' });
    cookies.push(`oauth_utm=${encodeURIComponent(utmData)}; Path=/; SameSite=Lax; Secure; Max-Age=300`);
  }
  res.setHeader('Set-Cookie', cookies);

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
