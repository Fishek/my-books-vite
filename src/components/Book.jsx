import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";



function Book({book, deleteBook}) {

    
  
  return (
    <div className="book-card">
   
      <div className="book-card-top">
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      
      </div>

      <button onClick={() => deleteBook(book.id)}>
      X
      </button>
     
  
    </div>
  );
}

export default Book;
