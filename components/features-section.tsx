import { Sparkles, FileText, Clock, Search } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-emerald-600" />,
      title: "AI-Powered Resume Writing",
      description:
        "Our AI assistant analyzes your experience and skills to create tailored content that highlights your strengths and matches job requirements.",
    },
    {
      icon: <FileText className="h-10 w-10 text-emerald-600" />,
      title: "Professional Templates",
      description:
        "Choose from a wide variety of professionally designed templates that are customizable to match your personal style and industry standards.",
    },
    {
      icon: <Clock className="h-10 w-10 text-emerald-600" />,
      title: "Quick Resume Creation",
      description:
        "Build a professional resume in minutes, not hours. Our intuitive interface guides you through each step of the process.",
    },
    {
      icon: <Search className="h-10 w-10 text-emerald-600" />,
      title: "ATS-Friendly Formats",
      description:
        "Ensure your resume passes through Applicant Tracking Systems with our optimized formats and keyword suggestions.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              AI model trained on resume writing
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI assistant offers a seamless way to create resumes with professional suggestions tailored to your
              needs. Its intuitive interface lets you focus on crafting the perfect resume without distractions, helping
              you move closer to landing your next opportunity.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-2">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
