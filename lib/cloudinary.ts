import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Uploads a file buffer to Cloudinary
 * @param file Buffer of the file to upload
 * @param folder Optional folder name in Cloudinary
 * @returns Promise resolving to the secure URL of the uploaded file
 */
export async function uploadToCloudinary(file: Buffer, folder: string = 'general-pf'): Promise<string> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: folder,
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                    return;
                }
                resolve(result?.secure_url || '');
            }
        ).end(file);
    });
}
