"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface SkillsFormProps {
  data: string[]
  updateData: (data: string[]) => void
}

export function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(data)
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()]
      setSkills(updatedSkills)
      updateData(updatedSkills)
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  const suggestedSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Project Management",
    "Communication",
    "Leadership",
    "Problem Solving",
    "Teamwork",
  ]

  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      const updatedSkills = [...skills, skill]
      setSkills(updatedSkills)
      updateData(updatedSkills)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="new-skill">Add Skill</Label>
          <div className="flex gap-2">
            <Input
              id="new-skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a skill"
            />
            <Button onClick={addSkill} type="button">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </div>

        <div>
          <Label>Your Skills</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.length === 0 ? (
              <p className="text-sm text-gray-500">No skills added yet. Add some skills to showcase your abilities.</p>
            ) : (
              skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>
        </div>

        <div>
          <Label>Suggested Skills</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestedSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`cursor-pointer px-3 py-1 ${skills.includes(skill) ? "opacity-50" : ""}`}
                onClick={() => addSuggestedSkill(skill)}
              >
                {skill}
                {skills.includes(skill) && <span className="ml-2 text-green-500">✓</span>}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
