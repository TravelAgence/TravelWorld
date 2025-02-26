import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "client", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activationCode: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);