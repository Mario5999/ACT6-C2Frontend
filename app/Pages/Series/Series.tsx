import { useEffect, useState } from "react";
import SeriesCard from "../../components/SeriesCard";
import { ApiResponse, TVShow } from "../../types/media";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function Series() {
  const [series, setSeries] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(`${API_URL}/apiv1/tv`);
        if (!res.ok) {
          throw new Error("No se pudo obtener series");
        }
        const data: ApiResponse<TVShow> = await res.json();
        setSeries(data.results);
      } catch {
        setError("Error al cargar series");
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Series Populares</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
        {series.map((tv) => (
          <SeriesCard key={tv.id} tv={tv} />
        ))}
      </div>
    </div>
  );
}