import "../styles/journal-entry.css";

const JournalEntry = ({ entry, onClick }) => {
  const preview =
    entry.content.length > 100
      ? entry.content.slice(0, 100) + "..."
      : entry.content;

  return (
    <div className="journal-entry" onClick={onClick}>
      <h2 className="journal-entry-title">{entry.title}</h2>
      <p className="journal-entry-preview">{preview}</p>
      <time className="journal-entry-date">
        {new Date(entry.createdAt).toLocaleDateString()}
      </time>
    </div>
  );
};

export default JournalEntry;
