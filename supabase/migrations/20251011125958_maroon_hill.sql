/*
  # Create gallery images table

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key)
      - `image_url` (text, ImageKit.io URL)
      - `alt_text` (text, description)
      - `category` (text, for filtering)
      - `description` (text, optional longer description)
      - `display_order` (integer, for ordering)
      - `is_active` (boolean, visibility control)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `gallery_images` table
    - Add policy for public users to read active gallery images
    - Add policy for authenticated users to manage all gallery images

  3. Functions
    - Add trigger for automatic updated_at timestamp
*/

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public users can view active gallery images
CREATE POLICY "Anyone can view active gallery images"
  ON gallery_images
  FOR SELECT
  TO public
  USING (is_active = true);

-- Authenticated users can view all gallery images
CREATE POLICY "Authenticated users can view all gallery images"
  ON gallery_images
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert gallery images
CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update gallery images
CREATE POLICY "Authenticated users can update gallery images"
  ON gallery_images
  FOR UPDATE
  TO authenticated
  USING (true);

-- Authenticated users can delete gallery images
CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();