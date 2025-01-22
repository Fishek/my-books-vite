import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Book from "./book";



function BookList({books, onDeleteBook}) {

    
  
  return (
    <div className="book-list-main">
    
    {books.map((book) => (
      
      <div key={book.id} className="book-list">
      <Book book = {book} onDeleteBook={onDeleteBook} />
      </div>
        
     
    ))}
  
    </div>
  );
}

export default BookList;

