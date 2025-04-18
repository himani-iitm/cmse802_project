import type { ResumeData } from "@/types/resume"

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personal, experience, education, skills } = data

  return (
    <div className="font-sans bg-white print:shadow-none">
      {/* Header with accent color */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -ml-20 -mt-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full -mr-20 -mb-20"></div>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tight">{personal.name || "Your Name"}</h1>
          <p className="text-xl mt-2 text-white/80">{personal.title || "Professional Title"}</p>

          <div className="flex flex-wrap gap-6 mt-6 text-sm">
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
      </div>

      <div className="p-8">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="md:col-span-2">
            {/* Experience */}
            {experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                    </svg>
                  </span>
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                        <h3 className="font-bold text-gray-800 text-xl">{job.position}</h3>
                        <p className="text-purple-500 font-medium">
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
                <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                    </svg>
                  </span>
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                        <h3 className="font-bold text-gray-800 text-xl">
                          {edu.degree}
                          {edu.field && ` in ${edu.field}`}
                        </h3>
                        <p className="text-purple-500 font-medium">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                      <p className="text-gray-700 font-medium mt-1">
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
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Skills
                </h2>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {skill}
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
