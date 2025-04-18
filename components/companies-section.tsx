export function CompaniesSection() {
  const companies = ["Google", "Apple", "Microsoft", "Amazon", "Tesla", "Netflix"]

  return (
    <section className="py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h3 className="text-xl font-medium text-gray-500">Create resume to get hired by</h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companies.map((company, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400 transition-colors hover:text-gray-700">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
