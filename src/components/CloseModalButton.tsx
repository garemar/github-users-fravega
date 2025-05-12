'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function CloseModalButton() {
    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                router.back()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [router])

    return (
        <button
            onClick={() => router.back()}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
            <XMarkIcon className="h-6 w-6" />
        </button>
    )
}
