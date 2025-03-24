import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resumeData = {
      name,
      email,
      phone,
      experience,
      education,
      skills,
    };

    try {
      const response = await fetch('http://localhost:3000/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      const data = await response.json();
      setGeneratedResume(`
        <p><strong>Name:</strong> ${data.resume.name}</p>
        <p><strong>Email:</strong> ${data.resume.email}</p>
        <p><strong>Phone:</strong> ${data.resume.phone}</p>
        <p><strong>Experience:</strong> ${data.resume.experience}</p>
        <p><strong>Education:</strong> ${data.resume.education || 'N/A'}</p>
        <p><strong>Skills:</strong> ${data.resume.skills || 'N/A'}</p>
      `);

    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Experience:
          <textarea value={experience} onChange={(e) => setExperience(e.target.value)} required />
        </label>
        <label>
          Education:
          <textarea value={education} onChange={(e) => setEducation(e.target.value)} />
        </label>
        <label>
          Skills:
          <textarea value={skills} onChange={(e) => setSkills(e.target.value)} />
        </label>
        <button type="submit">Generate Resume</button>
      </form>

      <div id="resume-preview">
        <h2>Resume Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: generatedResume }} />
      </div>
    </div>
  );
}

export default App;  // <-- This line is critical!
