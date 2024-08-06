import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/NavBar';
import { SeriesList } from './pages/SeriesList';
import './index.css';
import { HomePage } from './pages/HomePage';
import { SeriesDetails } from './pages/SeriesDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="series" element={<SeriesList />} />
        <Route path="series/:seriesId" element={<SeriesDetails />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
