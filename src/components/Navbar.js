import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useFirebase } from "../../index";

const Navbar = () => {
  //   const { auth } = useFirebase();
  const [isNavbarOpaque, setIsNavbarOpaque] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsNavbarOpaque(scrollPosition < 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((user) => {
  //       setUser(user || null); // Ensure user is not null
  //     });

  //     return () => unsubscribe();
  //   }, [auth]);

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow navbar-dark bg-dark">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link className="navbar-brand" to="/">
          <h1>Pokessist</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          data-toggle="collapse"
          data-target=".navbar-collapse"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/pokemon">
                Pokemon Selector
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/evs">
                EV Trainer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
