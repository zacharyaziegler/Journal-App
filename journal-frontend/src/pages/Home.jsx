import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JournalEntry from "../components/JournalEntry";
import "../styles/home.css";


const Home = () => {
  const [entries, setEntries] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/entries")
      .then(res => res.json())
      .then(setEntries)
      .catch(err => console.error("Failed to load entries:", err));
  }, []);

  const deleteEntry = (id) => {
    fetch(`http://localhost:8080/api/entries/${id}`, { method: "DELETE"})
      .then(res => {
        if (!res.ok) throw new Error("Delete Failed");
        setEntries(prev => prev.filter(e => e.id !== id));
      })
      .catch(err => {
        console.error(err);
        alert("Couldn't delete entry");
      });
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">My Journal</h1>
        <div className="home-header-buttons">
          <button className="home-button" onClick={() => navigate("/add")} aria-label="Add entry">＋</button>
          <button className="home-button" onClick={() => navigate("/edit")} aria-label="Edit entries">✎</button>
        </div>
      </header>

      <main className="home-list">
        {entries.length > 0 ? (
          entries.map(entry => (
            <JournalEntry
              key={entry.id}
              entry={entry}
              onClick={() => navigate(`/edit/${entry.id}`)}
              onDelete={deleteEntry}
            />
          ))
        ) : (
          <p className="home-empty">No entries yet. Click ＋ to add one.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
