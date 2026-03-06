"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type ActorDetail = {
  id: number;
  name: string;
  biography: string;
  birthday?: string;
  known_for_department?: string;
  place_of_birth?: string;
  profile_path: string | null;
};

export default function ActorDetailPage() {
  const params = useParams<{ id: string }>();
  const actorId = params?.id;

  const [actor, setActor] = useState<ActorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActor = async () => {
      if (!actorId) {
        setError("ID de actor inválido");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/apiv1/actors/${actorId}`);
        if (!res.ok) {
          throw new Error("No se pudo obtener el detalle del actor");
        }
        const data: ActorDetail = await res.json();
        setActor(data);
      } catch {
        setError("Error al cargar detalle del actor");
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [actorId]);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!actor) return <p className="p-6">No se encontró el actor.</p>;

  const profilePath = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : "/next.svg";

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/?tab=actors" className="text-sm font-medium hover:underline">
        ← Volver a actores
      </Link>

      <div className="mt-4 grid gap-6 md:grid-cols-[320px_1fr]">
        <Image
          src={profilePath}
          alt={actor.name}
          width={320}
          height={480}
          className="h-auto w-full rounded-md"
        />

        <section>
          <h1 className="text-3xl font-bold">{actor.name}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Departamento: {actor.known_for_department || "N/A"}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Nacimiento: {actor.birthday || "N/A"}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Lugar: {actor.place_of_birth || "N/A"}
          </p>
          <p className="mt-4 leading-7">{actor.biography || "Sin biografía disponible."}</p>
        </section>
      </div>
    </main>
  );
}
