import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { GenerosPeliculas } from "./components/GenerosPeliculas";


function App() {
  return (
    <>
      <BrowserRouter>

        <Menu />

        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/generospeliculas" element={<GenerosPeliculas />} />
            <Route path="*" element={<Navigate to="Inicio" replace />} />
          </Routes>
        </div>

        <Footer />
        
      </BrowserRouter>
    </>
  );
}


export default App;