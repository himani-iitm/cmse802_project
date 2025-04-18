"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash, Plus } from "lucide-react"
import type { Experience } from "@/types/resume"

interface ExperienceFormProps {
  data: Experience[]
  updateData: (data: Experience[]) => void
}

export function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(data)

  const handleChange = (index: number, field: string, value: string) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    }
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const addExperience = () => {
    const newExperience: Experience = {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setExperiences([...experiences, newExperience])
    updateData([...experiences, newExperience])
  }

  const removeExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <Button onClick={addExperience} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No work experience added. Click "Add Experience" to begin.
          </div>
        ) : (
          experiences.map((experience, index) => (
            <div key={index} className="rounded-lg border p-4 space-y-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeExperience(index)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    value={experience.company}
                    onChange={(e) => handleChange(index, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    value={experience.position}
                    onChange={(e) => handleChange(index, "position", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    value={experience.location}
                    onChange={(e) => handleChange(index, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    value={experience.startDate}
                    onChange={(e) => handleChange(index, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    value={experience.endDate}
                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={experience.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                  rows={4}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
