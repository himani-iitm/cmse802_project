import type { ResumeData } from "@/types/resume"

interface ExecutiveTemplateProps {
  data: ResumeData
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  const { personal, experience, education, skills } = data

  return (
    <div className="font-serif text-gray-900 bg-white p-6 border border-gray-300">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wider">{personal.name || "Your Name"}</h1>
        <p className="text-lg text-gray-600 mt-1">{personal.title || "Executive Title"}</p>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-1 mt-3 text-sm">
          {personal.email && <p>{personal.email}</p>}
          {personal.phone && <p>{personal.phone}</p>}
          {personal.address && <p>{personal.address}</p>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mt-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-center mb-3">Executive Summary</h2>
          <p className="text-center">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-lg">{job.position}</h3>
                  <p className="text-gray-600">
                    {job.startDate} - {job.endDate}
                  </p>
                </div>
                <p className="font-semibold">
                  {job.company}
                  {job.location && `, ${job.location}`}
                </p>
                {job.description && <p className="mt-2">{job.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-gray-300 pb-1">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <p>
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                </p>
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-gray-300 pb-1">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <p key={index} className="flex items-center">
                <span className="mr-2 text-gray-500">•</span>
                {skill}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
