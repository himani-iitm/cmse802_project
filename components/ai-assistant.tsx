"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Send } from "lucide-react"
import type { ResumeData } from "@/types/resume"
import { useToast } from "@/hooks/use-toast"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

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
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
        system: `You are an AI resume assistant. Help the user improve their resume content. 
        Current resume data: ${JSON.stringify(resumeData)}. 
        Provide specific, actionable suggestions to improve their resume.`,
      })

      setResponse(text)
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
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Generate a professional summary based on the following experience and skills:
        Experience: ${JSON.stringify(resumeData.experience)}
        Skills: ${JSON.stringify(resumeData.skills)}`,
        system:
          "You are an AI resume assistant. Generate a concise, professional summary (3-4 sentences) highlighting key strengths and experience.",
      })

      // Update the resume data with the generated summary
      updateResumeData("personal", {
        ...resumeData.personal,
        summary: text,
      })

      toast({
        title: "Summary Generated",
        description: "Professional summary has been updated.",
      })
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
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Improve the descriptions for the following work experiences to be more impactful and achievement-oriented:
        ${JSON.stringify(resumeData.experience)}`,
        system:
          "You are an AI resume assistant. Enhance job descriptions to highlight achievements with metrics when possible. Use strong action verbs and focus on results.",
      })

      setResponse("Here are suggestions to improve your work experience descriptions:\n\n" + text)
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
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Based on the following experience and current skills, suggest relevant skills that would strengthen this resume:
        Experience: ${JSON.stringify(resumeData.experience)}
        Current Skills: ${JSON.stringify(resumeData.skills)}`,
        system:
          "You are an AI resume assistant. Suggest relevant technical and soft skills based on the user's experience. Focus on in-demand skills for their industry.",
      })

      setResponse("Here are suggested skills to add to your resume:\n\n" + text)
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
            Generate Summary
          </Button>
          <Button variant="outline" size="sm" onClick={improveExperience} disabled={isLoading}>
            Improve Experience
          </Button>
          <Button variant="outline" size="sm" onClick={suggestSkills} disabled={isLoading}>
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
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
