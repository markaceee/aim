import React, { useState } from "react";
import Resizer from "react-image-file-resizer";

const FileInput = (className, id, name, data) => {
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Resize and compress the image
      Resizer.imageFileResizer(
        file,
        400, // max width
        400, // max height
        "JPEG", // compress format
        100, // quality
        0, // rotation
        (uri) => {
          setSelectedImage(uri);
        },
        "base64" // output type
      );
      console.log(selectedImage);
    } else {
      // Invalid file type
      setSelectedImage(null);
      alert("Please select a valid image file.");
    }
  };

  return (
    <div>
      <input
        className={className}
        type="file"
        name={name}
        id={id}
        accept="image/*"
        value={data}
        onChange={handleImageChange}
        required
      />
      {selectedImage && (
        <div>
          <p>Selected Image:</p>
          <img src={selectedImage} alt="Selected" className="w-40 h-40" />
        </div>
      )}
    </div>
  );
};

export default FileInput;
