
-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  logo_url TEXT,
  cover_image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1518770660439-4636190af475',
  founder_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_projects_updated_at BEFORE UPDATE ON portfolio_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a portfolio site)
CREATE POLICY "Allow public read access to site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public write access to site_settings" ON site_settings FOR ALL USING (true);

CREATE POLICY "Allow public read access to portfolio_projects" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Allow public write access to portfolio_projects" ON portfolio_projects FOR ALL USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT DO NOTHING;

-- Create storage policy for public access
CREATE POLICY "Allow public uploads to images bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "Allow public access to images bucket" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Allow public updates to images bucket" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Allow public deletes from images bucket" ON storage.objects FOR DELETE USING (bucket_id = 'images');
