"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../../utils/api"; // Axios instance for API requests
import { document as mockDocuments } from "../../../../utils/Mocks/Documents";

export default function DocumentDetails() {
  const router = useRouter();
  const params = useParams(); // Use useParams to get the dynamic route parameters
  const { id } = params; // Get the document ID from the parameters
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) return;

    // Find the document in mock data
    const foundDocument = mockDocuments.find((doc) => doc.id === parseInt(id));

    if (foundDocument) {
      setDocument(foundDocument);
      setTitle(foundDocument.title);
      setContent(foundDocument.content || ""); // Default empty if no content
    } else {
      setError("Document not found");
    }

    // Fetch from the Rails API:
    // const fetchDocument = async () => {
    //   try {
    //     const response = await api.get(`/documents/${id}`);
    //     setDocument(response.data);
    //     setTitle(response.data.title);
    //     setContent(response.data.content || "");
    //   } catch (err) {
    //     setError(err.response?.data?.error || "Failed to fetch document");
    //   }
    // };

    // fetchDocument();
  }, [id]);

  const handleSave = async () => {
    try {
      // Update the mock document
      const updatedDocument = { ...document, title, content };
      const index = mockDocuments.findIndex((doc) => doc.id === document.id);
      if (index !== -1) {
        mockDocuments[index] = updatedDocument;
      }

      // // Update in Rails API
      // await api.put(`/documents/${id}`, {
      //   title,
      //   content,
      // });

      setDocument(updatedDocument);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update document:", err);
      setError(err.response?.data?.error || "Failed to update document");
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!document) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="title text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-500 pb-4">
          Document Details
        </h1>
        <div className="border-t border-gray-300 pt-4">
          {isEditing ? (
            <dvi className="flex flex-col mt-6 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Content:
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="4"
                ></textarea>
              </div>
            </dvi>
          ) : (
            <>
              <p className="text-gray-700">
                <strong>ID:</strong> {document.id}
              </p>
              <p className="text-gray-700">
                <strong>Title:</strong> {document.title}
              </p>
              <p className="text-gray-700">
                <strong>Content:</strong>{" "}
                {document.content || "No content available"}
              </p>
              <p className="text-gray-700">
                <strong>Author (User ID):</strong>{" "}
                {document.user_id || "Unknown"}
              </p>
              <p className="text-gray-700">
                <strong>Created At:</strong>{" "}
                {new Date(document.created_at).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>Updated At:</strong>{" "}
                {new Date(document.updated_at).toLocaleString()}
              </p>
            </>
          )}
        </div>
        <div className="flex mt-6 gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 w-full"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-full shadow hover:bg-gray-600 w-full"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow hover:bg-yellow-600 w-full"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => router.push("/documents")}
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 w-full"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
