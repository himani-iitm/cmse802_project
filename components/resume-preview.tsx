"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ProfessionalTemplate } from "@/components/templates/professional-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { ElegantTemplate } from "@/components/templates/elegant-template"
import { SimpleTemplate } from "@/components/templates/simple-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { MinimalistTemplate } from "@/components/templates/minimalist-template"
import type { ResumeData } from "@/types/resume"

interface ResumePreviewProps {
  data: ResumeData
  template: string
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "professional":
        return <ProfessionalTemplate data={data} />
      case "creative":
        return <CreativeTemplate data={data} />
      case "elegant":
        return <ElegantTemplate data={data} />
      case "modern":
        return <ModernTemplate data={data} />
      case "simple":
        return <SimpleTemplate data={data} />
      case "minimalist":
        return <MinimalistTemplate data={data} />
      default:
        return <ModernTemplate data={data} />
    }
  }

  return (
    <Card className="sticky top-24">
      <CardContent className="p-4">
        <div className="rounded border bg-white p-0 shadow-sm">
          <div className="max-h-[600px] overflow-auto resume-preview-content">{renderTemplate()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
