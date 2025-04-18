import type { ResumeData } from "@/types/resume"

interface ProfessionalTemplateProps {
  data: ResumeData
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personal, experience, education, skills } = data

  return (
    <div className="font-sans bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
      {/* Header */}
      <div className="bg-blue-700 text-white p-8">
        <h1 className="text-3xl font-bold">{personal.name || "Your Name"}</h1>
        <p className="text-blue-100 mt-2">{personal.title || "Professional Title"}</p>

        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          {personal.email && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {personal.email}
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {personal.phone}
            </div>
          )}
          {personal.address && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {personal.address}
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-3">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="bg-blue-50 rounded-md px-3 py-1 text-blue-700">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="font-bold text-gray-800 text-lg">{job.position}</h3>
                    <p className="text-blue-600 font-medium">
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
            <h2 className="text-xl font-bold text-blue-700 mb-3">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="font-bold text-gray-800">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h3>
                    <p className="text-blue-600 font-medium">
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
  )
}
