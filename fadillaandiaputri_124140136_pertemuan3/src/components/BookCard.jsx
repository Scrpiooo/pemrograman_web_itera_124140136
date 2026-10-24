
import { useState } from "react";
import PropTypes from "prop-types";

function BookCard({ book, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [status, setStatus] = useState(book.status);
  const [error, setError] = useState("");

  function handleSave(event) {
    event.preventDefault();

    if (!title.trim() || !author.trim()) {
      setError("Judul dan penulis wajib diisi.");
      return;
    }

    onUpdate(book.id, {
      title: title.trim(),
      author: author.trim(),
      status,
    });

    setError("");
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <article className="book-card">
        <form onSubmit={handleSave}>
          <h3>Edit Buku</h3>

          <label htmlFor={`title-${book.id}`}>Judul Buku</label>
          <input
            id={`title-${book.id}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label htmlFor={`author-${book.id}`}>Penulis</label>
          <input
            id={`author-${book.id}`}
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />

          <label htmlFor={`status-${book.id}`}>Status</label>
          <select
            id={`status-${book.id}`}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="Belum Dibaca">Belum Dibaca</option>
            <option value="Sedang Dibaca">Sedang Dibaca</option>
            <option value="Selesai Dibaca">Selesai Dibaca</option>
          </select>

          {error && <p className="error">{error}</p>}

          <button type="submit">Simpan Perubahan</button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Batal
          </button>
        </form>
      </article>
    );
  }

  return (
    <article className="book-card">
      <h3>{book.title}</h3>
      <p>Penulis: {book.author}</p>
      <p>
        Status: <span className="status-badge">{book.status}</span>
      </p>

      <div className="book-actions">
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>

        <button type="button" onClick={() => onDelete(book.id)}>
          Hapus
        </button>
      </div>
    </article>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookCard;
