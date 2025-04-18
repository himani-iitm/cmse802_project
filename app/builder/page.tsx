"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ResumeBuilder } from "@/components/resume-builder"

export default function BuilderPage() {
  const searchParams = useSearchParams()
  const templateParam = searchParams.get("template")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  useEffect(() => {
    if (templateParam) {
      setSelectedTemplate(templateParam)
    }
  }, [templateParam])

  return <ResumeBuilder initialTemplate={selectedTemplate} />
}
