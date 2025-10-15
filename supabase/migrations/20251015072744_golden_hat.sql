/*
  # Add ImageKit File ID columns

  1. Schema Changes
    - Add `imagekit_file_id` column to `carousel_images` table
    - Add `imagekit_file_id` column to `gallery_images` table
  
  2. Purpose
    - Store ImageKit.io file IDs for proper image management
    - Enable deletion of images from ImageKit.io when removing from database
*/

-- Add imagekit_file_id column to carousel_images table
ALTER TABLE public.carousel_images
ADD COLUMN IF NOT EXISTS imagekit_file_id TEXT;

-- Add imagekit_file_id column to gallery_images table  
ALTER TABLE public.gallery_images
ADD COLUMN IF NOT EXISTS imagekit_file_id TEXT;