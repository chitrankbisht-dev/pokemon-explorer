'use client'
import type { PaginationProps } from '@/types/pokemon';

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
  <div className="mt-6 flex justify-center items-center gap-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-yellow-400 border-2 border-blue-700 text-blue-900 font-extrabold rounded uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-300 transition"
    >
      Prev
    </button>
    <span className="text-yellow-500 font-extrabold text-lg drop-shadow-md">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-yellow-400 border-2 border-blue-700 text-blue-900 font-extrabold rounded uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-300 transition"
    >
      Next
    </button>
  </div>
)
}