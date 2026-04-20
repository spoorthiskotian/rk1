import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  const { form_type, name, email, phone, company, subject, message } = req.body || {};
  if (!form_type || !['business', 'personal'].includes(form_type)) {
    return res.status(400).json({ error: 'Invalid form_type' });
  }
  if (!name) return res.status(400).json({ error: 'Name required' });
  await query(
    `INSERT INTO contact_messages (form_type, name, email, phone, company, subject, message)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [form_type, name, email || null, phone || null, company || null, subject || null, message || null]
  );
  res.status(201).json({ ok: true });
});

router.get('/', requireAuth, async (_req, res) => {
  const rows = await query('SELECT * FROM contact_messages ORDER BY id DESC');
  res.json(rows);
});

export default router;
