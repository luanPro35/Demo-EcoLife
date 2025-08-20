import React, { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically use FormData to send the file to the backend
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Uploading file:", selectedFile.name);
      // Example: fetch('/api/upload', { method: 'POST', body: formData })
      // Handle success/error
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">File Upload</h2>
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} />
      </div>
      {selectedFile && (
        <div className="mb-4">
          <p>
            <strong>Selected File:</strong> {selectedFile.name}
          </p>
          <p>
            <strong>File Type:</strong> {selectedFile.type}
          </p>
          <p>
            <strong>File Size:</strong> {(selectedFile.size / 1024).toFixed(2)}{" "}
            KB
          </p>
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        Upload File
      </button>
    </div>
  );
};

export default FileUpload;
