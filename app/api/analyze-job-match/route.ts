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
      return NextResponse.json({ error: "Job description is required" }, { status: 400 })
    }

    const analysis = await analyzeJobMatch(resumeData, jobDescription)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing job match:", error)
    return NextResponse.json({ error: "Failed to analyze job match" }, { status: 500 })
  }
}

async function analyzeJobMatch(resumeData: ResumeData, jobDescription: string) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Analyze how well this resume matches the job description:
    
    Resume data: ${JSON.stringify(resumeData)}
    
    Job Description: ${jobDescription}`,
    system: `You are an expert career coach and resume consultant.
    Analyze the provided resume against the job description and provide:
    1. An overall match score (0-100)
    2. Key strengths that align with the job requirements
    3. Gaps or areas for improvement
    4. Specific recommendations to tailor the resume for this job
    
    Format your response as a JSON object with the following structure:
    {
      "matchScore": number,
      "strengths": string[],
      "gaps": string[],
      "recommendations": string[]
    }`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing AI response for job match analysis:", error)
    return {
      error: "Could not parse AI response",
      analysisText: text,
    }
  }
}
