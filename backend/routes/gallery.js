import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await query('SELECT * FROM gallery ORDER BY sort_order ASC, id DESC');
  res.json(rows);
});

router.post('/', requireAuth, async (req, res) => {
  const { image_url, caption, sort_order = 0 } = req.body || {};
  if (!image_url) return res.status(400).json({ error: 'image_url required' });
  const r = await query(
    'INSERT INTO gallery (image_url, caption, sort_order) VALUES (?, ?, ?)',
    [image_url, caption || null, sort_order]
  );
  const rows = await query('SELECT * FROM gallery WHERE id = ?', [r.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { image_url, caption, sort_order } = req.body || {};
  await query(
    'UPDATE gallery SET image_url=COALESCE(?, image_url), caption=COALESCE(?, caption), sort_order=COALESCE(?, sort_order) WHERE id = ?',
    [image_url ?? null, caption ?? null, sort_order ?? null, req.params.id]
  );
  const rows = await query('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
