import Header from '@/components/Header'
import Catalog from '@/components/Catalog'
import CartDrawer from '@/components/cart/CartDrawer'
import { Hero, Reviews, Footer } from '@/components/Sections'
import Contacts from '@/components/ContactsSection'
import FloatingContact from '@/components/FloatingContact'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingContact />
    </>
  )
}
