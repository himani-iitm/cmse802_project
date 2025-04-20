"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Upload, Loader2, Download } from "lucide-react"
import { jsPDF } from "jspdf"

export default function ImprovePage() {
  const { toast } = useToast()
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [improvedResume, setImprovedResume] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const improvedResumeRef = useRef<HTMLTextAreaElement>(null)

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
      const res = await fetch("/api/improve-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to improve resume")
      }

      const data = await res.json()
      setImprovedResume(data.improvedResume)
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

    // Create a PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Set font and margins
    doc.setFont("helvetica")
    doc.setFontSize(11)

    // Split text into lines that fit the page width
    const textLines = doc.splitTextToSize(improvedResume, 180)

    // Add text to the PDF
    doc.text(textLines, 15, 20)

    // Save the PDF
    doc.save("Improved_Resume.pdf")

    toast({
      title: "Resume Downloaded",
      description: "Your improved resume has been downloaded as a PDF file.",
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
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
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
                  <Textarea ref={improvedResumeRef} readOnly className="min-h-[500px]" value={improvedResume} />
                  <div className="flex justify-end">
                    <Button variant="outline" onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" /> Download PDF
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
