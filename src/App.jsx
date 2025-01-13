import React, { useState, useEffect } from "react";
import { Auth } from "./components/auth";
import "./App.css";
import { db } from "./firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookYear, setNewBookYear] = useState(0);

  const bookCollectionRef = collection(db, "Books");

  useEffect(() => {
    const getBookList = async () => {
      try {
        const data = await getDocs(bookCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBooks(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getBookList();
  }, []);

  const handleSubmitBook = async (e) => {
    e.preventDefault();
    try {
      await addDoc(bookCollectionRef, {
        title: newBookTitle,
        author: newBookAuthor,
        year: newBookYear,
      });
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <div>
      <Auth />

      <form style={{ marginTop: "20px" }} onSubmit={handleSubmitBook}>
        <TextField
          placeholder="Movie title..."
          onChange={(e) => setNewBookTitle(e.target.value)}
        />
        <TextField
          placeholder="Author name..."
          onChange={(e) => setNewBookAuthor(e.target.value)}
        />
        <TextField
          placeholder="Year..."
          type="number"
          onChange={(e) => setNewBookYear(Number(e.target.value))}
        />
        <Button variant="outlined" type="submit">
          Add the Book
        </Button>
      </form>

      <div>
        {books.map((book) => (
          <div>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
