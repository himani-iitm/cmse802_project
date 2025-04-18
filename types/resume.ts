export interface PersonalInfo {
  name: string
  email: string
  phone: string
  address: string
  title: string
  summary: string
}

export interface Experience {
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current?: boolean
  description: string
}

export interface Education {
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface ResumeData {
  personal: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: string[]
}
