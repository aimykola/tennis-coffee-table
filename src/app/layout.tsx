import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart/CartContext'
import { FavoritesProvider } from '@/components/favorites/FavoritesContext'

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'Ballcraft — вироби ручної роботи зі старих тенісних мʼячів',
  description: 'Ballcraft — дизайнерські кавові столики зі старих тенісних мʼячів та скла. Мінімалізм, екологічність, ручна робота.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${montserrat.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  )
}
