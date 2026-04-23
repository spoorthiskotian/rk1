import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await query('SELECT * FROM educations ORDER BY sort_order ASC, id DESC');
  res.json(rows);
});

router.post('/', requireAuth, async (req, res) => {
  const p = req.body || {};
  const r = await query(
    `INSERT INTO educations (institution, degree, field, start_year, end_year, description, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [p.institution, p.degree || null, p.field || null, p.start_year || null, p.end_year || null, p.description || null, p.sort_order || 0]
  );
  const rows = await query('SELECT * FROM educations WHERE id = ?', [r.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const p = req.body || {};
  await query(
    `UPDATE educations SET
       institution=COALESCE(?, institution),
       degree=COALESCE(?, degree),
       field=COALESCE(?, field),
       start_year=COALESCE(?, start_year),
       end_year=COALESCE(?, end_year),
       description=COALESCE(?, description),
       sort_order=COALESCE(?, sort_order)
     WHERE id = ?`,
    [p.institution ?? null, p.degree ?? null, p.field ?? null,
     p.start_year ?? null, p.end_year ?? null, p.description ?? null,
     p.sort_order ?? null, req.params.id]
  );
  const rows = await query('SELECT * FROM educations WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await query('DELETE FROM educations WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
