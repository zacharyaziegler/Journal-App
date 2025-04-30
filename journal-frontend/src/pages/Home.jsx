// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JournalEntry from "../components/JournalEntry";
import "../styles/home.css";

const mockEntries = [
  { id: 1, title: "My First Entry", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",  createdAt: "2025-04-27T10:30:00Z" },
  { id: 2, title: "Vacation Thoughts", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",  createdAt: "2025-04-26T18:45:00Z" },
  { id: 3, title: "Todo for Tomorrow", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.", createdAt: "2025-04-25T09:15:00Z" },
  { id: 4, title: "My First Entry", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",  createdAt: "2025-04-27T10:30:00Z" },
  { id: 5, title: "Vacation Thoughts", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",  createdAt: "2025-04-26T18:45:00Z" },
  { id: 6, title: "Todo for Tomorrow", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.", createdAt: "2025-04-25T09:15:00Z" },
  { id: 7, title: "My First Entry", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",  createdAt: "2025-04-27T10:30:00Z" },
  { id: 8, title: "Vacation Thoughts", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.",  createdAt: "2025-04-26T18:45:00Z" },
  { id: 9, title: "Todo for Tomorrow", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.", createdAt: "2025-04-25T09:15:00Z" },
];


const Home = () => {
  const [entries, setEntries] = useState(mockEntries);
  const navigate = useNavigate();



  useEffect(() => {
    fetch("http://localhost:8080/api/entries")
      .then(res => res.json())
      .then(setEntries)
      .catch(err => console.error("Failed to load entries:", err));
  }, []);

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
