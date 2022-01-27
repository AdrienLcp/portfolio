import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components
import Cursor from './components/Cursor';
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

  const [showLoader, setShowLoader] = useState(true);

  return (
    <BrowserRouter>
      <ScrollBar />
      <Cursor />
      <Navigation />

      <Routes>

        <Route path="/" element={ <Home setShowLoader={setShowLoader} /> } />

        <Route path="/a_propos" element={ <About setShowLoader={setShowLoader} /> } />

        <Route path="/contact" element={ <Contact setShowLoader={setShowLoader} /> } />

        <Route path="/competences" element={ <Knowledges setShowLoader={setShowLoader} /> } />

        <Route path="/projets" element={ <Portfolio setShowLoader={setShowLoader} /> } />

        <Route path="/*" element={ <NotFound setShowLoader={setShowLoader} /> } />

      </Routes>
    </BrowserRouter>
  );
};

export default App;