import "../styles/journal-entry.css";

const JournalEntry = ({ entry, onClick, onDelete }) => {
  const preview =
    entry.content.length > 100
      ? entry.content.slice(0, 100) + "..."
      : entry.content;

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevents triggering card's onClick
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this entry?")) {
      onDelete(entry.id);
    }
  };

  return (
    <div className="journal-entry" onClick={onClick}>
      <button
        className="journal-entry-delete"
        onClick={handleDelete}
        aria-label="Delete entry"
      >
        x
      </button>
      <div className="journal-entry-body" onClick={onClick}>
        <h2 className="journal-entry-title">{entry.title}</h2>
        <p className="journal-entry-preview">{preview}</p>
        <time className="journal-entry-date">
          {new Date(entry.createdAt).toLocaleDateString()}
        </time>
      </div>
    </div>
  );
};

export default JournalEntry;
