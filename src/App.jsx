import React, { useState, useEffect } from "react";
import { Auth } from "./components/auth";
import "./App.css";
import { db } from "./firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BookList from "./components/booklist";
import Book from "./components/book";


function App() {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookYear, setNewBookYear] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
        console.log("User is logged in:", currentUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        console.log("User is logged out");
      }
    });
    return () => authChange();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Auth />
      ) : (
        <div className="form-container">
          <Button className="button-log-out" variant="outlined" onClick={logout}>
            Log Out
          </Button>
          <form style={{ marginTop: "20px", marginBottom:"50px" }} onSubmit={handleSubmitBook}>
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

          <BookList books = {books}/>
        </div>
      )}
    </div>
  );
}

export default App;
