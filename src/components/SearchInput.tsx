'use client'

import { useRef, useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

type Props = {
  initial?: string
  onSearch: (term: string) => void
}

export default function SearchInput({ initial = '', onSearch }: Props) {
  const [value, setValue] = useState(initial)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value.trim())
    }, 500)

    return () => clearTimeout(timeout)
  }, [value, onSearch])


  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar usuario..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 pr-12 bg-zinc-800 border border-zinc-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder-gray-400"
      />
      {value && (
        <button
          onClick={() => {
            setValue('')
            inputRef.current?.focus()
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-red-500"
          aria-label="Limpiar búsqueda"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
