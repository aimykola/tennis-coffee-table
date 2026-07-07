import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart/CartContext'
import { FavoritesProvider } from '@/components/favorites/FavoritesContext'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', weight: ['500','600','700'] })
const body = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Tennis Coffee Table — дизайнерські кавові столики',
  description: 'Дизайнерські кавові столики зі скляною стільницею. Виразна фактура, ручна робота.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  )
}
