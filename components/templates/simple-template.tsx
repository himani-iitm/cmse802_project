import type { ResumeData } from "@/types/resume"

interface SimpleTemplateProps {
  data: ResumeData
}

export function SimpleTemplate({ data }: SimpleTemplateProps) {
  const { personal, experience, education, skills } = data

  return (
    <div className="font-sans bg-white print:shadow-none p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{personal.name || "Your Name"}</h1>
        <p className="text-gray-600 mt-1">{personal.title || "Professional Title"}</p>

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          {personal.email && <p>{personal.email}</p>}
          {personal.phone && <p>{personal.phone}</p>}
          {personal.address && <p>{personal.address}</p>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">Summary</h2>
          <p className="text-gray-700">{personal.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">Skills</h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2 text-gray-400">•</span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">Experience</h2>
          <div className="space-y-4">
            {experience.map((job, index) => (
              <div key={index} className="pb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                  <h3 className="font-bold text-gray-800">{job.position}</h3>
                  <p className="text-gray-600">
                    {job.startDate} - {job.endDate}
                  </p>
                </div>
                <p className="text-gray-700">
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
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="pb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                  <h3 className="font-bold text-gray-800">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">
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
  )
}
