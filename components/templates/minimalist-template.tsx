import type { ResumeData } from "@/types/resume"

interface MinimalistTemplateProps {
  data: ResumeData
}

export function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  const { personal, experience, education, skills } = data

  return (
    <div className="font-sans bg-white print:shadow-none">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left sidebar */}
        <div className="bg-gray-100 p-8 md:col-span-4">
          <div className="sticky top-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">{personal.name || "Your Name"}</h1>
              <p className="text-gray-600 mt-1">{personal.title || "Professional Title"}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">Contact</h2>
                <div className="space-y-2 text-gray-600 text-sm">
                  {personal.email && <p>{personal.email}</p>}
                  {personal.phone && <p>{personal.phone}</p>}
                  {personal.address && <p>{personal.address}</p>}
                </div>
              </div>

              {skills.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-3">Skills</h2>
                  <div className="space-y-1">
                    {skills.map((skill, index) => (
                      <p key={index} className="text-gray-600">
                        {skill}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8 md:col-span-8">
          {/* Summary */}
          {personal.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Profile</h2>
              <p className="text-gray-700">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h3 className="font-bold text-gray-800">{job.position}</h3>
                      <p className="text-gray-500 text-sm">
                        {job.startDate} - {job.endDate}
                      </p>
                    </div>
                    <p className="text-gray-600 font-medium">
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h3 className="font-bold text-gray-800">
                        {edu.degree}
                        {edu.field && ` in ${edu.field}`}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    <p className="text-gray-600">
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
