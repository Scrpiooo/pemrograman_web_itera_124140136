
import PropTypes from "prop-types";
import { useBookContext } from "../context/BookContext";
import BookCard from "./BookCard";

function BookList({ onEdit }) {
  const {
    books,
    filteredBooks,
    updateBook,
    deleteBook,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
  } = useBookContext();

  return (
    <section className="book-list">
      <h2>Daftar Buku Saya</h2>

      <div className="book-filters">
        <div>
          <label htmlFor="search-book">Cari Buku</label>
          <input
            id="search-book"
            type="search"
            placeholder="Cari judul atau penulis..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="filter-status">Filter Status</label>
          <select
            id="filter-status"
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Belum Dibaca">Belum Dibaca</option>
            <option value="Sedang Dibaca">Sedang Dibaca</option>
            <option value="Selesai Dibaca">Selesai Dibaca</option>
          </select>
        </div>
      </div>

      <p className="book-count">
        Menampilkan {filteredBooks.length} dari {books.length} buku
      </p>

      {filteredBooks.length === 0 ? (
        <p className="empty-message">
          {books.length === 0
            ? "Belum ada buku. Yuk, tambahkan buku pertamamu!"
            : "Buku tidak ditemukan. Coba kata kunci atau filter lain."}
        </p>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onUpdate={updateBook}
              onDelete={deleteBook}
            />
          ))}
        </div>
      )}
    </section>
  );
}

BookList.propTypes = {
  onEdit: PropTypes.func,
};

export default BookList;
