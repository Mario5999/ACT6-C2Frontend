import { useEffect, useState } from "react";
import ActorCard from "../../components/ActorCard";
import { Actor, ApiResponse } from "../../types/media";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function Actors() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const res = await fetch(`${API_URL}/apiv1/actors`);
        if (!res.ok) {
          throw new Error("No se pudo obtener actores");
        }
        const data: ApiResponse<Actor> = await res.json();
        setActors(data.results);
      } catch {
        setError("Error al cargar actores");
      } finally {
        setLoading(false);
      }
    };
    fetchActors();
  }, []);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Actores Destacados</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
        {actors.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  );
}