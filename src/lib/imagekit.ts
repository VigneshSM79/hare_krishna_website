let imagekitInstance: any = null;

const getImageKit = async () => {
  if (imagekitInstance) return imagekitInstance;

  const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error('Missing ImageKit environment variables');
  }

  try {
    const ImageKitLib = await import('@imagekit/javascript');
    const ImageKit = (ImageKitLib as any).default || ImageKitLib;

    imagekitInstance = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    return imagekitInstance;
  } catch (error) {
    console.error('Failed to load ImageKit:', error);
    throw new Error('ImageKit initialization failed');
  }
};

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

export const uploadToImageKit = async (
  file: File,
  fileName: string,
  folder?: string
): Promise<ImageKitUploadResponse> => {
  const imagekit = await getImageKit();
  return new Promise((resolve, reject) => {
    imagekit.upload({
      file,
      fileName,
      folder: folder || 'temple-images',
      useUniqueFileName: true,
    }, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else if (result) {
        resolve(result as ImageKitUploadResponse);
      } else {
        reject(new Error('Upload failed - no result returned'));
      }
    });
  });
};

export const deleteFromImageKit = async (fileId: string): Promise<void> => {
  const imagekit = await getImageKit();
  return new Promise((resolve, reject) => {
    imagekit.deleteFile(fileId, (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

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

export const listFilesFromFolder = async (folderPath: string): Promise<ImageKitFile[]> => {
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
  const privateKey = import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY;

  if (!urlEndpoint || !privateKey) {
    throw new Error('Missing ImageKit environment variables');
  }

  try {
    // ImageKit List Files API endpoint
    const apiUrl = `https://api.imagekit.io/v1/files`;

    // Create basic auth token
    const auth = btoa(`${privateKey}:`);

    const response = await fetch(`${apiUrl}?path=${encodeURIComponent(folderPath)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`ImageKit API error: ${response.status} ${response.statusText}`);
    }

    const files = await response.json();
    return files as ImageKitFile[];
  } catch (error) {
    console.error('Error listing files from ImageKit:', error);
    throw error;
  }
};