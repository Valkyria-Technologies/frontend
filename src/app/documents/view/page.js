"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../utils/api";

import { document } from "../../../../utils/Mocks/Documents";

export default function ViewDocument() {
  const router = useRouter();
  const { id } = useParams();
  //   const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await api.get(`/documents/${id}`);
        setDocument(response.data);
      } catch (err) {
        setError("Document not found.");
      }
    };

    if (id) fetchDocument();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!document) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Document Details
        </h1>
        <p className="text-gray-700">
          <strong>ID:</strong> {document.id}
        </p>
        <p className="text-gray-700">
          <strong>Title:</strong> {document.title}
        </p>
        <p className="text-gray-700">
          <strong>Content:</strong> {document.content}
        </p>
        <p className="text-gray-700">
          <strong>Author (User ID):</strong> {document.user_id}
        </p>
        <p className="text-gray-700">
          <strong>Created At:</strong>{" "}
          {new Date(document.created_at).toLocaleString()}
        </p>
        <p className="text-gray-700">
          <strong>Updated At:</strong>{" "}
          {new Date(document.updated_at).toLocaleString()}
        </p>
        <button
          onClick={() => router.push("/documents")}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 w-full mt-6"
        >
          Back to Documents
        </button>
      </div>
    </div>
  );
}
