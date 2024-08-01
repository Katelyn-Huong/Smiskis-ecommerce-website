// import React from 'react';
import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/NavBar';
import { SeriesList } from './pages/SeriesList';
import './index.css';
import { HomePage } from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series" element={<SeriesList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
