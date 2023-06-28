import React, { useEffect, useState } from "react";
import { deleteBook, getBooks } from "../../services/apiCalls";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const { credentials } = useSelector(userData);
  const token = credentials.token;

  
  const deleteHandler = (bookId, token) => {
    deleteBook({ id: bookId }, token);
  };

  useEffect(() => {
    getBooks().then((res) => setBooks(res));
  }, [deleteHandler]);

  return (
    <>
      {books.map((book) => {
        return (
          <div key={book.id}>
            <p>{book.title}</p>
            <Button onClick={() => deleteHandler(book.id, token)}>
              DELETE
            </Button>
          </div>
        );
      })}
    </>
  );
};
