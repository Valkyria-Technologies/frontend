"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../utils/api";

export default function CreateDocument() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    try {
      await api.post("/documents", { title, content });
      router.push("/documents"); // Redirect to documents list
    } catch (err) {
      setError("Failed to create document.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create a Document
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 w-full"
        >
          Create Document
        </button>
      </div>
    </div>
  );
}
