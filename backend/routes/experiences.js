import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await query('SELECT * FROM experiences ORDER BY sort_order ASC, id DESC');
  res.json(rows);
});

router.post('/', requireAuth, async (req, res) => {
  const p = req.body || {};
  const r = await query(
    `INSERT INTO experiences (company, role, designation, description, start_year, end_year, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [p.company, p.role, p.designation || null, p.description || null, p.start_year || null, p.end_year || null, p.sort_order || 0]
  );
  const rows = await query('SELECT * FROM experiences WHERE id = ?', [r.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', requireAuth, async (req, res) => {
  const p = req.body || {};
  await query(
    `UPDATE experiences SET
       company=COALESCE(?, company),
       role=COALESCE(?, role),
       designation=COALESCE(?, designation),
       description=COALESCE(?, description),
       start_year=COALESCE(?, start_year),
       end_year=COALESCE(?, end_year),
       sort_order=COALESCE(?, sort_order)
     WHERE id = ?`,
    [p.company ?? null, p.role ?? null, p.designation ?? null, p.description ?? null,
     p.start_year ?? null, p.end_year ?? null, p.sort_order ?? null, req.params.id]
  );
  const rows = await query('SELECT * FROM experiences WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await query('DELETE FROM experiences WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
