
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BookProvider } from "../context/BookContext";
import BookForm from "./BookForm";

function renderBookForm() {
  return render(
    <MemoryRouter>
      <BookProvider>
        <BookForm />
      </BookProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe("BookForm", () => {
  it("menampilkan formulir tambah buku", () => {
    renderBookForm();

    expect(screen.getByLabelText("Judul Buku")).toBeInTheDocument();
    expect(screen.getByLabelText("Nama Penulis")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Simpan Buku" })).toBeInTheDocument();
  });

  it("menampilkan error jika judul kosong", () => {
    renderBookForm();

    fireEvent.change(screen.getByLabelText("Nama Penulis"), {
      target: { value: "Andrea Hirata" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan Buku" }));

    expect(screen.getByText("Judul buku wajib diisi")).toBeInTheDocument();
  });

  it("menampilkan error jika penulis kosong", () => {
    renderBookForm();

    fireEvent.change(screen.getByLabelText("Judul Buku"), {
      target: { value: "Laskar Pelangi" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan Buku" }));

    expect(screen.getByText("Nama penulis wajib diisi")).toBeInTheDocument();
  });

  it("menambahkan buku ketika judul dan penulis terisi", () => {
    renderBookForm();

    fireEvent.change(screen.getByLabelText("Judul Buku"), {
      target: { value: "Laskar Pelangi" },
    });

    fireEvent.change(screen.getByLabelText("Nama Penulis"), {
      target: { value: "Andrea Hirata" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan Buku" }));

    expect(JSON.parse(localStorage.getItem("books"))).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem("books"))[0].title).toBe("Laskar Pelangi");
  });

  it("mengosongkan formulir setelah buku berhasil disimpan", () => {
    renderBookForm();

    fireEvent.change(screen.getByLabelText("Judul Buku"), {
      target: { value: "Laskar Pelangi" },
    });

    fireEvent.change(screen.getByLabelText("Nama Penulis"), {
      target: { value: "Andrea Hirata" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan Buku" }));

    expect(screen.getByLabelText("Judul Buku")).toHaveValue("");
    expect(screen.getByLabelText("Nama Penulis")).toHaveValue("");
  });
});
