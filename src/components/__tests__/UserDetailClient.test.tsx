import { render, screen, fireEvent } from '@testing-library/react'
import { FavoritesProvider } from '@context/FavoritesContext'
import FavoriteButton from '../FavoriteButton'
import '@testing-library/jest-dom'

describe('FavoriteButton en entorno SSR simulado', () => {
    it('mantiene el estado de favorito correctamente', () => {
        render(
            <FavoritesProvider>
                <div>
                    <h2>Usuario: octocat</h2>
                    <FavoriteButton username="octocat" />
                </div>
            </FavoritesProvider>
        )

        const button = screen.getByRole('button')
        expect(button.querySelector('svg')).toHaveClass('text-gray-400')

        fireEvent.click(button)
        expect(button.querySelector('svg')).toHaveClass('text-yellow-400')

        fireEvent.click(button)
        expect(button.querySelector('svg')).toHaveClass('text-gray-400')
    })
})
