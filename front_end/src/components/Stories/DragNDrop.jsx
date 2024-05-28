import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const DragNdrop = ({ onFilesSelected }) => {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    onFilesSelected(selectedFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    onFilesSelected(droppedFiles);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(240, 240, 240, 0.8)",
        border: "1px solid #ccc",
        borderRadius: "3px",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center", color: "#aaa" }}>
        <AiOutlineCloudUpload size={48} color="#aaa" style={{margin: "auto"}}/>
        <div>
          <p style={{ margin: "5px 0" }}>Drag and drop your images here</p>

        </div>
        <input
          type="file"
          hidden
          id="browse"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.gif"
          multiple
        />
        <label
          htmlFor="browse"
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "10px 20px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            backgroundColor: "#fff",
            cursor: "pointer",
            color: "#333",
          }}
        >
          Add images
        </label>
      </div>
    </div>
  );
};

export default DragNdrop;
