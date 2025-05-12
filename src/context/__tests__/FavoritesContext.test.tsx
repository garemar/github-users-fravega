import { renderHook } from '@testing-library/react'
import { useFavorites } from '../FavoritesContext'

describe('useFavorites fuera del provider', () => {
    it('lanza un error si se usa sin FavoritesProvider', () => {
        const renderWithoutProvider = () => renderHook(() => useFavorites())
        expect(renderWithoutProvider).toThrow('useFavorites debe usarse dentro de FavoritesProvider')
    })
})
