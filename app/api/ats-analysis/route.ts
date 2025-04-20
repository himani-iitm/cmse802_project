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

    if (!jobDescription) {
      return NextResponse.json({ error: "Job description is required for ATS analysis" }, { status: 400 })
    }

    const analysis = await analyzeResumeForATS(resumeData, jobDescription)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing resume for ATS:", error)
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}

async function analyzeResumeForATS(resumeData: ResumeData, jobDescription: string) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Analyze this resume for ATS compatibility with the following job description:
    
    Resume data: ${JSON.stringify(resumeData)}
    
    Job Description: ${jobDescription}`,
    system: `You are an expert in Applicant Tracking Systems (ATS) and resume optimization.
    Analyze the provided resume against the job description and provide:
    1. An overall ATS compatibility score (0-100)
    2. Key missing keywords from the job description
    3. Suggestions for improving the resume to better match the job description
    4. Format issues that might prevent the resume from being properly parsed
    
    Format your response as a JSON object with the following structure:
    {
      "score": number,
      "missingKeywords": string[],
      "suggestions": string[],
      "formatIssues": string[]
    }`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing AI response for ATS analysis:", error)
    return {
      error: "Could not parse AI response",
      analysisText: text,
    }
  }
}
