import { render, screen } from '@testing-library/react'
import UserCard from '../UserCard'
import '@testing-library/jest-dom'
import { FavoritesProvider } from '@context/FavoritesContext'

jest.mock('next/navigation', () => ({
    useSearchParams: () => ({
        get: () => 'john',
    }),
}))

describe('UserCard con query', () => {
    const user = {
        login: 'octocat',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/octocat',
    }

    it('incluye el query string en el href', () => {
        render(
            <FavoritesProvider>
                <UserCard user={user} />
            </FavoritesProvider>
        )

        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', expect.stringContaining('?q=john'))
    })
})
