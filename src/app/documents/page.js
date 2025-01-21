"use client"
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { document } from "../../../utils/Mocks/Documents";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     try {
  //       const response = await api.get("api/v1/documents");
  //       debugger;
  //       setDocuments(response.data);
  //     } catch (err) {
  //       setError(err.response?.data?.error || "Failed to fetch documents");
  //     }
  //   };

  //   fetchDocuments();
  // }, []);

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }


  return (
    <div className=" min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      {/* {documents.length > 0 ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <p><strong>ID:</strong> {doc.id}</p>
              <p><strong>Title:</strong> {doc.title}</p>
       div       <a href={`/documents/${doc.id}`}>View Document</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents found.</p>
      )} */}
      <div className="   max-w-4xl mx-auto">
        <h1 className="title text-4xl font-extrabold text-gray-800 text-center mb-8 border-b-4 border-blue-500 pb-4">
          Documents
        </h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {document.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-gray-300 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transform transition-all duration-200"
            >
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-500 font-bold mb-4">
                {doc.id}
              </div>
              <p className="text-gray-800 font-semibold mb-4">{doc.title}</p>
              <a
                href={`/documents/${doc.id}`}
                className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
              >
                View Document →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
