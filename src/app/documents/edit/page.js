"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../utils/api";

export default function EditDocument() {
  const router = useRouter();
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await api.get(`/documents/${id}`);
        setDocument(response.data);
        setTitle(response.data.title);
        setContent(response.data.content || "");
      } catch (err) {
        setError("Document not found.");
      }
    };

    if (id) fetchDocument();
  }, [id]);

  const handleSave = async () => {
    try {
      await api.put(`/documents/${id}`, { title, content });
      router.push(`/documents/${id}`); // Redirect back to document details page
    } catch (err) {
      setError("Failed to update document.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!document) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Document</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>
        <button
          onClick={handleSave}
          className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
