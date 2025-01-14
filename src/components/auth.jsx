import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }npm
  };

  
 

  return (
    <div>
    
    <div className="auth-section">
    Login
    <div className="auth-section-input">
      <TextField
      variant="outlined"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      </div>
      <div className="auth-section-buttons">
      <Button  variant="outlined" onClick={signIn}>Sign in</Button>
      
      
      </div>
      </div>
    </div>
  );
};
