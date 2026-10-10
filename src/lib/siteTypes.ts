export type SiteSettings = {
  id: string;
  logo_url: string | null;
  cover_image_url: string | null;
  founder_image_url: string | null;
  updated_at: string;
};

export type PortfolioProject = {
  id: string;
  project_id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  order_index: number;
  updated_at: string;
};
