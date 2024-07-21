import React, { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPreview(`data:image/jpeg;base64,${response.data.image}`);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {preview && <img src={preview} alt="Uploaded" />}
    </div>
  );
};

export default UploadPage;
