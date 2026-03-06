import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import { ApiResponse, Movie } from "../../types/media";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${API_URL}/apiv1/movies`);
        if (!res.ok) {
          throw new Error("No se pudo obtener películas");
        }
        const data: ApiResponse<Movie> = await res.json();
        setMovies(data.results);
      } catch {
        setError("Error al cargar películas");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Películas Populares</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}