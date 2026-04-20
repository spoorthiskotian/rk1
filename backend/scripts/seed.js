import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { query, pool } from '../db.js';

dotenv.config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'rk_admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'rk_super_secret';

async function seed() {
  console.log('Seeding rk database…');

  // Admin
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await query(
    `INSERT INTO admins (username, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [ADMIN_USERNAME, hash]
  );
  console.log(`  admin: ${ADMIN_USERNAME}`);

  // Profile (single row id=1)
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
      'Rohit Krishnan',
      'Multi-Disciplinary Engineer · Founder & CEO',
      'Software. Hardware. Robotics. IoT. Automotive. Built end-to-end.',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900',
      'Visvesvaraya Technological University',
      'RV College of Engineering',
      'Electronics & Communication',
      'B.E. (Hons.) with specialization in Embedded Systems',
      'Polymath engineer shipping systems from silicon to cloud — designs ECUs and robots by day, writes cloud microservices by night, and leads a product company bringing them together.',
      '+91 90000 11111',
      '+91 90000 22222',
      'https://linkedin.com/in/rohit-krishnan',
      'https://instagram.com/rohit.krishnan',
      'https://facebook.com/rohit.krishnan',
      'https://x.com/rohitkrishnan',
      'hello@rk.in',
    ]
  );
  console.log('  profile: seeded');

  // Gallery
  await query('DELETE FROM gallery');
  const galleryImgs = [
    ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200', 'Hardware lab bring-up'],
    ['https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1200', 'ECU prototype'],
    ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200', 'Pair programming'],
    ['https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200', 'Robot arm calibration'],
    ['https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1200', 'IoT gateway'],
    ['https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=1200', 'Workshop'],
  ];
  for (let i = 0; i < galleryImgs.length; i++) {
    await query(
      'INSERT INTO gallery (image_url, caption, sort_order) VALUES (?, ?, ?)',
      [galleryImgs[i][0], galleryImgs[i][1], i]
    );
  }
  console.log(`  gallery: ${galleryImgs.length} images`);

  // Projects
  await query('DELETE FROM projects');
  const projects = [
    {
      title: 'Apogée Telemetry Cloud',
      category: 'Software',
      short_description: 'Realtime vehicle telemetry platform',
      description: 'Ingests 40k msgs/sec from fleet ECUs over MQTT, streams into a columnar store, and visualizes fleet health with a React dashboard. Used by an OEM pilot across 2,400 vehicles.',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600',
      live_url: 'https://example.com/apogee',
      repo_url: 'https://github.com/rohitkrishnan/apogee',
      tech_stack: 'React, TypeScript, Go, ClickHouse, MQTT, Kubernetes',
      is_software: 1,
      sort_order: 0,
    },
    {
      title: 'H.A.N.D.S. Prosthetic',
      category: 'Robotics',
      short_description: 'EMG-driven 5-DoF prosthetic hand',
      description: 'Low-latency myoelectric prosthetic with dexterous grip patterns. Runs a TinyML classifier on an STM32H7 reading an 8-channel EMG band; fingers actuated by custom BLDC drivers.',
      image_url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1600',
      live_url: null,
      repo_url: null,
      tech_stack: 'STM32H7, TinyML, C, PCB design, CAD',
      is_software: 0,
      sort_order: 1,
    },
    {
      title: 'Hex-Strategy IoT Grid',
      category: 'IoT',
      short_description: 'Mesh-network energy balancer',
      description: 'Peer-to-peer mesh of solar microgrids that negotiate power flows via a gossip protocol. Deployed across 12 villages; reduced outage time by 73%.',
      image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600',
      live_url: null,
      repo_url: 'https://github.com/rohitkrishnan/hexgrid',
      tech_stack: 'ESP32, LoRa, Rust, MQTT, React',
      is_software: 0,
      sort_order: 2,
    },
    {
      title: 'K. Herzer Drive-by-Wire',
      category: 'Automotive',
      short_description: 'Steer-by-wire retrofit for EV platform',
      description: 'Functional-safety (ISO 26262 ASIL-D) steer-by-wire module with redundant CAN-FD bus and dual-MCU lockstep. Passed bench and track validation.',
      image_url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600',
      live_url: null,
      repo_url: null,
      tech_stack: 'Infineon AURIX, CAN-FD, AUTOSAR, MATLAB/Simulink',
      is_software: 0,
      sort_order: 3,
    },
    {
      title: 'HUMAN? Identity Gate',
      category: 'Software',
      short_description: 'Behavioral bot-mitigation service',
      description: 'Edge-deployed service that fingerprints session behavior to separate humans from automated clients, with zero cookies. Integrates via a 4 KB JS snippet.',
      image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600',
      live_url: 'https://example.com/humanid',
      repo_url: null,
      tech_stack: 'Rust, WebAssembly, Cloudflare Workers, React',
      is_software: 1,
      sort_order: 4,
    },
    {
      title: 'Saarthi Autonomous Rover',
      category: 'Robotics',
      short_description: 'Last-mile delivery rover',
      description: 'A campus-scale autonomous delivery rover using VIO + lidar SLAM. Built the nav stack, the chassis, and the fleet ops dashboard.',
      image_url: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=1600',
      live_url: null,
      repo_url: 'https://github.com/rohitkrishnan/saarthi',
      tech_stack: 'ROS 2, C++, Jetson Orin, Lidar, React',
      is_software: 0,
      sort_order: 5,
    },
  ];
  for (const p of projects) {
    await query(
      `INSERT INTO projects (title, category, short_description, description, image_url,
         live_url, repo_url, tech_stack, is_software, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.title, p.category, p.short_description, p.description, p.image_url,
       p.live_url, p.repo_url, p.tech_stack, p.is_software, p.sort_order]
    );
  }
  console.log(`  projects: ${projects.length}`);

  // Experience
  await query('DELETE FROM experiences');
  const experiences = [
    {
      company: 'Aether Systems (Self-founded)',
      role: 'Founder & CEO',
      designation: 'Chief Executive',
      description: 'Founded a deeptech startup shipping intelligent mobility platforms. Raised seed, grew team to 18, deployed in 3 OEM pilots.',
      start_year: '2022',
      end_year: 'Present',
      sort_order: 0,
    },
    {
      company: 'Bosch India',
      role: 'Senior Embedded Engineer',
      designation: 'Powertrain ECUs',
      description: 'Owned firmware for hybrid powertrain ECU; shipped AUTOSAR modules into production across 4 vehicle platforms.',
      start_year: '2019',
      end_year: '2022',
      sort_order: 1,
    },
    {
      company: 'ISRO URSC',
      role: 'Research Intern',
      designation: 'Space Robotics Lab',
      description: 'Contributed to attitude-control software and mechanical testing rig for a satellite robotic arm experiment.',
      start_year: '2018',
      end_year: '2019',
      sort_order: 2,
    },
  ];
  for (const e of experiences) {
    await query(
      `INSERT INTO experiences (company, role, designation, description, start_year, end_year, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [e.company, e.role, e.designation, e.description, e.start_year, e.end_year, e.sort_order]
    );
  }
  console.log(`  experiences: ${experiences.length}`);

  console.log('Done.');
  await pool.end();
}

seed().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
