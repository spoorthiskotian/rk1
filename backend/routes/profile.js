import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await query('SELECT * FROM profile WHERE id = 1');
  res.json(rows[0] || null);
});

router.put('/', requireAuth, async (req, res) => {
  const p = req.body || {};
  await query(
    `INSERT INTO profile (id, name, title, tagline, hero_image_url,
      education_university, education_college, education_branch, education_program,
      about_description, business_whatsapp, personal_whatsapp, linkedin_url,
      instagram_url, facebook_url, x_url, email)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       name=VALUES(name), title=VALUES(title), tagline=VALUES(tagline),
       hero_image_url=VALUES(hero_image_url),
       education_university=VALUES(education_university),
       education_college=VALUES(education_college),
       education_branch=VALUES(education_branch),
       education_program=VALUES(education_program),
       about_description=VALUES(about_description),
       business_whatsapp=VALUES(business_whatsapp),
       personal_whatsapp=VALUES(personal_whatsapp),
       linkedin_url=VALUES(linkedin_url),
       instagram_url=VALUES(instagram_url),
       facebook_url=VALUES(facebook_url),
       x_url=VALUES(x_url), email=VALUES(email)`,
    [
      p.name, p.title, p.tagline, p.hero_image_url,
      p.education_university, p.education_college, p.education_branch, p.education_program,
      p.about_description, p.business_whatsapp, p.personal_whatsapp, p.linkedin_url,
      p.instagram_url, p.facebook_url, p.x_url, p.email,
    ]
  );
  const rows = await query('SELECT * FROM profile WHERE id = 1');
  res.json(rows[0]);
});

export default router;
