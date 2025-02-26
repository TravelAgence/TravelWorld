import VisaRequest from "../models/VisaRequest.js";
import { sendEmail } from "../nodeMailer/nodeMailer.js";

// Submit a visa request
export const submitVisaRequest = async (req, res) => {
  try {
    const { clientName, clientEmail, passportNumber, destinationCountry, travelDates } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Passport image is required" });
    }

    const passportImageUrl = req.file.path; // Cloudinary URL

    const newVisaRequest = new VisaRequest({
      clientName,
      clientEmail,
      passportNumber,
      destinationCountry,
      travelDates,
      passportImage: passportImageUrl, // Save Cloudinary URL
    });

    await newVisaRequest.save();

    // Send confirmation email
    await sendEmail(clientEmail, "Your visa request has been received and is being processed.");

    res.status(200).json({
      success: true,
      message: "Visa request submitted successfully.",
      imageUrl: passportImageUrl, // Return image URL
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to submit visa request. Try again.",
    });
  }
};



export const getVisaRequests = async (req, res) => {
    try {
      const visaRequests = await VisaRequest.find();
      res.status(200).json({ success: true, visaRequests });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to fetch visa requests" });
    }
  };
  