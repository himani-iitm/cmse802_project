export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The AI suggestions were spot on! I was able to highlight my skills in ways I hadn't thought of before. Got 3 interview calls within a week of updating my resume.",
      author: "Sarah J.",
      role: "Marketing Manager",
    },
    {
      quote:
        "As someone switching careers, I was struggling to present my transferable skills effectively. This tool made it so much easier and gave me the confidence in my resume.",
      author: "Michael T.",
      role: "Career Changer",
    },
    {
      quote:
        "The templates are not only beautiful but also ATS-friendly. The AI helped me tailor my resume for each job application without spending hours on each one.",
      author: "Elena R.",
      role: "Software Engineer",
    },
  ]

  return (
    <section className="py-20 bg-emerald-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What our users say</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of job seekers who have successfully landed their dream jobs
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between space-y-4 rounded-lg border bg-white p-6 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-current text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-500">"{testimonial.quote}"</p>
              </div>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
