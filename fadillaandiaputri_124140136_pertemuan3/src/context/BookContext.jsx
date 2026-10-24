import { createContext, useContext } from "react";
import useBooks from "../hooks/useBook";

const BookContext = createContext();

export function BookProvider({ children }) {
  const bookData = useBooks();

  return (
    <BookContext.Provider value={bookData}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  return useContext(BookContext);
}

export default BookContext;
