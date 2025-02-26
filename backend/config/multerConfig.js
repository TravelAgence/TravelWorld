import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'passport_images', // Cloudinary folder name
    allowed_formats: ['jpeg', 'jpg', 'png'], // Allowed formats
  },
});

const upload = multer({ storage: storage });

export default upload;
