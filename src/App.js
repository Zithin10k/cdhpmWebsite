import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Research from './pages/Research';
import Partnership from './pages/Partnership';
import OurPeople from './pages/OurPeople';
import About from './pages/About';
import WorkWithUs from './pages/WorkWithUs';
import News from './pages/News';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="research" element={<Research />} />
              <Route path="partnership" element={<Partnership />} />
              <Route path="our-people" element={<OurPeople />} />
              <Route path="our-people/:sectionId" element={<OurPeople />} />
              <Route path="about" element={<About />} />
              <Route path="work-with-us" element={<WorkWithUs />} />
              <Route path="news" element={<News />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
