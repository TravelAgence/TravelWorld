import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "";
    if (file.fieldname === "photo") {
      folder = "users"; // Folder for user profile pictures
    } else if (file.fieldname === "passport_images") {
      folder = "passport_images"; // Folder for passport images
    }

    return {
      folder: folder, // Specify the folder in Cloudinary
      allowedFormats: ["jpg", "png", "jpeg"], // Allowed formats
      transformation: [{ width: 500, height: 500, crop: "limit" }], // Image size restrictions
    };
  },
});

const upload = multer({ storage });

export default upload;
