import Link from "next/link";
import Image from "next/image";
import { Actor } from "../types/media";

export default function ActorCard({ actor }: { actor: Actor }) {
  const profilePath = actor.profile_path
    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
    : "/next.svg";

  return (
    <article className="rounded-lg border border-zinc-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
      <Image
        src={profilePath}
        alt={actor.name}
        width={200}
        height={300}
        className="h-auto w-full rounded-full"
      />
      <h3 className="mt-3 text-lg font-semibold">{actor.name}</h3>
      <Link href={`/Pages/Actor/${actor.id}`} className="text-sm font-medium hover:underline">
        Ver más
      </Link>
    </article>
  );
}