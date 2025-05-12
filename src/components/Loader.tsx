'use client'

import { ArrowPathIcon } from '@heroicons/react/24/solid'

export default function Loader({ message = 'Cargando...' }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-white opacity-0 animate-fade-in">
            <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-400" />
            <p className="mt-3 text-sm text-gray-300">{message}</p>
        </div>
    )
}
