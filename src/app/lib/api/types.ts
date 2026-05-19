export type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  short_desc: string;
  full_desc: string;
  icon: string;
  color: string;
  use_cases: unknown;
  process: unknown;
  results: unknown;
  industries: string[];
  price: string;
  published: boolean;
  updated_at: string;
};

export type CaseRow = {
  id: string;
  slug: string;
  category: string;
  title: string;
  client: string;
  location: string;
  year: string;
  short_desc: string;
  challenge: string;
  solution: string;
  results: unknown;
  tags: string[];
  gradient: string;
  accent_color: string;
  published: boolean;
  updated_at: string;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  category: string;
  date: string;
  read_time: string;
  title: string;
  excerpt: string;
  tags: string[];
  accent: string;
  content: unknown;
  published: boolean;
  updated_at: string;
};

export type AboutPageRow = {
  id: string;
  hero_title: string;
  hero_text: string;
  mission_title: string;
  mission_text: string;
  principles: unknown;
  partners: unknown;
  licenses: unknown;
  updated_at: string;
};

export type EmployeeRow = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  initials: string;
  color: string;
  active: boolean;
  sort: number;
  updated_at: string;
};

export type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: string;
  source: string;
};

