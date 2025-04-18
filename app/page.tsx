import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TemplatesSection } from "@/components/templates-section"
import { CompaniesSection } from "@/components/companies-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <CompaniesSection />
      </main>
      <Footer />
    </div>
  )
}
