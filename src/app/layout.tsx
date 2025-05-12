import '@styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { FavoritesProvider } from '@context/FavoritesContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Frávega GitHub Users',
  description: 'Challenge técnico para Frávega usando Next.js App Router',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen`}>
        <FavoritesProvider>
          <main className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">
              GitHub Users Browser
            </h1>
            {children}
          </main>
        </FavoritesProvider>
      </body>
    </html>
  )
}

