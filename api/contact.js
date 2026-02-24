// api/contact.js - Contact form handler for PhiloSim
import { sendEmail } from '../lib/email.js';
import { cors } from '../lib/auth.js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sgauthier@executiveproducer.ca';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, type, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const typeLabels = {
    bug: '🐛 Bug Report',
    feedback: '💡 Feedback',
    question: '❓ Question',
    partnership: '🤝 Partnership',
    other: '📩 Other'
  };

  const subject = `[PhiloSim] ${typeLabels[type] || '📩 Contact'} from ${name}`;

  try {
    await sendEmail({
      to: ADMIN_EMAIL,
      subject,
      replyTo: email,
      html: `
        <h2>${typeLabels[type] || 'Contact Form'}</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Type:</strong> ${type || 'general'}</p>
        <hr>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color:#888;font-size:12px;">Sent from PhiloSim contact form</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err);
    return res.status(500).json({ error: 'Failed to send message: ' + err.message });
  }
}
