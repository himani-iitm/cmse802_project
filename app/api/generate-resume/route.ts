import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { ResumeData } from "@/types/resume"

export async function POST(request: NextRequest) {
  try {
    const { resumeData, jobDescription } = await request.json()

    if (!resumeData) {
      return NextResponse.json({ error: "Resume data is required" }, { status: 400 })
    }

    const enhancedResume = await enhanceResume(resumeData, jobDescription)

    return NextResponse.json({ enhancedResume })
  } catch (error) {
    console.error("Error generating resume:", error)
    return NextResponse.json({ error: "Failed to generate resume" }, { status: 500 })
  }
}

async function enhanceResume(resumeData: ResumeData, jobDescription?: string) {
  const prompt = jobDescription
    ? `Enhance this resume to better match the following job description: ${jobDescription}
       
       Resume data: ${JSON.stringify(resumeData)}`
    : `Enhance this resume by improving the professional summary, making experience descriptions more impactful, and suggesting additional skills if needed:
       
       Resume data: ${JSON.stringify(resumeData)}`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    system: `You are an expert resume writer with years of experience helping job seekers land interviews. 
    Your task is to enhance the provided resume data. 
    Focus on making the professional summary compelling, improving experience descriptions with strong action verbs and quantifiable achievements, 
    and suggesting relevant skills. Return the enhanced resume as a valid JSON object with the same structure as the input.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing AI response:", error)
    return resumeData
  }
}
