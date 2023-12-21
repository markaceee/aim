import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import upload from "../../../../assets/svg/upload.svg";
import axios from "axios";
import Resizer from "react-image-file-resizer";

const UploadModal = ({ onImageResized }) => {
  const [openModal, setOpenModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        file &&
        (file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg")
      ) {
        const resizedFile = await handleImageResize(file);

        const formData = new FormData();
        formData.append("file", resizedFile);

        const response = await fetch(
          "http://localhost:8080/api/aim/upload-image",
          {
            method: "post",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text(); // Get the error message from the response body
          throw new Error(
            `Failed to upload image. Server response: ${errorMessage}`
          );
        }

        let responseData;
        try {
          responseData = await response.json();
          if (!responseData.success) {
            throw new Error(responseData.message || "Failed to upload image");
          }
        } catch (jsonError) {
          return;
        }

        console.log("Image uploaded successfully:", responseData);
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      setIsLoading(false);
      setOpenModal(false);
      setImagePreview(null);
    }
  };

  const handleImageResize = (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        300, // max width
        300, // max height
        "JPEG", // compress format
        100, // quality
        0, // rotation
        (uri) => {
          try {
            const blob = dataURItoBlob(uri);
            resolve(blob);
          } catch (error) {
            reject(error);
          }
        },
        "base64" // output type
      );
    });
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };
  return (
    <>
      <a
        type="button"
        className="flex flex-row gap-4 justify-center items-center bg-blue-600 p-3 rounded-md text-white w-1/3 hover:bg-blue-700 cursor-pointer"
        style={{ color: "white" }}
        onClick={() => setOpenModal(true)}
      >
        Upload Profile Picture
      </a>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Upload Profile Picture</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <label
              htmlFor="fileInput"
              className="flex flex-row w-1/5 gap-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Choose File
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {/* {file ? <div>{file.name}</div> : "No file Chosen"} */}
            <div>
              {isLoading ? (
                "Uploading..."
              ) : (
                <div>
                  {file ? (
                    <button
                      type="submit"
                      className="flex flex-row gap-4 justify-center items-center bg-blue-600 p-3 rounded-md text-white w-1/5"
                      onClick={handleUpload}
                    >
                      <img src={upload} alt="" />
                      Upload
                    </button>
                  ) : null}
                </div>
              )}
            </div>
            <div>{imagePreview && <img src={imagePreview} alt="image" />}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row gap-3 w-1/2">
            <button
              className="bg-blue-600 p-3 rounded-md text-white w-1/3"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Done
            </button>
            <button
              className="bg-red-600 p-3 rounded-md text-white w-1/3"
              onClick={() => setOpenModal(false)}
            >
              Decline
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadModal;
