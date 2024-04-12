import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./index.css";
// import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/Navbar";
import { firebaseConfig } from "./config/firebase";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create a context for Firebase
const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ app, auth, user }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Hook to use Firebase context
const useFirebase = () => useContext(FirebaseContext);

export { FirebaseProvider, useFirebase };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <Navbar />
        <Routes />
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
