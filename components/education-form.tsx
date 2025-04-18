"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash, Plus } from "lucide-react"
import type { Education } from "@/types/resume"

interface EducationFormProps {
  data: Education[]
  updateData: (data: Education[]) => void
}

export function EducationForm({ data, updateData }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(data)

  const handleChange = (index: number, field: string, value: string) => {
    const updatedEducations = [...educations]
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value,
    }
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const addEducation = () => {
    const newEducation: Education = {
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setEducations([...educations, newEducation])
    updateData([...educations, newEducation])
  }

  const removeEducation = (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>
        <Button onClick={addEducation} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {educations.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No education added. Click "Add Education" to begin.</div>
        ) : (
          educations.map((education, index) => (
            <div key={index} className="rounded-lg border p-4 space-y-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeEducation(index)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input
                    id={`institution-${index}`}
                    value={education.institution}
                    onChange={(e) => handleChange(index, "institution", e.target.value)}
                    placeholder="University or School Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input
                    id={`degree-${index}`}
                    value={education.degree}
                    onChange={(e) => handleChange(index, "degree", e.target.value)}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`field-${index}`}>Field of Study</Label>
                  <Input
                    id={`field-${index}`}
                    value={education.field}
                    onChange={(e) => handleChange(index, "field", e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    value={education.location}
                    onChange={(e) => handleChange(index, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    value={education.startDate}
                    onChange={(e) => handleChange(index, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    value={education.endDate}
                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={education.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  placeholder="Relevant coursework, achievements, etc."
                  rows={3}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
