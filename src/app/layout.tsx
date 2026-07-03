import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart/CartContext'

const nunito = Nunito({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Tennis Coffee Table — екодизайн з тенісних мʼячів',
  description: 'Дизайнерські кавові столики зі старих тенісних мʼячів та скла. Мінімалізм, екологічність, ручна робота.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={nunito.variable}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
