"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDocument, updateDocument } from "../../../utils/api";

export default function UpdateDocument() {
  const router = useRouter();
  const { id } = router.query;
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchDocumentDetails = async () => {
      try {
        const response = await fetchDocument(id);
        setDocument(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        setError("Document not found");
      }
    };

    fetchDocumentDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedDoc = {
      title,
      content,
    };

    try {
      await updateDocument(id, updatedDoc);
      router.push(`/documents/${id}`); // Redirect to the document details page
    } catch (err) {
      setError("Failed to update document");
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
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Update Document
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 w-full"
          >
            Save Changes
          </button>
        </form>
        <button
          onClick={() => router.push(`/documents/${id}`)}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
