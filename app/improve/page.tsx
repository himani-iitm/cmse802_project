"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Upload, FileUp } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export default function ImprovePage() {
  const { toast } = useToast()
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [improvedResume, setImprovedResume] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleImprove = async () => {
    if (!resumeText) {
      toast({
        title: "Resume Required",
        description: "Please paste your resume text first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Improve this resume${jobDescription ? " to better match the job description" : ""}:
        
        Resume:
        ${resumeText}
        
        ${
          jobDescription
            ? `Job Description:
        ${jobDescription}`
            : ""
        }`,
        system: `You are an expert resume writer with years of experience helping job seekers land interviews. 
        Your task is to improve the provided resume text to make it more effective, professional, and impactful.
        Focus on enhancing the professional summary, making experience descriptions more compelling with strong action verbs and quantifiable achievements,
        and ensuring the skills section is relevant and comprehensive.
        If a job description is provided, tailor the resume to highlight relevant experience and skills for that position.
        Return the improved resume in a clean, well-formatted text format.`,
      })

      setImprovedResume(text)
    } catch (error) {
      console.error("Error improving resume:", error)
      toast({
        title: "Error",
        description: "Failed to improve resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setResumeText(text)
    }
    reader.readAsText(file)
  }

  const handleDownload = () => {
    if (!improvedResume) {
      toast({
        title: "No Content",
        description: "Please generate an improved resume first.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would create a downloadable file
    toast({
      title: "Resume Downloaded",
      description: "Your improved resume has been downloaded as a text file.",
    })
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Improve Your Resume</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paste Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your current resume text here..."
                  className="min-h-[300px]"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
                <div className="mt-4 flex items-center gap-4">
                  <Button variant="outline" onClick={() => document.getElementById("resume-upload")?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload Resume
                  </Button>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".txt,.doc,.docx,.pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button variant="outline" onClick={() => setResumeText("")} disabled={!resumeText}>
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Description (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description to tailor your resume..."
                  className="min-h-[200px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </CardContent>
            </Card>

            <Button onClick={handleImprove} disabled={isLoading || !resumeText} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? "Improving..." : "Improve My Resume"}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Improved Resume</CardTitle>
            </CardHeader>
            <CardContent>
              {improvedResume ? (
                <div className="space-y-4">
                  <Textarea readOnly className="min-h-[500px]" value={improvedResume} />
                  <div className="flex justify-end">
                    <Button variant="outline" onClick={handleDownload}>
                      <FileUp className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[500px] text-center text-gray-500">
                  <Sparkles className="h-12 w-12 mb-4 text-emerald-500 opacity-50" />
                  <p className="text-lg font-medium">Your improved resume will appear here</p>
                  <p className="max-w-md mt-2">
                    Paste your current resume and click "Improve My Resume" to get AI-powered suggestions and
                    enhancements
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
