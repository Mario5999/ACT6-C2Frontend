"use client";

import { useEffect, useMemo, useState } from "react";
import Movies from "./Pages/Movie/Movies";
import Series from "./Pages/Series/Series";
import Actors from "./Pages/Actor/Actors";

type Section = "movies" | "series" | "actors";

const isSection = (value: string | null): value is Section => {
  return value === "movies" || value === "series" || value === "actors";
};

export default function Home() {
  const [section, setSection] = useState<Section>("movies");

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (isSection(tab)) {
        setSection(tab);
      }
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const changeSection = (nextSection: Section) => {
    setSection(nextSection);

    const url = new URL(window.location.href);
    url.searchParams.set("tab", nextSection);
    window.history.pushState({}, "", url);
  };

  const title = useMemo(() => {
    if (section === "series") return "Series";
    if (section === "actors") return "Actores";
    return "Películas";
  }, [section]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl p-8">
        <h1 className="mb-3 text-3xl font-bold">Cinematoon</h1>
        <p className="mb-6 text-zinc-600 dark:text-zinc-300">
          Explora películas, series y actores desde esta página central de Next.js.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => changeSection("movies")}
            className="rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Películas
          </button>
          <button
            type="button"
            onClick={() => changeSection("series")}
            className="rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Series
          </button>
          <button
            type="button"
            onClick={() => changeSection("actors")}
            className="rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Actores
          </button>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">{title}</h2>
        <section className="mt-2">
          {section === "movies" && <Movies />}
          {section === "series" && <Series />}
          {section === "actors" && <Actors />}
        </section>
      </main>
    </div>
  );
}
