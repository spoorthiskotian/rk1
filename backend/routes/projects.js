import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await query('SELECT * FROM projects ORDER BY sort_order ASC, id DESC');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const rows = await query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

router.post('/', requireAuth, async (req, res) => {
  const p = req.body || {};
  const r = await query(
    `INSERT INTO projects (title, category, short_description, description, image_url,
      live_url, repo_url, tech_stack, is_software, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      p.title, p.category, p.short_description || null, p.description || null,
      p.image_url || null, p.live_url || null, p.repo_url || null,
      p.tech_stack || null, p.is_software ? 1 : 0, p.sort_order || 0,
    ]
  );
  const rows = await query('SELECT * FROM projects WHERE id = ?', [r.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const p = req.body || {};
  await query(
    `UPDATE projects SET
       title=COALESCE(?, title),
       category=COALESCE(?, category),
       short_description=COALESCE(?, short_description),
       description=COALESCE(?, description),
       image_url=COALESCE(?, image_url),
       live_url=COALESCE(?, live_url),
       repo_url=COALESCE(?, repo_url),
       tech_stack=COALESCE(?, tech_stack),
       is_software=COALESCE(?, is_software),
       sort_order=COALESCE(?, sort_order)
     WHERE id = ?`,
    [
      p.title ?? null, p.category ?? null, p.short_description ?? null,
      p.description ?? null, p.image_url ?? null, p.live_url ?? null,
      p.repo_url ?? null, p.tech_stack ?? null,
      p.is_software == null ? null : (p.is_software ? 1 : 0),
      p.sort_order ?? null, req.params.id,
    ]
  );
  const rows = await query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await query('DELETE FROM projects WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
