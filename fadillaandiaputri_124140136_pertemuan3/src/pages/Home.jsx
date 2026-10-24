
import { Link } from "react-router-dom";
import BookList from "../components/BookList";

function Home() {
  return (
    <main className="page-container">
      <header className="page-header">
        <h1>Halo, Pembaca!</h1>
        <p>
          Catat koleksi buku, pantau progres membaca,
          dan temukan buku yang ingin kamu baca.
        </p>
        <Link to="/tambah-buku">
          <button type="button">+ Tambah Buku</button>
        </Link>
      </header>

      <BookList />
    </main>
  );
}

export default Home;
