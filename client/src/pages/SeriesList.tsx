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
    return (
      <div className="flex items-center justify-center min-h-screen text-xl bg-purple-200">
        Loading...
      </div>
    );
  }

  if (err) {
    return (
      <div>Error! {err instanceof Error ? err.message : 'Unknown Error'}</div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 bg-purple-200 ">
      <h1 className="mb-8 text-3xl font-bold">Series</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 ">
        {series.map((smiskiseries) => (
          <div
            key={smiskiseries.seriesId}
            className="p-4 bg-purple-100 border rounded shadow hover:shadow-lg hover:scale-110">
            <Link to={`/series/${smiskiseries.seriesId}`}>
              <img
                src={smiskiseries.imageUrl}
                alt={`Series ${smiskiseries.seriesId}`}
                className="object-cover w-full h-auto mb-2 rounded "
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
