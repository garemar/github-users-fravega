'use client'

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchInput from '../SearchInput'
import '@testing-library/jest-dom'

jest.useFakeTimers()

describe('SearchInput', () => {
    it('renderiza con el valor inicial y ejecuta onSearch después del debounce', async () => {
        const onSearchMock = jest.fn()

        render(<SearchInput initial="octocat" onSearch={onSearchMock} />)

        const input = screen.getByPlaceholderText('Buscar usuario...') as HTMLInputElement
        expect(input.value).toBe('octocat')

        fireEvent.change(input, { target: { value: 'defunkt' } })
        expect(input.value).toBe('defunkt')

        jest.advanceTimersByTime(500)

        await waitFor(() => {
            expect(onSearchMock).toHaveBeenCalledWith('defunkt')
        })
    })

    it('limpia el input al hacer clic en la X', async () => {
        const onSearchMock = jest.fn()

        render(<SearchInput initial="pepe" onSearch={onSearchMock} />)

        const input = screen.getByPlaceholderText('Buscar usuario...')
        const clearButton = screen.getByRole('button', { name: 'Limpiar búsqueda' })

        fireEvent.click(clearButton)

        expect(input).toHaveValue('')
        jest.advanceTimersByTime(500)

        await waitFor(() => {
            expect(onSearchMock).toHaveBeenCalledWith('')
        })
    })
})
