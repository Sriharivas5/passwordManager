import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Docs.css"
function App() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Change key to "file" (match backend)

    try {
      await axios.post("https://passwordmanager-d81l.onrender.com/api/uploadDocs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchFiles(); // Refresh after upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get("https://passwordmanager-d81l.onrender.com/api/getDocs");
      setFiles(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (id) => {
  await axios.delete(`https://passwordmanager-d81l.onrender.com/api/deleteImage/${id}`)
    window.location.reload()
  }

  return (
    <div className="docs">
      <h2>Upload Image or PDF</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      <div className="docFiles">
        <h3>Uploaded Files</h3>
        <div>
          {files.map((file, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              {file.contentType === "application/pdf" ? (
                <div id="iframes">
                  <iframe
                    src={`data:${file.contentType};base64,${file.data}`}
                    width="100%"
                    height="300px"
                    style={{ border: "none" }}

                  ></iframe>
                  <button onClick={() => { handleDelete(file._id) }}>Delete</button>
                </div>
              ) : (
                <div id="iframes">
                  <img
                    id="iframeImg"
                    src={`data:${file.contentType};base64,${file.data}`}
                    alt={`Uploaded ${index}`}
                  />
                  <button onClick={() => { handleDelete(file._id) }}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
