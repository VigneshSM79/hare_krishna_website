// ImageKit integration for Hare Krishna Temple website
// SECURITY: Uses Supabase Edge Functions to keep private key secure on backend
// Private key is NEVER exposed to frontend

import { supabase } from './supabase';

export interface ImageKitUploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  tags: string[];
  isPrivateFile: boolean;
  customCoordinates: string | null;
  fileType: string;
}

export interface ImageKitFile {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  tags: string[];
  isPrivateFile: boolean;
  fileType: string;
  createdAt: string;
}

export interface ImageKitFolder {
  name: string;
  folderPath: string;
  type: string;
}

/**
 * Convert File to Base64 string for Edge Function upload
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Upload image to ImageKit via secure Edge Function
 * Private key stays on backend - NEVER exposed to browser
 *
 * @param file - The image file to upload
 * @param fileName - Name for the uploaded file
 * @param folder - Optional folder path (default: 'temple-images')
 * @returns Upload response with ImageKit file details
 */
export const uploadToImageKit = async (
  file: File,
  fileName: string,
  folder?: string
): Promise<ImageKitUploadResponse> => {
  try {
    // Convert file to base64
    const base64File = await fileToBase64(file);

    // Call secure Edge Function (private key stays on backend)
    const { data, error } = await supabase.functions.invoke('imagekit-upload', {
      body: {
        file: base64File,
        fileName,
        folder: folder || 'temple-images',
      },
    });

    if (error) {
      console.error('Edge Function error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    if (!data || !data.success) {
      throw new Error(data?.error || 'Upload failed');
    }

    return data.data as ImageKitUploadResponse;
  } catch (error) {
    console.error('Error uploading to ImageKit:', error);
    throw error instanceof Error ? error : new Error('Upload failed');
  }
};

/**
 * Delete image from ImageKit via secure Edge Function
 * Private key stays on backend - NEVER exposed to browser
 *
 * @param fileId - ImageKit file ID to delete
 */
export const deleteFromImageKit = async (fileId: string): Promise<void> => {
  try {
    // Call secure Edge Function (private key stays on backend)
    const { data, error } = await supabase.functions.invoke('imagekit-delete', {
      body: {
        fileId,
      },
    });

    if (error) {
      console.error('Edge Function error:', error);
      throw new Error(`Delete failed: ${error.message}`);
    }

    if (!data || !data.success) {
      throw new Error(data?.error || 'Delete failed');
    }

    console.log('File deleted successfully:', fileId);
  } catch (error) {
    console.error('Error deleting from ImageKit:', error);
    throw error instanceof Error ? error : new Error('Delete failed');
  }
};

/**
 * List files from ImageKit folder via secure Edge Function
 * Private key stays on backend - NEVER exposed to browser
 *
 * @param folderPath - Folder path to list files from
 * @returns Array of ImageKit files
 */
export const listFilesFromFolder = async (folderPath: string): Promise<ImageKitFile[]> => {
  try {
    // Call secure Edge Function (private key stays on backend)
    const { data, error } = await supabase.functions.invoke('imagekit-list', {
      body: {
        folderPath,
      },
    });

    if (error) {
      console.error('Edge Function error:', error);
      throw new Error(`List files failed: ${error.message}`);
    }

    if (!data || !data.success) {
      throw new Error(data?.error || 'List files failed');
    }

    return data.data as ImageKitFile[];
  } catch (error) {
    console.error('Error listing files from ImageKit:', error);
    throw error instanceof Error ? error : new Error('List files failed');
  }
};

/**
 * List folders from ImageKit path via secure Edge Function
 * Private key stays on backend - NEVER exposed to browser
 *
 * @param folderPath - Parent folder path to list subfolders from
 * @returns Array of ImageKit folders
 */
export const listFoldersFromPath = async (folderPath: string): Promise<ImageKitFolder[]> => {
  try {
    // Call secure Edge Function (private key stays on backend)
    const { data, error } = await supabase.functions.invoke('imagekit-list-folders', {
      body: {
        folderPath,
      },
    });

    if (error) {
      console.error('Edge Function error:', error);
      throw new Error(`List folders failed: ${error.message}`);
    }

    if (!data || !data.success) {
      throw new Error(data?.error || 'List folders failed');
    }

    return data.data as ImageKitFolder[];
  } catch (error) {
    console.error('Error listing folders from ImageKit:', error);
    throw error instanceof Error ? error : new Error('List folders failed');
  }
};

// Export ImageKit URL endpoint for displaying images (public, no security risk)
export const getImageKitUrl = (): string => {
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
  if (!urlEndpoint) {
    throw new Error('Missing ImageKit URL endpoint configuration');
  }
  return urlEndpoint;
};
