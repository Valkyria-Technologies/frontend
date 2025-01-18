import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get('api/v1/documents');
        debugger
        setDocuments(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch documents');
      }
    };

    fetchDocuments();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Documents</h1>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <p><strong>ID:</strong> {doc.id}</p>
              <p><strong>Title:</strong> {doc.title}</p>
              <a href={`/documents/${doc.id}`}>View Document</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents found.</p>
      )}
    </div>
  );
}
