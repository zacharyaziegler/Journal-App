import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/entry-detail.css';

const EntryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/entries/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setEntry(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!entry) {
    return <p className="loading">Loading…</p>;
  }

  return (
    <div className="entry-detail-container">
      <button
        className="entry-detail-back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="entry-detail-title">{entry.title}</h1>
      <time className="entry-detail-date">
        {new Date(entry.createdAt).toLocaleString()}
      </time>
      <p className="entry-detail-content">{entry.content}</p>

      <button
        className="entry-detail-edit"
        onClick={() => navigate(`/edit/${id}`)}
      >
        Edit
      </button>
    </div>
  );
};

export default EntryDetail;
