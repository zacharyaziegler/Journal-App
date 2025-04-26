// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/entries')
      .then(res => res.json())
      .then(setEntries)
      .catch(err => console.error('Failed to load entries:', err));
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">My Journal</h1>
        <div className="home-header-buttons">
          <button
            className="home-button"
            onClick={() => navigate('/add')}
            aria-label="Add entry"
          >
            ＋
          </button>
          <button
            className="home-button"
            onClick={() => navigate('/edit')}
            aria-label="Edit entries"
          >
            ✎
          </button>
        </div>
      </header>

      <main className="home-list">
        {entries.length ? (
          entries.map(entry => (
            <div
              key={entry.id}
              className="home-entry"
              onClick={() => navigate(`/entries/${entry.id}`)}
            >
              <h2 className="home-entry-title">{entry.title}</h2>
              <time className="home-entry-date">
                {new Date(entry.createdAt).toLocaleDateString()}
              </time>
            </div>
          ))
        ) : (
          <p className="home-empty">No entries yet. Click ＋ to add one.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
