import Image from "next/image";
import Link from "next/link";
import type { Pokemon } from "@/types/pokemon";

async function getPokemon(id: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon with id/name: ${id}`);
  return res.json();
}

export default async function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pokemon = await getPokemon(params.id);

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-500 via-black to-white text-blue-900 p-6">
      <h1 className=" pokemon-logo text-center text-4xl font-extrabold mb-4 font-pokemon tracking-wide drop-shadow-md">
        Pokémon Explorer
      </h1>
      <div className="flex justify-end max-w-4xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-block px-5 py-2 rounded-full bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-300 transition"
        >
          ← Back to List
        </Link>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-blue-700 p-8 max-w-4xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className=" flex flex-col items-center md:items-start text-center md:text-left md:basis-1/2 md:flex-shrink-0">
            <h2 className="text-3xl font-extrabold capitalize mb-4 text-blue-900">
              {pokemon.name}
            </h2>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={200}
              height={200}
              className="drop-shadow-xl"
            />
          </div>
          <div className="flex flex-col gap-6 w-full md:basis-1/2 md:flex-grow">
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Types</h3>
              <div className="flex gap-3 flex-wrap">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-200 text-blue-900 border border-yellow-300"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                Abilities
              </h3>
              <div className="flex flex-wrap gap-3">
                {pokemon.abilities.map((a) => (
                  <span
                    key={a.ability.name}
                    className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200 transition"
                  >
                    {a.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Stats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-blue-900">
            {pokemon.stats.map((s) => (
              <div key={s.stat.name}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="capitalize text-gray-700">
                    {s.stat.name}
                  </span>
                  <span className="text-gray-800">{s.base_stat}</span>
                </div>
                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full transition-all rounded-full"
                    style={{
                      width: `${Math.min(s.base_stat, 100)}%`,
                      backgroundColor: `hsl(${
                        Math.min(s.base_stat, 100) * 1.2
                      }, 85%, 45%)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Top Moves</h3>
          <div className="flex flex-wrap gap-3">
            {pokemon.moves.slice(0, 10).map((m, idx) => (
              <span
                key={m.move.name}
                className="px-3 py-1 text-sm font-semibold rounded-full text-white"
                style={{
                  backgroundColor: `hsl(${(idx * 36) % 360}, 80%, 50%)`,
                }}
              >
                {m.move.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
