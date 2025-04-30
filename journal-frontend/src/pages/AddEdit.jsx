import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/add-edit.css';

const AddEdit = () => {
  const { id } = useParams();           // if present, we’re editing, use PUT instead of POST
  const navigate = useNavigate();

  // form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // load existing entry when editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/entries/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load entry');
          return res.json();
        })
        .then(entry => {
          setTitle(entry.title);
          setContent(entry.content);
        })
        .catch(console.error);
    }
  }, [id]);

  const handleSave = () => {
    const payload = { title, content };
    const method  = id ? 'PUT' : 'POST';
    const url     = id
      ? `http://localhost:8080/api/entries/${id}`
      : 'http://localhost:8080/api/entries';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Save failed');
        return res.json();
      })
      .then( () => {
        navigate(`/`);
      })
      .catch(err => {
        console.error(err);
        alert('Could not save entry. Please try again.');
      });
  };

  return (
    <div className="add-edit-container">
      <div className="add-edit-header">
        <button
          className="add-edit-back"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <button
          className="add-edit-save"
          onClick={handleSave}
          disabled={!title.trim() && !content.trim()}
        >
          Save
        </button>
      </div>

      <input
        className="add-edit-title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoFocus
      />

      <textarea
        className="add-edit-content"
        placeholder="Start typing…"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
    </div>
  );
};

export default AddEdit;
