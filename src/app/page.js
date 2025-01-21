"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const id = 3;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Document Management Actions
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => router.push("/documents/create")}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 w-full"
          >
            Create a Document
          </button>
          <button
            onClick={() => router.push("/documents/[id]/update")}
            className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 w-full"
          >
            Edit a Document
          </button>
          <button
            onClick={() => router.push(`/documents/${id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 w-full"
          >
            View a Document
          </button>
          <button
            onClick={() => router.push("/documents")}
            className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 w-full"
          >
            List all Documents
          </button>
        </div>
      </div>
    </div>
  );
}
