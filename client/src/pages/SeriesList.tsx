import { useEffect, useState } from 'react';
import { Series } from '../../../server/lib/data';
import { Link } from 'react-router-dom';

export function SeriesList() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<unknown>();

  useEffect(() => {
    async function getSeries() {
      try {
        const response = await fetch('/api/series');
        if (!response.ok) throw new Error(`Response status ${response.status}`);
        const series = (await response.json()) as Series[];
        console.log(series);
        setSeries(series);
      } catch (err) {
        setErr(err);
      } finally {
        setLoading(false);
      }
    }
    getSeries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (err) {
    return (
      <div>Error! {err instanceof Error ? err.message : 'Unknown Error'}</div>
    );
  }

  return (
    <div className="flex p-4 bg-purple-300">
      <h1 className="mb-4 text-2xl font-bold">Series</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {series.map((smiskiseries) => (
          <div
            key={smiskiseries.seriesId}
            className="p-4 border rounded shadow hover:shadow-lg">
            <Link to={`/series/${smiskiseries.seriesId}`}>
              <img
                src={smiskiseries.imageUrl}
                alt={`Series ${smiskiseries.seriesId}`}
                className="w-full h-auto mb-2 rounded"
              />
              <h2 className="text-xl font-bold">{smiskiseries.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
