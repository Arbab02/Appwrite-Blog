'use client'
import React, { useState, useEffect, useRef, useContext} from 'react';
import { Client, Storage, ID } from 'appwrite';


const AppwriteImageUploader = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filesList, setFilesList] = useState([]);
  const [deleteFileName, setDeleteFileName] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [showDownload, setShowDownload] = useState(false);
  const [postImageURL, setPostImageURL] = useState('');
  const [postText, setPostText] = useState('');

  useEffect(() => {
    // Fetch the list of files in the bucket when the component mounts
    fetchFilesList();
  }, []);

  const fetchFilesList = () => {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('652dff363151cea1ad75');

    const storage = new Storage(client);

    const promise = storage.listFiles('65531dc0ddf0bc117d1b');

    promise.then(
      function (response) {
        console.log(response); // List of files in the bucket
        setFilesList(response.files);
      },
      function (error) {
        console.log(error); // Handle error, e.g., show an error message
      }
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadFileName(file.name);
    setPreviewURL(URL.createObjectURL(file)); // Create a preview URL for the selected file
    setShowDownload(false); // Hide download button when a new file is selected
  };

  const createPost = () => {
    // Ensure there's an image URL to display
    if (postImageURL) {
      const newPost = document.createElement('div');
      const img = document.createElement('img');
      img.src = postImageURL;
      img.alt = 'Uploaded Image';
      newPost.appendChild(img);

      const text = document.createElement('p');
      text.textContent = postText;
      newPost.appendChild(text);

      postRef.current.appendChild(newPost);
    }
  };

  const postRef = useRef(null);

  const handleUpload = () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const newFileName = ID.unique(); // Use a unique ID as the file name
    setUploadFileName(newFileName);
    handleUploadFile(newFileName); // Trigger upload with the generated filename
  };

  const handleUploadFile = (uploadFileName) => {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('652dff363151cea1ad75');

    const storage = new Storage(client);

    const promise = storage.createFile('65531dc0ddf0bc117d1b', uploadFileName, selectedFile);

    promise.then(
      function (response) {
        console.log(response); // Success
        // Handle success, e.g., show a success message or update state
        fetchFilesList(); // Refresh the files list after upload
        setShowDownload(true); // Show download button after successful upload
        setPostImageURL(previewURL); // Set post image URL after successful upload
      },
      function (error) {
        console.log(error); // Failure
        // Handle error, e.g., show an error message or update state
      }
    );
  };

  const handleDownload = () => {
    // Ensure a selected file exists for download
    if (selectedFile) {
      const downloadUrl = URL.createObjectURL(selectedFile);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', selectedFile.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDeleteByName = () => {
    const fileToDelete = filesList.find((file) => file.name === deleteFileName);

    if (!fileToDelete) {
      console.error(`File with name '${deleteFileName}' not found.`);
      return;
    }

    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('652dff363151cea1ad75');

    const storage = new Storage(client);

    const promise = storage.deleteFile('65531dc0ddf0bc117d1b', fileToDelete.$id);

    promise.then(
      function (response) {
        console.log(response);
        alert('File deleted Successfully') // Success
        // Handle success, e.g., show a success message or update state
        fetchFilesList(); // Refresh the files list after deletion
      },
      function (error) {
        console.log(error); // Failure
        // Handle error, e.g., show an error message or update state
      }
    );
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Social Media Application {props.title}</h1>
      <div className="flex flex-col items-center mb-8">
        <input type="file" onChange={handleFileChange} className="mb-4 p-2 border rounded" />
        {selectedFile && <p className="font-bold">{selectedFile.name}</p>}
        <button onClick={handleUpload} className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600">
          Upload
        </button>
        {uploadFileName && <h3 className="mt-4">Uploading file: {uploadFileName}</h3>}
        {previewURL && <img src={previewURL} alt="Uploaded" className="mt-4 max-w-full h-auto" />}
        {showDownload && (
          <button onClick={handleDownload} className="bg-blue-800 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Download
          </button>
        )}
        <textarea
          placeholder="Write your post here..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="mt-4 p-2 border rounded"
        />
        <button onClick={createPost} className="bg-blue-800 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
          Create Post
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Delete File by Name</h2>
        <input
          type="text"
          placeholder="File Name"
          onChange={(e) => setDeleteFileName(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
        <button onClick={handleDeleteByName} className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete by Name
        </button>
      </div>
      <div ref={postRef}></div>
    </div>
  );
};

export default AppwriteImageUploader;
