"use client"

import { useState, useRef } from "react"
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
import { Loader2 } from "lucide-react"
import type { ResumeData } from "@/types/resume"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

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
  const [showAiAssistant, setShowAiAssistant] = useState(true) // Set to true by default
  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const resumePreviewRef = useRef<HTMLDivElement>(null)

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

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch("/api/save-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeData,
          template: selectedTemplate,
          resumeId,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to save resume")
      }

      const data = await res.json()

      if (data.resumeId) {
        setResumeId(data.resumeId)
      }

      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving resume:", error)
      toast({
        title: "Error",
        description: "Failed to save resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = async () => {
    if (!resumePreviewRef.current) {
      toast({
        title: "Error",
        description: "Resume preview not available. Please try again.",
        variant: "destructive",
      })
      return
    }

    setIsDownloading(true)
    toast({
      title: "Preparing your resume",
      description: "Your resume is being generated as a PDF...",
    })

    try {
      // Get the resume preview element
      const element = resumePreviewRef.current.querySelector(".resume-preview-content")

      if (!element) {
        throw new Error("Resume preview content not found")
      }

      // Use html2canvas to capture the resume as an image
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
      })

      // Create a new PDF with appropriate dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      })

      // Add the image to the PDF
      const imgData = canvas.toDataURL("image/png")
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)

      // Save the PDF
      const fileName = resumeData.personal.name
        ? `${resumeData.personal.name.replace(/\s+/g, "_")}_Resume.pdf`
        : "Resume.pdf"

      pdf.save(fileName)

      toast({
        title: "Resume downloaded",
        description: "Your resume has been downloaded as a PDF file.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
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
            <Button variant="outline" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Save
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Download PDF
            </Button>
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
              <Button onClick={handleNext}>{activeTab === "template" ? "Download Resume" : "Next"}</Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div ref={resumePreviewRef}>
              <ResumePreview data={resumeData} template={selectedTemplate} />
            </div>
            {showAiAssistant && <AiAssistant resumeData={resumeData} updateResumeData={updateResumeData} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
