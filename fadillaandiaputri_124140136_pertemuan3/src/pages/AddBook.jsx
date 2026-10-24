
import { Link, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import "./AddBook.css";

function AddBook() {
  const navigate = useNavigate();

  return (
    <main className="add-book-page">
      <section className="add-book-intro">
        <Link to="/" className="add-book-brand">
          <span className="brand-icon">B.</span>
          BukuKu
        </Link>

        <div className="intro-content">
          <span className="intro-label">YOUR PERSONAL LIBRARY</span>

          <h1>
            A new chapter
            <br />
            <span>begins here.</span>
          </h1>

          <p>
            Setiap buku punya cerita.
            Simpan buku favoritmu dan catat perjalanan
            membacamu, satu halaman demi satu halaman.
          </p>


          <p className="intro-footer">
            MAKE TIME FOR A GOOD STORY.
          </p>
        </div>
      </section>

      <section className="add-book-content">
        <Link to="/" className="back-link">
          ← Kembali ke Daftar Buku
        </Link>

        <div className="add-book-heading">
          <span className="form-eyebrow">BOOK COLLECTION / 01</span>
          <h2>Tambah Buku</h2>
          <p>
            Ada buku baru? Yuk, tambahkan ke koleksimu.
          </p>
        </div>

        <BookForm onSuccess={() => navigate("/")} />

      </section>
    </main>
  );
}

export default AddBook;
