import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Take your resume from good to <span className="text-emerald-600">great</span> in just{" "}
              <span className="text-emerald-600">minutes</span>
            </h1>
            <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl">
              Create the perfect ATS-friendly resume with a smart AI builder and professional templates
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/builder">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                Create new resume
              </Button>
            </Link>
            <Link href="/improve">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Improve my resume
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
