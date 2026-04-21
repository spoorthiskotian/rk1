import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

let transporter = null;
if (host && user && pass) {
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendContactMail(payload) {
  if (!transporter) {
    console.warn('[mailer] SMTP not configured — skipping email');
    return;
  }
  const to = process.env.MAIL_TO || 'spoorthisk24@gmail.com';
  const from = process.env.MAIL_FROM || user;
  const { form_type, name, email, phone, company, subject, message } = payload;

  const isBusiness = form_type === 'business';
  const label = isBusiness ? 'Business Inquiry' : 'Personal Message';
  const subjectLine = `[${label}] ${subject || name}`;

  const lines = [
    `New ${label.toLowerCase()} from the portfolio site.`,
    '',
    `Name:     ${name}`,
    email   ? `Email:    ${email}`   : null,
    phone   ? `Phone:    ${phone}`   : null,
    company ? `Company:  ${company}` : null,
    subject ? `Subject:  ${subject}` : null,
    '',
    'Message:',
    message || '(no message)',
  ].filter(Boolean);

  await transporter.sendMail({
    from,
    to,
    replyTo: email || undefined,
    subject: subjectLine,
    text: lines.join('\n'),
  });
}
