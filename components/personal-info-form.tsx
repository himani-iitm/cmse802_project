"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PersonalInfo } from "@/types/resume"

interface PersonalInfoFormProps {
  data: PersonalInfo
  updateData: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(data)

  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBlur = () => {
    updateData(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Software Engineer"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(123) 456-7890"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="123 Main St, City, State, ZIP"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Briefly describe your professional background and key strengths"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )
}
