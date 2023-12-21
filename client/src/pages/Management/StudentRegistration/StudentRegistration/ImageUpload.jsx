import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (
        file &&
        (file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg")
      ) {
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);

        const response = await fetch(
          "http://localhost:8080/api/aim/upload-image",
          {
            method: "post",
            body: formData,
          }
        );
        console.log(file);
      }
    } catch (err) {
      console.log(err);
    }
    //   axios
    //     .post("/upload-image", formData, {
    //       headers: {
    //         "Content-type": "multipart/form-data",
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.error("Error uploading file:", error);
    //     });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
