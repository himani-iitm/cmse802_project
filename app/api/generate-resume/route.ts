import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { ResumeData } from "@/types/resume"

export async function POST(request: NextRequest) {
  try {
    const { resumeData, jobDescription, action } = await request.json()

    if (!resumeData) {
      return NextResponse.json({ error: "Resume data is required" }, { status: 400 })
    }

    let result
    switch (action) {
      case "enhance":
        result = await enhanceResume(resumeData, jobDescription)
        break
      case "generate-summary":
        result = await generateSummary(resumeData)
        break
      case "improve-experience":
        result = await improveExperience(resumeData)
        break
      case "suggest-skills":
        result = await suggestSkills(resumeData)
        break
      default:
        result = await enhanceResume(resumeData, jobDescription)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing resume:", error)
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 })
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
    return { enhancedResume: resumeData, message: "Could not parse AI response, returning original data" }
  }
}

async function generateSummary(resumeData: ResumeData) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Generate a professional summary based on the following experience and skills:
    Experience: ${JSON.stringify(resumeData.experience)}
    Skills: ${JSON.stringify(resumeData.skills)}
    Education: ${JSON.stringify(resumeData.education)}`,
    system: `You are an expert resume writer. Generate a concise, professional summary (3-4 sentences) highlighting key strengths and experience.
    The summary should be compelling, achievement-oriented, and tailored to the person's experience level and industry.
    Focus on what makes this candidate unique and valuable to potential employers.`,
  })

  return { summary: text }
}

async function improveExperience(resumeData: ResumeData) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Improve the descriptions for the following work experiences to be more impactful and achievement-oriented:
    ${JSON.stringify(resumeData.experience)}`,
    system: `You are an expert resume writer. Enhance job descriptions to highlight achievements with metrics when possible.
    Use strong action verbs and focus on results. Make each bullet point start with a powerful action verb.
    Format your response as a JSON array of experience objects with the same structure as the input, but with improved descriptions.`,
  })

  try {
    const improvedExperience = JSON.parse(text)
    return { experience: improvedExperience }
  } catch (error) {
    console.error("Error parsing AI response for experience:", error)
    return {
      experience: resumeData.experience,
      message: "Could not parse AI response, returning original experience data",
      suggestions: text,
    }
  }
}

async function suggestSkills(resumeData: ResumeData) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Based on the following experience and current skills, suggest relevant skills that would strengthen this resume:
    Experience: ${JSON.stringify(resumeData.experience)}
    Education: ${JSON.stringify(resumeData.education)}
    Current Skills: ${JSON.stringify(resumeData.skills)}`,
    system: `You are an expert resume writer. Suggest relevant technical and soft skills based on the user's experience.
    Focus on in-demand skills for their industry. Return your response as a JSON array of strings representing the suggested skills.
    Do not repeat skills that are already in the current skills list.`,
  })

  try {
    const suggestedSkills = JSON.parse(text)
    return { suggestedSkills }
  } catch (error) {
    console.error("Error parsing AI response for skills:", error)
    return {
      message: "Could not parse AI response as JSON",
      suggestedSkillsText: text,
    }
  }
}
