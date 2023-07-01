import React, { useState } from "react";
import "../styles/styleHome.css";
import iNoteLogo from "./images/iNoteLogo.PNG";
import takingNotes from "./images/taking-notes.svg";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="homePage">
        <header className="rowHome containerHome">
          <a className="logoHome rowHome" href="/">
            <img src={iNoteLogo} className="logoHome" alt="Logo" />
          </a>

          <div
            className={`toggleMenu ${isActive ? "active" : ""}`}
            onClick={toggleMenu} >
          </div>
          
          <nav className={`navigation rowHome ${isActive ? "active" : ""}`}>
            <ul className="rowHome">
              <li>
                <a className="aLink" href="/">
                  About
                </a>
              </li>
              <li>
                <Link className="aLink" to="/login">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <section className="hero rowHome containerHome">
          <div>
            <h1>iNote</h1>
            <h2>Keep track of your notes</h2>
            <p>
              Sign up for an account to start using iNote today. It's free and
              easy!
            </p>
            <Link className="aLink" to="/login">
              Sign Up
            </Link>
          </div>

          <div className="rowHome">
            <img src={takingNotes} alt="Notes" />
          </div>
        </section>
      </div>
    </>
  );
}
