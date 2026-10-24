
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          Manajemen Buku
        </Link>

        <div className="nav-links">
          <Link to="/">Daftar Buku</Link>
          <Link to="/tambah-buku">Tambah Buku</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tambah-buku" element={<AddBook />} />
      </Routes>
    </>
  );
}

export default App;
