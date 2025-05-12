/**
 * @jest-environment jsdom
 */
'use client'

import { render, screen, waitFor } from '@testing-library/react'
import HomePage from "@app/(main)/page"
import { FavoritesProvider } from '@context/FavoritesContext'
import '@testing-library/jest-dom'
import * as githubApi from '@lib/github'

const mockUsers = [
    {
        login: 'octocat',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/octocat',
    },
    {
        login: 'defunkt',
        avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
        html_url: 'https://github.com/defunkt',
    }
]

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useSearchParams: () => ({
        get: () => '',
    }),
}))

jest.mock('@lib/github')

describe('HomePage (integración)', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('muestra usuarios después de cargar', async () => {
        (githubApi.getUsers as jest.Mock).mockResolvedValue(mockUsers)

        render(
            <FavoritesProvider>
                <HomePage />
            </FavoritesProvider>
        )

        expect(screen.getByText(/buscando usuarios/i)).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText('octocat')).toBeInTheDocument()
            expect(screen.getByText('defunkt')).toBeInTheDocument()
        })

        expect(screen.queryByText(/buscando usuarios/i)).not.toBeInTheDocument()
    })
})
