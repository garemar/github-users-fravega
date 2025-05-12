'use client'

import { StarIcon as StarOutline } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { useFavorites } from '@context/FavoritesContext'

type Props = {
    username: string
}

export default function FavoriteButton({ username }: Props) {
    const { isFavorite, toggleFavorite } = useFavorites()
    const favorite = isFavorite(username)

    return (
        <button
            onClick={() => toggleFavorite(username)}
            className="flex items-center gap-2 px-3 py-1 rounded-md  hover:bg-gray-100 transition"
        >
            {favorite ? (
                <StarSolid className="h-5 w-5 text-yellow-400" />
            ) : (
                <StarOutline className="h-5 w-5 text-gray-400" />
            )}
           
        </button>
    )
}
