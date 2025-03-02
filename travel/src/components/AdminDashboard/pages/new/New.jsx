import "./new.scss";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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

      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Utilisateur créé avec succès!',
      });

      navigate("/admin/users"); // Redirect on success
    } catch (error) {
      console.error("❌ Error creating user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Échec de la création de l\'utilisateur. Veuillez réessayer.',
      });
      setError("Échec de la création de l'utilisateur. Veuillez réessayer.");
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
                <label>Nom d'utilisateur</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Entrez le nom d'utilisateur"
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
                  placeholder="Entrez l'email"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="formInput">
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Entrez le mot de passe"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="formInput">
                <label>Rôle</label>
                <select name="role" onChange={handleInputChange} required>
                  <option value="user">Utilisateur</option>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Error Message */}
              {error && <p className="error">{error}</p>}

              {/* Submit Button */}
              <button type="submit">Créer l'utilisateur</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;