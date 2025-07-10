'use client'

import Link from 'next/link'
import type { PokemonCardProps } from '@/types/pokemon';

export default function PokemonCard({ name, index }: PokemonCardProps) {
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`

  return (
    <Link href={`/pokemon/${name}`}>
  <div className="group bg-yellow-300 rounded-2xl shadow-lg p-4 text-center cursor-pointer transition-transform duration-300 hover:scale-105 border-2 border-blue-700">
    <img
      src={img}
      alt={name}
      className="h-32 w-32 mx-auto drop-shadow-md group-hover:scale-110 transition-transform duration-300"
    />
    <h2 className="capitalize font-extrabold text-xl text-blue-800 mt-3 tracking-wide group-hover:text-white transition-colors">
      {name}
    </h2>
  </div>
</Link>

  )
}
