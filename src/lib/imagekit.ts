import ImageKit from '@imagekit/javascript';

const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error('Missing ImageKit environment variables');
}

export const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

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
  return new Promise((resolve, reject) => {
    imagekit.upload({
      file,
      fileName,
      folder: folder || 'temple-images',
      useUniqueFileName: true,
    }, (error, result) => {
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
  return new Promise((resolve, reject) => {
    imagekit.deleteFile(fileId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};