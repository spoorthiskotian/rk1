-- RK Portfolio Database Schema
-- Database: rk

CREATE DATABASE IF NOT EXISTS rk
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rk;

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  name VARCHAR(120) NOT NULL,
  title VARCHAR(255) NOT NULL,
  tagline TEXT,
  hero_image_url VARCHAR(512),
  education_university VARCHAR(255),
  education_college VARCHAR(255),
  education_branch VARCHAR(255),
  education_program VARCHAR(255),
  about_description TEXT,
  business_whatsapp VARCHAR(32),
  personal_whatsapp VARCHAR(32),
  linkedin_url VARCHAR(255),
  instagram_url VARCHAR(255),
  facebook_url VARCHAR(255),
  x_url VARCHAR(255),
  email VARCHAR(120),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(512) NOT NULL,
  caption VARCHAR(255),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  category VARCHAR(64) NOT NULL,
  short_description VARCHAR(255),
  description TEXT,
  image_url VARCHAR(512),
  live_url VARCHAR(512),
  repo_url VARCHAR(512),
  tech_stack VARCHAR(512),
  is_software BOOLEAN DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experiences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(180) NOT NULL,
  role VARCHAR(180) NOT NULL,
  designation VARCHAR(180),
  description TEXT,
  start_year VARCHAR(16),
  end_year VARCHAR(16),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS educations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  institution VARCHAR(255) NOT NULL,
  degree VARCHAR(180),
  field VARCHAR(180),
  start_year VARCHAR(16),
  end_year VARCHAR(16),
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  form_type ENUM('business','personal') NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180),
  phone VARCHAR(32),
  company VARCHAR(180),
  subject VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
