import Header from '@/components/Header'
import Catalog from '@/components/Catalog'
import CartDrawer from '@/components/cart/CartDrawer'
import FavoritesDrawer from '@/components/favorites/FavoritesDrawer'
import { Hero, FeatureStrip, Footer } from '@/components/Sections'
import Contacts from '@/components/ContactsSection'
import FloatingContact from '@/components/FloatingContact'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureStrip />
        <Catalog />
        <Contacts />
      </main>
      <Footer />
      <CartDrawer />
      <FavoritesDrawer />
      <FloatingContact />
    </>
  )
}
