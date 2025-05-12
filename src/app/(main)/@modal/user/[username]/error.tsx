'use client'

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

export default function ErrorUserDetail({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="fixed inset-0 min-h-screen bg-black/60 z-50 flex items-center justify-center overflow-hidden">
            <div className="bg-zinc-900 text-white rounded-lg shadow-lg max-w-md w-full p-6 text-center animate-fade-in">
                <ExclamationTriangleIcon className="h-10 w-10 text-red-400 mx-auto" />
                <h2 className="mt-4 text-xl font-semibold">Error al cargar el usuario</h2>
                <p className="text-sm text-red-300 mt-1">{error.message}</p>
                <button
                    onClick={reset}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Reintentar
                </button>
            </div>
        </div>
    )
}
