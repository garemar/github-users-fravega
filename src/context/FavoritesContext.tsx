'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type FavoritesContextType = {
  favorites: Set<string>
  toggleFavorite: (username: string) => void
  isFavorite: (username: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (username: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(username)) {
        newFavorites.delete(username)
      } else {
        newFavorites.add(username)
      }
      return newFavorites
    })
  }

  const isFavorite = (username: string) => favorites.has(username)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }
  return context
}
