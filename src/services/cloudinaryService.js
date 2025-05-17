/**
 * Service for uploading images to Cloudinary
 */

/**
 * Uploads an image file to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} uploadPreset - The upload preset name (default: 'ml_default')
 * @returns {Promise<string>} The URL of the uploaded image
 */
export const uploadImageToCloudinary = async (file, uploadPreset = 'ml_default') => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Create a FormData object to send the file to Cloudinary
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/du1ptfs4h/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error('Failed to upload image');
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};