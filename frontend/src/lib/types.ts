export type Profile = {
  id: number;
  name: string;
  title: string;
  tagline: string | null;
  hero_image_url: string | null;
  education_university: string | null;
  education_college: string | null;
  education_branch: string | null;
  education_program: string | null;
  about_description: string | null;
  business_whatsapp: string | null;
  personal_whatsapp: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  x_url: string | null;
  email: string | null;
};

export type GalleryItem = {
  id: number;
  image_url: string;
  caption: string | null;
  sort_order: number;
};

export type Project = {
  id: number;
  title: string;
  category: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  tech_stack: string | null;
  is_software: number | boolean;
  sort_order: number;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  designation: string | null;
  description: string | null;
  start_year: string | null;
  end_year: string | null;
  sort_order: number;
};
