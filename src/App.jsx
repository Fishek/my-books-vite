import React, { useState, useEffect} from "react";
import { Auth } from "./components/auth";
import "./App.css";
import { db } from "./firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BookList from "./components/booklist";

function App() {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookYear, setNewBookYear] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState("loading");


  const bookCollectionRef = collection(db, "Books");

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


  useEffect(() => {
    getBookList();
  }, []);

  useEffect(() => {
    console.log("hej")
  }, []);

  const handleSubmitBook = async (e) => {
    e.preventDefault();
    try {
      await addDoc(bookCollectionRef, {
        title: newBookTitle,
        author: newBookAuthor,
        year: newBookYear,
      });
      getBookList();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (bookId) => {
    const filteredList = doc(db, "Books", bookId);
    await deleteDoc(filteredList);
    getBookList();
  };

  if (isLoggedIn === "loading") {
    return <div></div>;
  }

  return (
    <div>
      <h1>BookList</h1>

      {!isLoggedIn ? (
        <Auth />
      ) : (
        <div className="form-container">
          <Button
            className="button-log-out"
            variant="outlined"
            onClick={logout}
          >
            Log Out
          </Button>
          <form className="form-form" onSubmit={handleSubmitBook}>
            <TextField
              className="form-input"
              placeholder="Movie title..."
              onChange={(e) => setNewBookTitle(e.target.value)}
            />
            <TextField
              className="form-input"
              placeholder="Author name..."
              onChange={(e) => setNewBookAuthor(e.target.value)}
            />
            <TextField
              className="form-input"
              placeholder="Year..."
              type="number"
              onChange={(e) => setNewBookYear(Number(e.target.value))}
            />
            <Button variant="outlined" type="submit">
              Add the Book
            </Button>
          </form>

          <BookList books={books} onDeleteBook={deleteBook} />
        </div>
      )}
    </div>
  );
}

export default App;
