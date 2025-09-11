import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  // Change Document Title Based on Route
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/":
        document.title = "Web + Graphic Designer | Abhijith Gaganan";
        break;
      case "/contact":
        document.title = "Contact | Abhijith Gaganan";
        break;
      default:
        document.title = "404 Not Found | Abhijith Gaganan";
    }
  });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
