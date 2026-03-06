import Link from "next/link";
import Image from "next/image";
import { TVShow } from "../types/media";

export default function SeriesCard({ tv }: { tv: TVShow }) {
  const posterPath = tv.poster_path
    ? `https://image.tmdb.org/t/p/w200${tv.poster_path}`
    : "/next.svg";

  return (
    <article className="rounded-lg border border-zinc-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
      <Image
        src={posterPath}
        alt={tv.name}
        width={200}
        height={300}
        className="h-auto w-full rounded-md"
      />
      <h3 className="mt-3 text-lg font-semibold">{tv.name}</h3>
      <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
        Temporadas: {tv.number_of_seasons || "N/A"}
      </p>
      <Link href={`/Pages/Series/${tv.id}`} className="text-sm font-medium hover:underline">
        Ver más
      </Link>
    </article>
  );
}