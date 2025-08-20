import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
