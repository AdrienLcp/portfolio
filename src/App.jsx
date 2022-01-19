import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components
import Cursor from './components/Cursor';
import Navigation from './components/Navigation';

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

        <Cursor />
        <Navigation />

        <Routes>

          <Route path="/" element={ <Home /> } />

          <Route path="/a_propos" element={ <About /> } />

          <Route path="/contact" element={ <Contact /> } />

          <Route path="/competences" element={ <Knowledges /> } />

          <Route path="/projets" element={ <Portfolio /> } />

          <Route path="/*" element={ <NotFound /> } />

        </Routes>
    </BrowserRouter>
  );
};

export default App;