/*
  # Create carousel images system

  1. New Tables
    - `carousel_images`
      - `id` (uuid, primary key)
      - `image_url` (text, required)
      - `alt_text` (text, required)
      - `display_order` (integer, default 0)
      - `quarter` (text, required)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `carousel_images` table
    - Add policy for public read access to active images
    - Add policy for authenticated users to manage all images

  3. Storage
    - Create storage bucket for carousel images
    - Set up storage policies for public read and authenticated write
*/

-- Create the carousel_images table
CREATE TABLE IF NOT EXISTS carousel_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text NOT NULL,
  display_order integer DEFAULT 0,
  quarter text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE carousel_images ENABLE ROW LEVEL SECURITY;

-- Create policies for carousel_images table
CREATE POLICY "Anyone can view active carousel images"
  ON carousel_images
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all carousel images"
  ON carousel_images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert carousel images"
  ON carousel_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update carousel images"
  ON carousel_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete carousel images"
  ON carousel_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for carousel images
INSERT INTO storage.buckets (id, name, public)
VALUES ('carousel-images', 'carousel-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Anyone can view carousel images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'carousel-images');

CREATE POLICY "Authenticated users can upload carousel images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'carousel-images');

CREATE POLICY "Authenticated users can update carousel images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'carousel-images')
  WITH CHECK (bucket_id = 'carousel-images');

CREATE POLICY "Authenticated users can delete carousel images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'carousel-images');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_carousel_images_updated_at
  BEFORE UPDATE ON carousel_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();