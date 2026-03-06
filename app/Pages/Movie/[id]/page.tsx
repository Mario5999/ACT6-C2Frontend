"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
};

export default function MovieDetailPage() {
  const params = useParams<{ id: string }>();
  const movieId = params?.id;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) {
        setError("ID de película inválido");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/apiv1/movies/${movieId}`);
        if (!res.ok) {
          throw new Error("No se pudo obtener el detalle de la película");
        }
        const data: MovieDetail = await res.json();
        setMovie(data);
      } catch {
        setError("Error al cargar detalle de la película");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!movie) return <p className="p-6">No se encontró la película.</p>;

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/next.svg";

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/?tab=movies" className="text-sm font-medium hover:underline">
        ← Volver a películas
      </Link>

      <div className="mt-4 grid gap-6 md:grid-cols-[320px_1fr]">
        <Image
          src={posterPath}
          alt={movie.title}
          width={320}
          height={480}
          className="h-auto w-full rounded-md"
        />

        <section>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Estreno: {movie.release_date || "Sin fecha"}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Calificación: {movie.vote_average?.toFixed(1) ?? "N/A"}
          </p>
          <p className="mt-4 leading-7">{movie.overview || "Sin descripción disponible."}</p>
        </section>
      </div>
    </main>
  );
}