import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [activeView, setActiveView] = useState('resume');

  const education = [
    "B.Tech. Computer Science, VIT VELLORE - Class of 2026",
    "SINDHI High School - High School Diploma"
  ];

  const skills = [
    "C", "C++", "Python", "React", "HTML", "CSS", "JavaScript", 
    "Generative AI", "Artificial Intelligence", "Java", "SQL", 
    "MySQL", "Data Structures and Algorithms", 
    "Object-Oriented Programming", "Tailwind CSS (Basic)"
  ];

  const experience = [
    "Intern at HITACHI"
  ];

  const projects = [
    {
      title: "Job Website using React",
      description: "Developed a fully functional job search website using React.js, allowing users to search and view various job listings.",
      technologies: ["React.js", "JavaScript", "CSS", "HTML"],
      features: ["Job search functionality", "Responsive design", "User-friendly interface"]
    },
    {
      title: "React Chat App",
      description: "Built a real-time chat application using React and Socket.IO, featuring private messaging, group chats and a bot the user can chat with.",
      technologies: ["React", "Socket.IO", "Node.js", "JavaScript"],
      features: ["Real-time messaging", "Private messaging", "Group chats", "AI bot integration"]
    },
    {
      title: "Resume Website",
      description: "Created a personal resume website using React, showcasing my skills, projects, and experience.",
      technologies: ["React", "CSS", "HTML", "JavaScript"],
      features: ["Responsive design", "Interactive navigation", "Modern UI"]
    }
  ];

  const certifications = [
    "Artificial Intelligence Fundamentals (2023)",
    "Generative AI for Executives and Business Leaders (2022)",
    "Winner: Hack the Hackathon - Ideathon (2022)"
  ];

  const languages = [
    "English", 
    "Hindi", 
    "Kannada (Basic)"
  ];

  const hobbies = ["Cycling", "Chess", "Gaming", "Drawing"];

  // LinkedIn icon as SVG component
  const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{width: '20px', height: '20px'}}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const ResumeView = () => (
    <div className="fade-in">
      <section className="resume card-hover">
        <h2 className="section-title">Skills</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px'}}>
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag" style={{
              backgroundColor: '#e3f2fd',
              color: '#1565c0',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              textAlign: 'center',
              display: 'inline-block'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="resume card-hover">
        <h2 className="section-title">Experience</h2>
        <ul className="list">
          {experience.map((ex, index) => (
            <li key={index} className="list-item">
              <span style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#007BFF',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '12px'
              }}></span>
              {ex}
            </li>
          ))}
        </ul>
      </section>

      <section className="resume card-hover">
        <h2 className="section-title">Education</h2>
        <ul className="list">
          {education.map((ed, index) => (
            <li key={index} className="list-item">
              <span style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#007BFF',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '12px'
              }}></span>
              {ed}
            </li>
          ))}
        </ul>
      </section>

      <section className="resume card-hover">
        <h2 className="section-title">Certifications and Extracurriculars</h2>
        <ul className="list">
          {certifications.map((cert, index) => (
            <li key={index} className="list-item">
              <span style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#28a745',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '12px'
              }}></span>
              {cert}
            </li>
          ))}
        </ul>
      </section>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
        <section className="resume card-hover">
          <h2 className="section-title">Languages</h2>
          <ul className="list">
            {languages.map((language, index) => (
              <li key={index} className="list-item">
                <span style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#6f42c1', 
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '12px'
                }}></span>
                {language}
              </li>
            ))}
          </ul>
        </section>

        <section className="resume card-hover">
          <h2 className="section-title">Hobbies</h2>
          <ul className="list">
            {hobbies.map((hobby, index) => (
              <li key={index} className="list-item">
                <span style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#fd7e14',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '12px'
                }}></span>
                {hobby}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );

  const ProjectsView = () => (
    <div className="fade-in" style={{marginTop: '20px'}}>
      <h2 className="resume-title">My Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className="resume project-card" style={{
          borderLeft: '4px solid #007BFF',
          marginBottom: '30px'
        }}>
          <h3 style={{fontSize: '1.8rem', color: '#333', marginBottom: '15px', fontWeight: 'bold'}}>{project.title}</h3>
          <p style={{color: '#666', marginBottom: '20px', lineHeight: '1.6'}}>{project.description}</p>
          
          <div style={{marginBottom: '20px'}}>
            <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#555', marginBottom: '10px'}}>Technologies Used:</h4>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} style={{
                  backgroundColor: '#f8f9fa',
                  color: '#495057',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '14px',
                  border: '1px solid #dee2e6'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#555', marginBottom: '10px'}}>Key Features:</h4>
            <ul className="list">
              {project.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="list-item">
                  <span style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#28a745',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '12px'
                  }}></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{minHeight: '100vh'}}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '20px 0'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
          <h1 className="resume-title">Nikhil Nedungadi</h1>
          <div className="contact-info">
            <p>Contact: 9900154169 | Email: nikhil.nedungadi01@gmail.com</p>
            <a 
              href="https://www.linkedin.com/in/nikhil-nedungadi-b20ab4221/" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: '#007BFF',
                textDecoration: 'none',
                marginTop: '10px'
              }}
            >
              <LinkedInIcon />
              <span style={{marginLeft: '8px'}}>LinkedIn Profile</span>
            </a>
            
            {/* Resume Download Button */}
            <div className="mt-4">
              <span style={{color: '#555', marginRight: '10px'}}>Download Resume:</span>
              <a 
                href="/resume.pdf" 
                download="Nikhil_Nedungadi_Resume.pdf"
                className="resume-button"
                style={{textDecoration: 'none'}}
              >
                Nikhil Nedungadi Resume
              </a>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={{display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px'}}>
            <button
              onClick={() => setActiveView('resume')}
              className={`resume-button ${activeView === 'resume' ? 'nav-button-active' : ''}`}
              style={{
                backgroundColor: activeView === 'resume' ? '#007BFF' : '#6c757d',
                padding: '12px 24px',
                fontSize: '16px'
              }}
            >
              Resume
            </button>
            <button
              onClick={() => setActiveView('projects')}
              className={`resume-button ${activeView === 'projects' ? 'nav-button-active' : ''}`}
              style={{
                backgroundColor: activeView === 'projects' ? '#007BFF' : '#6c757d',
                padding: '12px 24px',
                fontSize: '16px'
              }}
            >
              Projects
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        {activeView === 'resume' ? <ResumeView /> : <ProjectsView />}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
        marginTop: '40px'
      }}>
        <p>&copy; 2025 Nikhil Nedungadi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;