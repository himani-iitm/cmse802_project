"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Send, Loader2 } from "lucide-react"
import type { ResumeData } from "@/types/resume"
import { useToast } from "@/hooks/use-toast"

interface AiAssistantProps {
  resumeData: ResumeData
  updateResumeData: (section: string, data: any) => void
}

export function AiAssistant({ resumeData, updateResumeData }: AiAssistantProps) {
  const { toast } = useToast()
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setResponse("")

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeData,
          action: "custom-prompt",
          prompt: prompt,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to generate response")
      }

      const data = await res.json()
      setResponse(data.text || "I've analyzed your resume and prompt. " + data.message || "")
    } catch (error) {
      console.error("Error generating response:", error)
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateSummary = async () => {
    setIsLoading(true)
    setResponse("")

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeData,
          action: "generate-summary",
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to generate summary")
      }

      const data = await res.json()

      if (data.summary) {
        // Update the resume data with the generated summary
        updateResumeData("personal", {
          ...resumeData.personal,
          summary: data.summary,
        })

        toast({
          title: "Summary Generated",
          description: "Professional summary has been updated.",
        })
      } else {
        setResponse("Here's a suggested professional summary:\n\n" + data.text || data.message)
      }
    } catch (error) {
      console.error("Error generating summary:", error)
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const improveExperience = async () => {
    if (resumeData.experience.length === 0) {
      toast({
        title: "No Experience",
        description: "Please add work experience first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setResponse("")

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeData,
          action: "improve-experience",
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to improve experience")
      }

      const data = await res.json()

      if (data.experience) {
        // Option to update the experience directly
        updateResumeData("experience", data.experience)
        toast({
          title: "Experience Improved",
          description: "Your work experience descriptions have been enhanced.",
        })
      } else {
        setResponse(
          "Here are suggestions to improve your work experience descriptions:\n\n" +
            (data.suggestions || data.message || ""),
        )
      }
    } catch (error) {
      console.error("Error improving experience:", error)
      toast({
        title: "Error",
        description: "Failed to generate improvements. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const suggestSkills = async () => {
    setIsLoading(true)
    setResponse("")

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeData,
          action: "suggest-skills",
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to suggest skills")
      }

      const data = await res.json()

      if (data.suggestedSkills && Array.isArray(data.suggestedSkills)) {
        setResponse("Here are suggested skills to add to your resume:\n\n" + data.suggestedSkills.join("\n"))
      } else {
        setResponse(
          "Here are suggested skills to add to your resume:\n\n" + (data.suggestedSkillsText || data.message || ""),
        )
      }
    } catch (error) {
      console.error("Error suggesting skills:", error)
      toast({
        title: "Error",
        description: "Failed to generate skill suggestions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-500" />
          AI Resume Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={generateSummary} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Generate Summary
          </Button>
          <Button variant="outline" size="sm" onClick={improveExperience} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Improve Experience
          </Button>
          <Button variant="outline" size="sm" onClick={suggestSkills} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Suggest Skills
          </Button>
        </div>

        {response && <Textarea value={response} readOnly className="h-[200px] resize-none" />}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Ask for resume advice..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !prompt.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
