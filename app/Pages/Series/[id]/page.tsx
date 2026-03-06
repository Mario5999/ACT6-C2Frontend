"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type SeriesDetail = {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  number_of_seasons?: number;
  poster_path: string | null;
  vote_average: number;
};

export default function SeriesDetailPage() {
  const params = useParams<{ id: string }>();
  const seriesId = params?.id;

  const [series, setSeries] = useState<SeriesDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      if (!seriesId) {
        setError("ID de serie inválido");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/apiv1/tv/${seriesId}`);
        if (!res.ok) {
          throw new Error("No se pudo obtener el detalle de la serie");
        }
        const data: SeriesDetail = await res.json();
        setSeries(data);
      } catch {
        setError("Error al cargar detalle de la serie");
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [seriesId]);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!series) return <p className="p-6">No se encontró la serie.</p>;

  const posterPath = series.poster_path
    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
    : "/next.svg";

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/?tab=series" className="text-sm font-medium hover:underline">
        ← Volver a series
      </Link>

      <div className="mt-4 grid gap-6 md:grid-cols-[320px_1fr]">
        <Image
          src={posterPath}
          alt={series.name}
          width={320}
          height={480}
          className="h-auto w-full rounded-md"
        />

        <section>
          <h1 className="text-3xl font-bold">{series.name}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Primera emisión: {series.first_air_date || "Sin fecha"}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Temporadas: {series.number_of_seasons ?? "N/A"}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Calificación: {series.vote_average?.toFixed(1) ?? "N/A"}
          </p>
          <p className="mt-4 leading-7">{series.overview || "Sin descripción disponible."}</p>
        </section>
      </div>
    </main>
  );
}
