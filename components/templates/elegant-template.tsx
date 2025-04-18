import type { ResumeData } from "@/types/resume"

interface ElegantTemplateProps {
  data: ResumeData
}

export function ElegantTemplate({ data }: ElegantTemplateProps) {
  const { personal, experience, education, skills } = data

  return (
    <div className="font-serif bg-white print:shadow-none">
      {/* Header */}
      <div className="bg-gray-900 text-white p-12 text-center">
        <h1 className="text-4xl font-bold tracking-wide uppercase">{personal.name || "Your Name"}</h1>
        <p className="text-xl mt-2 text-gray-300 italic">{personal.title || "Professional Title"}</p>

        <div className="flex flex-wrap justify-center gap-8 mt-6 text-sm">
          {personal.email && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              {personal.email}
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              {personal.phone}
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
              {personal.address}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-12">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center uppercase mb-6 relative">
              <span className="bg-white px-4 relative z-10">PROFESSIONAL SUMMARY</span>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 -z-0"></div>
            </h2>
            <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">{personal.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left column */}
          <div className="md:col-span-2">
            {/* Experience */}
            {experience.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 uppercase mb-6 relative">
                  <span className="bg-white px-4 relative z-10">EXPERIENCE</span>
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 -z-0"></div>
                </h2>
                <div className="space-y-8">
                  {experience.map((job, index) => (
                    <div key={index} className="border-b border-gray-200 pb-8">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                        <h3 className="font-bold text-gray-800 text-xl">{job.position}</h3>
                        <p className="text-gray-600 italic">
                          {job.startDate} - {job.endDate}
                        </p>
                      </div>
                      <p className="text-gray-700 font-medium mt-1">
                        {job.company}
                        {job.location && `, ${job.location}`}
                      </p>
                      {job.description && <p className="mt-3 text-gray-600">{job.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 uppercase mb-6 relative">
                  <span className="bg-white px-4 relative z-10">EDUCATION</span>
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 -z-0"></div>
                </h2>
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="border-b border-gray-200 pb-8">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                        <h3 className="font-bold text-gray-800 text-xl">
                          {edu.degree}
                          {edu.field && ` in ${edu.field}`}
                        </h3>
                        <p className="text-gray-600 italic">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                      <p className="text-gray-700 mt-1">
                        {edu.institution}
                        {edu.location && `, ${edu.location}`}
                      </p>
                      {edu.description && <p className="mt-3 text-gray-600">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="md:col-span-1">
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 uppercase mb-6 relative">
                  <span className="bg-white px-4 relative z-10">SKILLS</span>
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 -z-0"></div>
                </h2>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
