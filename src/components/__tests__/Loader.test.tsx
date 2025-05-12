import { render, screen } from '@testing-library/react'
import Loader from '../Loader'
import '@testing-library/jest-dom'

describe('Loader', () => {
    it('muestra el mensaje por defecto', () => {
        render(<Loader />)
        expect(screen.getByText('Cargando...')).toBeInTheDocument()
    })

    it('muestra un mensaje personalizado', () => {
        render(<Loader message="Buscando usuarios..." />)
        expect(screen.getByText('Buscando usuarios...')).toBeInTheDocument()
    })
})
