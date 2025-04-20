import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    const improvedResume = await improveResumeText(resumeText, jobDescription)

    return NextResponse.json({ improvedResume })
  } catch (error) {
    console.error("Error improving resume:", error)
    return NextResponse.json({ error: "Failed to improve resume" }, { status: 500 })
  }
}

async function improveResumeText(resumeText: string, jobDescription?: string) {
  const prompt = jobDescription
    ? `Improve this resume to better match the job description:
       
       Resume:
       ${resumeText}
       
       Job Description:
       ${jobDescription}`
    : `Improve this resume to make it more effective, professional, and impactful:
       
       Resume:
       ${resumeText}`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    system: `You are an expert resume writer with years of experience helping job seekers land interviews. 
    Your task is to improve the provided resume text to make it more effective, professional, and impactful.
    Focus on:
    1. Enhancing the professional summary to be more compelling
    2. Making experience descriptions more impactful with strong action verbs and quantifiable achievements
    3. Ensuring the skills section is relevant and comprehensive
    4. Improving the overall formatting and organization
    5. Eliminating clichés and generic language
    
    If a job description is provided, tailor the resume to highlight relevant experience and skills for that position.
    Return the improved resume in a clean, well-formatted text format.`,
  })

  return text
}
