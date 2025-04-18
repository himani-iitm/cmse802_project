import type { ResumeData } from "@/types/resume"

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personal, experience, education, skills } = data

  return (
    <div className="font-sans bg-white print:shadow-none">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left sidebar */}
        <div className="bg-emerald-600 text-white p-8 md:col-span-1">
          <div className="sticky top-0">
            <div className="mb-8 text-center">
              <div className="w-32 h-32 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                {personal.name ? personal.name.charAt(0) : "?"}
              </div>
              <h1 className="text-2xl font-bold">{personal.name || "Your Name"}</h1>
              <p className="text-emerald-100 mt-1">{personal.title || "Professional Title"}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold border-b border-emerald-400 pb-1 mb-3">Contact</h2>
                <div className="space-y-2">
                  {personal.email && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      <span className="text-sm">{personal.email}</span>
                    </div>
                  )}
                  {personal.phone && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                      <span className="text-sm">{personal.phone}</span>
                    </div>
                  )}
                  {personal.address && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-sm">{personal.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {skills.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold border-b border-emerald-400 pb-1 mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-emerald-700 text-emerald-50 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8 md:col-span-2">
          {/* Summary */}
          {personal.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-emerald-700 border-b-2 border-emerald-200 pb-2 mb-3">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-emerald-700 border-b-2 border-emerald-200 pb-2 mb-3">Experience</h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-emerald-200">
                    <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h3 className="font-bold text-gray-800 text-lg">{job.position}</h3>
                      <p className="text-emerald-600 font-medium text-sm">
                        {job.startDate} - {job.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700 font-medium">
                      {job.company}
                      {job.location && `, ${job.location}`}
                    </p>
                    {job.description && <p className="mt-2 text-gray-600">{job.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-emerald-700 border-b-2 border-emerald-200 pb-2 mb-3">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-emerald-200">
                    <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h3 className="font-bold text-gray-800">
                        {edu.degree}
                        {edu.field && ` in ${edu.field}`}
                      </h3>
                      <p className="text-emerald-600 font-medium text-sm">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700">
                      {edu.institution}
                      {edu.location && `, ${edu.location}`}
                    </p>
                    {edu.description && <p className="mt-2 text-gray-600">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
