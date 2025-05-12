import { render, screen, fireEvent } from '@testing-library/react'
import FavoriteButton from '../FavoriteButton'
import { FavoritesProvider } from '@context/FavoritesContext'
import '@testing-library/jest-dom'

describe('FavoriteButton', () => {
    it('muestra estrella vacía si no es favorito', () => {
        render(
            <FavoritesProvider>
                <FavoriteButton username="octocat" />
            </FavoritesProvider>
        )

        const button = screen.getByRole('button')
        expect(button.querySelector('svg')).toBeInTheDocument()
        expect(button.querySelector('svg')?.classList.toString()).toContain('text-gray-400')
    })

    it('agrega y remueve de favoritos al hacer clic', () => {
        render(
            <FavoritesProvider>
                <FavoriteButton username="octocat" />
            </FavoritesProvider>
        )

        const button = screen.getByRole('button')

        fireEvent.click(button)
        expect(button.querySelector('svg')?.classList.toString()).toContain('text-yellow-400')

        fireEvent.click(button)
        expect(button.querySelector('svg')?.classList.toString()).toContain('text-gray-400')
    })
})
