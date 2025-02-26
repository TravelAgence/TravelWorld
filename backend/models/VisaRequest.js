import mongoose from "mongoose";

const visaRequestSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: String,
      required: true,
    },
    destinationCountry: {
      type: String,
      required: true,
    },
    travelDates: {
      type: String,
      required: true,
    },
    passportImage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("VisaRequest", visaRequestSchema);