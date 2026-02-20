// lib/email.js - Email service using Resend for PhiloSim
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'PhiloSim <noreply@philosim.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sgauthier@executiveproducer.ca';

export async function sendEmail({ to, subject, html, text, replyTo }) {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    throw new Error('Email service not configured');
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_EMAIL, to: Array.isArray(to) ? to : [to], subject, html, text, reply_to: replyTo }),
  });
  const data = await response.json();
  if (!response.ok) { console.error('Resend API error:', data); throw new Error(data.message || 'Failed to send email'); }
  return data;
}

export async function sendPasswordResetEmail({ name, email, resetToken, resetUrl }) {
  const firstName = name ? name.split(' ')[0] : 'there';
  const fullResetUrl = resetUrl || `https://philosim.vercel.app?reset_token=${resetToken}`;
  const html = `<!DOCTYPE html><html><head><style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6;color:#e5e5e5;background:#0a0a0f;}
    .container{max-width:600px;margin:0 auto;padding:40px 20px;}
    .card{background:#141420;border-radius:16px;overflow:hidden;border:1px solid rgba(212,168,83,0.2);}
    .header{background:linear-gradient(135deg,#d4a853 0%,#b8923e 100%);color:#0a0a0f;padding:40px 30px;text-align:center;}
    .header h1{margin:0;font-size:24px;font-weight:700;}
    .content{padding:40px 30px;color:#ccc;}
    .cta{text-align:center;margin:32px 0;}
    .cta a{display:inline-block;background:linear-gradient(135deg,#d4a853,#b8923e);color:#0a0a0f;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;}
    .warning{background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:16px;margin:24px 0;font-size:14px;color:#f59e0b;}
    .footer{text-align:center;padding:24px;color:#6b7280;font-size:14px;border-top:1px solid rgba(255,255,255,0.06);}
  </style></head><body><div class="container"><div class="card">
    <div class="header"><h1>🏛️ Reset Your Password</h1></div>
    <div class="content">
      <p>Hi ${firstName},</p>
      <p>We received a request to reset your PhiloSim password. Click below to create a new one:</p>
      <div class="cta"><a href="${fullResetUrl}">Reset Password</a></div>
      <div class="warning">⚠️ This link expires in 1 hour. If you didn't request this, ignore this email.</div>
      <p style="word-break:break-all;color:#d4a853;font-size:13px;">${fullResetUrl}</p>
    </div>
    <div class="footer"><p>© 2026 PhiloSim by Panda Projet · Sylvain PMO Consulting</p></div>
  </div></div></body></html>`;
  return sendEmail({ to: email, subject: 'Reset your PhiloSim password 🏛️', html, text: `Reset your PhiloSim password: ${fullResetUrl}` });
}

export async function sendWelcomeEmail({ name, email }) {
  const firstName = name ? name.split(' ')[0] : 'there';
  const html = `<!DOCTYPE html><html><head><style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6;color:#e5e5e5;background:#0a0a0f;}
    .container{max-width:600px;margin:0 auto;padding:40px 20px;}
    .card{background:#141420;border-radius:16px;overflow:hidden;border:1px solid rgba(212,168,83,0.2);}
    .header{background:linear-gradient(135deg,#d4a853 0%,#b8923e 100%);color:#0a0a0f;padding:40px 30px;text-align:center;}
    .header h1{margin:0 0 8px;font-size:28px;font-weight:700;}
    .content{padding:40px 30px;color:#ccc;}
    .features{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:24px;margin:24px 0;}
    .features p{margin:8px 0;}
    .cta{text-align:center;margin:32px 0;}
    .cta a{display:inline-block;background:linear-gradient(135deg,#d4a853,#b8923e);color:#0a0a0f;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;}
    .footer{text-align:center;padding:24px;color:#6b7280;font-size:14px;border-top:1px solid rgba(255,255,255,0.06);}
  </style></head><body><div class="container"><div class="card">
    <div class="header"><h1>🏛️ Welcome to PhiloSim!</h1><p style="margin:0;opacity:0.8;">Think Like History's Greatest Minds</p></div>
    <div class="content">
      <p>Hi ${firstName},</p>
      <p>Welcome to PhiloSim! You now have access to our philosophical simulation platform.</p>
      <div class="features">
        <p>📖 <strong>Learn the Philosophy</strong> — Video + 5 Pillars per mentor</p>
        <p>🧠 <strong>Test Your Understanding</strong> — Interactive quiz scenarios</p>
        <p>⚡ <strong>Apply Under Pressure</strong> — 5 decisions per workplace dilemma</p>
        <p>📜 <strong>Philosophical Report</strong> — Decision-by-decision analysis</p>
      </div>
      <div class="cta"><a href="https://philosim.vercel.app/app">Start Your First Simulation →</a></div>
      <p>Think wisely!<br><strong>The PhiloSim Team</strong></p>
    </div>
    <div class="footer"><p>© 2026 PhiloSim by Panda Projet · Sylvain PMO Consulting</p></div>
  </div></div></body></html>`;
  return sendEmail({ to: email, subject: `Welcome to PhiloSim, ${firstName}! 🏛️`, html, text: `Welcome to PhiloSim! Start your simulation at https://philosim.vercel.app/app`, replyTo: ADMIN_EMAIL });
}
