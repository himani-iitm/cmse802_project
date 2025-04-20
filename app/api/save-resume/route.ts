import { type NextRequest, NextResponse } from "next/server"
import type { ResumeData } from "@/types/resume"

// In a real application, this would connect to a database
// For now, we'll use an in-memory store
const resumeStore: Record<string, { data: ResumeData; template: string; updatedAt: Date }> = {}

export async function POST(request: NextRequest) {
  try {
    const { resumeData, template, resumeId } = await request.json()

    if (!resumeData) {
      return NextResponse.json({ error: "Resume data is required" }, { status: 400 })
    }

    // Generate a new ID if one wasn't provided
    const id = resumeId || generateResumeId()

    // Save the resume data
    resumeStore[id] = {
      data: resumeData,
      template: template || "modern",
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      message: "Resume saved successfully",
      resumeId: id,
    })
  } catch (error) {
    console.error("Error saving resume:", error)
    return NextResponse.json({ error: "Failed to save resume" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const resumeId = url.searchParams.get("id")

    if (!resumeId) {
      return NextResponse.json({ error: "Resume ID is required" }, { status: 400 })
    }

    const resume = resumeStore[resumeId]

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error("Error retrieving resume:", error)
    return NextResponse.json({ error: "Failed to retrieve resume" }, { status: 500 })
  }
}

function generateResumeId(): string {
  // Generate a simple UUID-like string
  return "resume_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
