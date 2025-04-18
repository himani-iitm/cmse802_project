"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { ExperienceForm } from "@/components/experience-form"
import { EducationForm } from "@/components/education-form"
import { SkillsForm } from "@/components/skills-form"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { AiAssistant } from "@/components/ai-assistant"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from "@/types/resume"

interface ResumeBuilderProps {
  initialTemplate?: string | null
}

export function ResumeBuilder({ initialTemplate = null }: ResumeBuilderProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate || "modern")
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      name: "",
      email: "",
      phone: "",
      address: "",
      title: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  })
  const [showAiAssistant, setShowAiAssistant] = useState(false)

  const updateResumeData = (section: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  // Update the handleNext function to handle the final step
  const handleNext = () => {
    const tabs = ["personal", "experience", "education", "skills", "template"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
      window.scrollTo(0, 0)
    } else if (currentIndex === tabs.length - 1) {
      // If we're on the last tab (template), trigger the download
      handleDownload()
    }
  }

  const handlePrevious = () => {
    const tabs = ["personal", "experience", "education", "skills", "template"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
      window.scrollTo(0, 0)
    }
  }

  const handleSave = () => {
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
    })
  }

  // Update the handleDownload function to actually create a downloadable PDF
  const handleDownload = () => {
    toast({
      title: "Preparing your resume",
      description: "Your resume is being generated...",
    })

    // In a real app, this would use a PDF generation library
    // For now, we'll simulate the download with a timeout
    setTimeout(() => {
      // Create a simple text version as a fallback
      const resumeText = `
${resumeData.personal.name}
${resumeData.personal.title}
${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.address}

SUMMARY
${resumeData.personal.summary}

EXPERIENCE
${resumeData.experience.map((exp) => `${exp.position} at ${exp.company}, ${exp.startDate} - ${exp.endDate}\n${exp.description}`).join("\n\n")}

EDUCATION
${resumeData.education.map((edu) => `${edu.degree} in ${edu.field}, ${edu.institution}, ${edu.startDate} - ${edu.endDate}`).join("\n")}

SKILLS
${resumeData.skills.join(", ")}
    `.trim()

      // Create a blob and download link
      const blob = new Blob([resumeText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${resumeData.personal.name.replace(/\s+/g, "_")}_Resume.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Resume downloaded",
        description: "Your resume has been downloaded as a text file.",
      })
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Build Your Resume</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setShowAiAssistant(!showAiAssistant)}>
              {showAiAssistant ? "Hide AI Assistant" : "Show AI Assistant"}
            </Button>
            <Button variant="outline" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleDownload}>Download PDF</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8 grid w-full grid-cols-5">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="template">Template</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <PersonalInfoForm
                  data={resumeData.personal}
                  updateData={(data) => updateResumeData("personal", data)}
                />
              </TabsContent>
              <TabsContent value="experience">
                <ExperienceForm
                  data={resumeData.experience}
                  updateData={(data) => updateResumeData("experience", data)}
                />
              </TabsContent>
              <TabsContent value="education">
                <EducationForm data={resumeData.education} updateData={(data) => updateResumeData("education", data)} />
              </TabsContent>
              <TabsContent value="skills">
                <SkillsForm data={resumeData.skills} updateData={(data) => updateResumeData("skills", data)} />
              </TabsContent>
              <TabsContent value="template">
                <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "personal"}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={activeTab === "template"}>
                Next
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <ResumePreview data={resumeData} template={selectedTemplate} />
            {showAiAssistant && <AiAssistant resumeData={resumeData} updateResumeData={updateResumeData} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
