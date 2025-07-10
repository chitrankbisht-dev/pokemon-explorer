'use client'

import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import Pagination from './Pagination'

interface Pokemon {
  name: string
  url: string
}

function useWindowWidth() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}


export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

const width = useWindowWidth()

let perPage = 4
if (width >= 1920) perPage = 12
else if (width >= 1366) perPage = 6

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10001')
      .then((res) => res.json())
      .then((data) => setPokemons(data.results))
  }, [])

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const startIndex = (currentPage - 1) * perPage
const paginated = filtered.slice(startIndex, startIndex + perPage)

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-500 via-black to-white p-6">
      <h1 className="pokemon-logo text-4xl text-center mb-6">Pokémon Explorer</h1>

      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
  {paginated.map((pokemon, idx) => (
    <PokemonCard
      key={pokemon.name}
      name={pokemon.name}
      index={pokemons.indexOf(pokemon)}
    />
  ))}
</section>

      <Pagination
        currentPage={currentPage}
        totalItems={filtered.length}
        itemsPerPage={perPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  )
}
