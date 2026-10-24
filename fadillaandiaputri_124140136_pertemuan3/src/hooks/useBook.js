
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

function useBooks() {
  const [books, setBooks] = useLocalStorage("books", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  function addBook(book) {
    const newBook = {
      id: Date.now(),
      title: book.title,
      author: book.author,
      status: book.status || "Belum Dibaca",
    };

    setBooks((previousBooks) => [...previousBooks, newBook]);
  }

  function updateBook(id, updatedData) {
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book.id === id ? { ...book, ...updatedData } : book
      )
    );
  }

  function deleteBook(id) {
    setBooks((previousBooks) =>
      previousBooks.filter((book) => book.id !== id)
    );
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "Semua" || book.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return {
    books,
    filteredBooks,
    addBook,
    updateBook,
    deleteBook,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
  };
}

export default useBooks;
