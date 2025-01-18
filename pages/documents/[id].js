import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function DocumentDetails() {
  const router = useRouter();
  const { id } = router.query; // Get the document ID from the URL
  const [document, setDocument] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!id) return;

  //   const fetchDocument = async () => {
  //     try {
  //       const response = await api.get(`/documents/${id}`);
  //       setDocument(response.data);
  //     } catch (err) {
  //       setError(err.response?.data?.error || 'Failed to fetch document');
  //     }
  //   };

  //   fetchDocument();
  // }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!document) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Document Details</h1>
      <p><strong>ID:</strong> {document.id}</p>
      <p><strong>Title:</strong> {document.title}</p>
      <p><strong>Content:</strong> {document.content}</p>
      <p><strong>Author (User ID):</strong> {document.user_id}</p>
      <p><strong>Created At:</strong> {new Date(document.created_at).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(document.updated_at).toLocaleString()}</p>
    </div>
  );
}
