import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components
import Navigation from './components/Navigation';
import ScrollBar from './components/ScrollBar';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Knowledges from './pages/Knowledges';
import Portfolio from './pages/Portfolio';
import NotFound from './pages/NotFound';

import './styles/index.scss';

const App = () => {

  return (
    <BrowserRouter>

      <ScrollBar />
      <Navigation />

      <Routes>

        <Route
          exact path="/"
          element={
            <Home />
          }
        />

        <Route
          exact path="/a_propos"
          element={
            <About />
          }
        />

        <Route
          exact path="/contact"
          element={
            <Contact />
          }
        />

        <Route
          exact path="/competences"
          element={
            <Knowledges />
          }
        />

        <Route
          exact path="/portfolio"
          element={
            <Portfolio />
          }
        />

        <Route
          path="/"
          element={
            <NotFound />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;