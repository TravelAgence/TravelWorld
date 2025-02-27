import "./new.scss";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const New = ({ title }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append image file (use correct field name: 'photo')
      if (file) {
        data.append("photo", file);
      }

      // Send request to backend
      await axios.post("http://localhost:4000/api/v1/users/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/users"); // Redirect on success
    } catch (error) {
      console.error("❌ Error creating user:", error);
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Profile Preview"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              {/* Profile Image Upload */}
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {/* Username Field */}
              <div className="formInput">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="formInput">
                <label>Role</label>
                <select name="role" onChange={handleInputChange} required>
                  <option value="user">User</option>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Error Message */}
              {error && <p className="error">{error}</p>}

              {/* Submit Button */}
              <button type="submit">Create User</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
