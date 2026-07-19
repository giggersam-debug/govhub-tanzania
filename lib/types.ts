export type Agency = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  accent_color: string;
  status: "active" | "inactive";
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;
};

export type FormStatus = "draft" | "published" | "archived";

export type GovForm = {
  id: string;
  agency_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  purpose: string | null;
  eligibility: string | null;
  requirements: string[];
  attachments: string[];
  processing_time: string | null;
  fee: string | null;
  submission_office: string | null;
  file_url: string | null;
  preview_url: string | null;
  language: string;
  version: string;
  reference_code: string | null;
  status: FormStatus;
  last_updated: string;
  created_at: string;
};

export type GovFormWithAgency = GovForm & { agency: Agency; category: Category | null };

export type Download = {
  id: string;
  form_id: string;
  user_id: string | null;
  created_at: string;
  ip: string | null;
  device: string | null;
};

export type Profile = {
  id: string;
  full_name: string | null;
  role: "public" | "admin" | "editor";
  created_at: string;
};

export type FavoriteForm = {
  id: string;
  user_id: string;
  form_id: string;
  created_at: string;
};
