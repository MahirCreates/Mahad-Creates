
-- Drop existing insecure policies
DROP POLICY IF EXISTS "Allow public read access to site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public write access to site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public read access to portfolio_projects" ON portfolio_projects;
DROP POLICY IF EXISTS "Allow public write access to portfolio_projects" ON portfolio_projects;

-- Create secure policies for site_settings
CREATE POLICY "Allow public read access to site_settings" ON site_settings 
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admin write access to site_settings" ON site_settings 
  FOR ALL USING (auth.role() = 'authenticated');

-- Create secure policies for portfolio_projects  
CREATE POLICY "Allow public read access to portfolio_projects" ON portfolio_projects 
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admin write access to portfolio_projects" ON portfolio_projects 
  FOR ALL USING (auth.role() = 'authenticated');

-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow public uploads to images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates to images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from images bucket" ON storage.objects;

-- Create secure storage policies
CREATE POLICY "Allow public read access to images bucket" ON storage.objects 
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated admin uploads to images bucket" ON storage.objects 
  FOR INSERT WITH CHECK (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN ('site-images', 'portfolio')
  );

CREATE POLICY "Allow authenticated admin updates to images bucket" ON storage.objects 
  FOR UPDATE USING (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated admin deletes from images bucket" ON storage.objects 
  FOR DELETE USING (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
  );
