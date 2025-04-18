"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TemplateSelectorProps {
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
}

export function TemplateSelector({ selectedTemplate, setSelectedTemplate }: TemplateSelectorProps) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary design with sidebar and timeline",
      preview: (
        <div className="w-full h-full">
          {/* Left sidebar */}
          <div className="flex h-full">
            <div className="w-1/3 bg-emerald-600 p-3 text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 mx-auto mb-2 flex items-center justify-center text-xs font-bold">
                JS
              </div>
              <div className="text-center text-xs font-bold mb-1">John Smith</div>
              <div className="text-center text-[8px] mb-4">Marketing Specialist</div>
              <div className="text-[8px] font-bold mb-1">CONTACT</div>
              <div className="space-y-1 mt-2">
                <div className="text-[7px]">john@example.com</div>
                <div className="text-[7px]">555-123-4567</div>
                <div className="text-[7px]">New York, NY</div>
              </div>
              <div className="text-[8px] font-bold mt-3 mb-1">SKILLS</div>
              <div className="flex flex-wrap gap-1">
                <div className="text-[6px] bg-emerald-700 px-1 rounded-full">Marketing</div>
                <div className="text-[6px] bg-emerald-700 px-1 rounded-full">SEO</div>
                <div className="text-[6px] bg-emerald-700 px-1 rounded-full">Analytics</div>
              </div>
            </div>
            {/* Main content */}
            <div className="w-2/3 p-3">
              <div className="text-[9px] font-bold text-emerald-600 border-b border-emerald-200 mb-2">EXPERIENCE</div>
              <div className="flex items-start mb-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mr-1 mt-1 flex-shrink-0"></div>
                <div>
                  <div className="text-[8px] font-bold">Marketing Manager</div>
                  <div className="text-[7px]">ABC Company, 2020-Present</div>
                  <div className="text-[6px] text-gray-600 mt-1">
                    Led marketing campaigns that increased conversion rates by 25% and managed a team of 5 marketing
                    specialists.
                  </div>
                </div>
              </div>
              <div className="text-[9px] font-bold text-emerald-600 border-b border-emerald-200 mb-2 mt-3">
                EDUCATION
              </div>
              <div className="flex items-start">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mr-1 mt-1 flex-shrink-0"></div>
                <div>
                  <div className="text-[8px] font-bold">MBA in Marketing</div>
                  <div className="text-[7px]">University of Business, 2018</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold design with colorful accents",
      preview: (
        <div className="w-full h-full">
          {/* Gradient header */}
          <div className="h-1/4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-3 text-white">
            <div className="text-xs font-bold">SARAH JOHNSON</div>
            <div className="text-[8px] opacity-80">Graphic Designer</div>
            <div className="flex gap-2 mt-1 text-[7px]">
              <div>sarah@design.com</div>
              <div>555-987-6543</div>
            </div>
          </div>
          {/* Content with cards */}
          <div className="p-3">
            <div className="text-[9px] font-bold text-purple-600 mb-2 flex items-center">
              <span className="bg-purple-100 text-purple-600 p-1 rounded-sm mr-1 text-[7px]">✦</span>
              ABOUT ME
            </div>
            <div className="bg-gray-50 p-2 rounded-lg mb-3 text-[7px]">
              Creative designer with 5+ years of experience creating visual identities and digital assets for brands.
            </div>
            <div className="text-[9px] font-bold text-purple-600 mb-2 flex items-center">
              <span className="bg-purple-100 text-purple-600 p-1 rounded-sm mr-1 text-[7px]">✦</span>
              SKILLS
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              <div className="text-[6px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1 py-0.5 rounded-sm">
                Photoshop
              </div>
              <div className="text-[6px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1 py-0.5 rounded-sm">
                Illustrator
              </div>
              <div className="text-[6px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1 py-0.5 rounded-sm">
                UI/UX
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "elegant",
      name: "Elegant",
      description: "Sophisticated design with serif font",
      preview: (
        <div className="w-full h-full">
          {/* Black header */}
          <div className="h-1/4 bg-gray-900 p-3 text-white text-center">
            <div className="text-xs font-bold tracking-wide uppercase">Michael Anderson</div>
            <div className="text-[8px] text-gray-300 italic">Executive Director</div>
            <div className="flex justify-center gap-3 mt-1 text-[7px]">
              <div>michael@exec.com</div>
              <div>555-234-5678</div>
            </div>
          </div>
          {/* Content with dividers */}
          <div className="p-3">
            <div className="relative h-4 mb-3 flex items-center">
              <div className="absolute w-full h-px bg-gray-300"></div>
              <div className="relative z-10 bg-white px-2 mx-auto text-[8px] font-bold text-gray-800 uppercase">
                Professional Summary
              </div>
            </div>
            <div className="text-[7px] text-center text-gray-700 mb-3">
              Seasoned executive with 15+ years of leadership experience in the technology sector, driving strategic
              initiatives and organizational growth.
            </div>

            <div className="relative h-4 mb-3 flex items-center">
              <div className="absolute w-full h-px bg-gray-300"></div>
              <div className="relative z-10 bg-white px-2 mx-auto text-[8px] font-bold text-gray-800 uppercase">
                Experience
              </div>
            </div>
            <div className="text-[8px] font-bold">Executive Director</div>
            <div className="text-[7px] text-gray-600 italic">TechCorp Inc., 2018-Present</div>
          </div>
        </div>
      ),
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Clean layout with subtle styling",
      preview: (
        <div className="w-full h-full">
          <div className="flex h-full">
            {/* Gray sidebar */}
            <div className="w-1/3 bg-gray-100 p-3">
              <div className="text-[9px] font-bold text-gray-800 mb-1">David Lee</div>
              <div className="text-[8px] text-gray-600 mb-3">Software Engineer</div>

              <div className="text-[8px] font-bold text-gray-800 mb-1">CONTACT</div>
              <div className="space-y-0.5 text-[7px] text-gray-600">
                <div>david@tech.dev</div>
                <div>555-345-6789</div>
                <div>San Francisco, CA</div>
              </div>

              <div className="text-[8px] font-bold text-gray-800 mt-3 mb-1">SKILLS</div>
              <div className="space-y-0.5 text-[7px] text-gray-600">
                <div>JavaScript</div>
                <div>React</div>
                <div>Node.js</div>
                <div>Python</div>
              </div>
            </div>
            {/* Main content */}
            <div className="w-2/3 p-3">
              <div className="text-[9px] font-bold text-gray-800 mb-2">Profile</div>
              <div className="text-[7px] text-gray-600 mb-3">
                Full-stack developer with expertise in modern JavaScript frameworks and a passion for creating
                efficient, scalable applications.
              </div>

              <div className="text-[9px] font-bold text-gray-800 mb-2">Experience</div>
              <div className="text-[8px] font-bold">Senior Developer</div>
              <div className="text-[7px] text-gray-600">TechStart Inc.</div>
              <div className="text-[7px] text-gray-500">2019 - Present</div>
              <div className="text-[6px] text-gray-600 mt-1">
                Led development of cloud-based applications and mentored junior developers.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "simple",
      name: "Simple",
      description: "Traditional format focusing on content",
      preview: (
        <div className="w-full h-full">
          {/* Header with border */}
          <div className="p-3 border-b-2 border-gray-300">
            <div className="text-xs font-bold text-gray-800">EMILY WILSON</div>
            <div className="text-[8px] text-gray-600 mb-1">Project Manager</div>
            <div className="flex gap-2 text-[7px] text-gray-600">
              <div>emily@projects.com</div>
              <div>555-456-7890</div>
            </div>
          </div>
          {/* Content with clear sections */}
          <div className="p-3">
            <div className="text-[8px] font-bold text-gray-800 uppercase mb-1">Summary</div>
            <div className="text-[7px] text-gray-600 mb-3">
              Detail-oriented project manager with PMP certification and 7+ years of experience leading cross-functional
              teams.
            </div>

            <div className="text-[8px] font-bold text-gray-800 uppercase mb-1">Skills</div>
            <div className="flex gap-2 mb-1 items-center">
              <div className="w-1 h-1 rounded-full bg-gray-500"></div>
              <div className="text-[7px] text-gray-600">Project Planning</div>
            </div>
            <div className="flex gap-2 mb-1 items-center">
              <div className="w-1 h-1 rounded-full bg-gray-500"></div>
              <div className="text-[7px] text-gray-600">Risk Management</div>
            </div>
            <div className="flex gap-2 mb-1 items-center">
              <div className="w-1 h-1 rounded-full bg-gray-500"></div>
              <div className="text-[7px] text-gray-600">Agile Methodologies</div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose a Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                selectedTemplate === template.id ? "ring-2 ring-emerald-500" : ""
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {/* Template Preview */}
              <div className="w-full h-48 rounded-lg shadow-sm overflow-hidden mb-3">{template.preview}</div>

              <h3 className="text-center text-lg font-medium">{template.name}</h3>
              <p className="text-center text-sm text-gray-500">{template.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
