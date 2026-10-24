
import { useState } from "react";
import PropTypes from "prop-types";
import { useBookContext } from "../context/BookContext";

function BookForm({ onSuccess }) {
  const { addBook } = useBookContext();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Belum Dibaca");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Judul buku wajib diisi";
    }

    if (!author.trim()) {
      newErrors.author = "Nama penulis wajib diisi";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    addBook({
      title: title.trim(),
      author: author.trim(),
      status,
    });

    setTitle("");
    setAuthor("");
    setStatus("Belum Dibaca");

    if (onSuccess) {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>Tambah Buku</h2>

      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Masukkan judul buku"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="error">
            {errors.title}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="author">Nama Penulis</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Masukkan nama penulis"
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? "author-error" : undefined}
        />
        {errors.author && (
          <p id="author-error" className="error">
            {errors.author}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status Buku</label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="Belum Dibaca">Belum Dibaca</option>
          <option value="Sedang Dibaca">Sedang Dibaca</option>
          <option value="Selesai Dibaca">Selesai Dibaca</option>
        </select>
      </div>

      <button type="submit">Simpan Buku</button>
    </form>
  );
}

BookForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default BookForm;
