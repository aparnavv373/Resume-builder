// Finalize.jsx
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPrint } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

function Finalize({ personaldata, education, experience, projects, skills, summary }) {
  const navigate = useNavigate();
  const printRef = useRef(null);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });


  const formatDate = (date) => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (e) {
      return "";
    }
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${personaldata.firstname} ${personaldata.lastname} - Resume`;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${personaldata.firstname} ${personaldata.lastname} - Resume</title>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: white;
              margin: 0;
              padding: 0;
            }
            
            /* Page styling */
            .resume-page {
              background: white;
              margin: 0;
              padding: 40px;
              page-break-after: always;
              break-inside: avoid;
              position: relative;
              min-height: 100vh;
            }
            .resume-page:last-child {
              page-break-after: auto;
            }
            
            /* Page Header */
            .page-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 15px;
              margin-bottom: 30px;
              border-bottom: 2px solid #e5e7eb;
              font-size: 12px;
              color: #6b7280;
            }
            .resume-title {
              font-weight: 600;
              font-size: 14px;
              color: #374151;
            }
            .page-date {
              font-size: 12px;
            }
            
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              .resume-page {
                padding: 0.5in;
                page-break-after: always;
                box-shadow: none;
              }
              @page {
                size: A4;
                margin: 0.5in;
              }
            }
            
            /* Resume Content Styles */
            .resume-content {
              max-width: 100%;
            }
            
            /* Header Section - Centered */
            .header-section {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e5e7eb;
            }
            .name {
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 12px;
              color: #111827;
            }
            .contact-info {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 20px;
              color: #4b5563;
              font-size: 14px;
              margin-top: 8px;
            }
            .contact-item {
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .contact-item a {
              color: #4b5563;
              text-decoration: none;
            }
            .contact-item a:hover {
              text-decoration: underline;
            }
            
            /* Section Styles */
            .section {
              margin-bottom: 24px;
            }
            .section-title {
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 12px;
              color: #111827;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 4px;
            }
            .education-item, .experience-item, .project-item {
              margin-bottom: 16px;
            }
            .item-header {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              flex-wrap: wrap;
              margin-bottom: 4px;
            }
            .item-title {
              font-weight: 600;
              font-size: 16px;
            }
            .item-subtitle {
              font-weight: 500;
              color: #4b5563;
            }
            .item-date {
              color: #6b7280;
              font-size: 14px;
            }
            .item-location {
              color: #6b7280;
              font-size: 14px;
            }
            .item-description {
              color: #4b5563;
              font-size: 14px;
              line-height: 1.5;
              margin-top: 6px;
              white-space: pre-wrap;
            }
            .skills-list {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }
            .skill-tag {
              background: #f3f4f6;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 13px;
              color: #374151;
            }
            .summary-text {
              color: #4b5563;
              line-height: 1.6;
              font-size: 14px;
            }
            
            @media print {
              .name {
                font-size: 28px;
              }
              .contact-info {
                font-size: 12px;
                gap: 15px;
              }
              .section-title {
                font-size: 16px;
              }
              .item-title {
                font-size: 14px;
              }
            }
          </style>
        </head>
        <body>
          <div id="print-content">
            ${generatePrintContent()}
          </div>
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
    document.title = originalTitle;
  };

  const generatePrintContent = () => {
    
    const mainContent = getResumeContent();
    
   
    return `
      <div class="resume-page">
     
        ${mainContent}
      </div>
    `;
  };

  const getResumeContent = () => {
    return `
      <!-- Header Section - Centered -->
      <div class="header-section">
        <h1 class="name">
          ${personaldata.firstname} ${personaldata.lastname}
        </h1>
        
        <div class="contact-info">
          ${personaldata.email ? `<div class="contact-item">📧 ${personaldata.email}</div>` : ''}
          ${personaldata.phone ? `<div class="contact-item">📞 ${personaldata.phone}</div>` : ''}
          ${personaldata.city && personaldata.country ? `<div class="contact-item">📍 ${personaldata.city}, ${personaldata.country}</div>` : ''}
        </div>
        
        <div class="contact-info">
          ${personaldata.linkedin ? `<div class="contact-item">🔗 <a href="${personaldata.linkedin}" target="_blank">LinkedIn</a></div>` : ''}
          ${personaldata.github ? `<div class="contact-item">💻 <a href="${personaldata.github}" target="_blank">GitHub</a></div>` : ''}
          ${personaldata.website ? `<div class="contact-item">🌐 <a href="${personaldata.website}" target="_blank">Portfolio</a></div>` : ''}
        </div>
      </div>

      ${summary ? `
        <div class="section">
          <h2 class="section-title">Professional Summary</h2>
          <p class="summary-text">${summary}</p>
        </div>
      ` : ''}

      ${education && education.length > 0 && education.some(edu => edu.college) ? `
        <div class="section">
          <h2 class="section-title">Education</h2>
          ${education.map(edu => edu.college ? `
            <div class="education-item">
              <div class="item-header">
                <div>
                  <span class="item-title">${edu.degree || ''}</span>
                  ${edu.subject ? `<span class="item-subtitle"> in ${edu.subject}</span>` : ''}
                </div>
                <div class="item-date">
                  ${formatDate(edu.startdate)} - ${formatDate(edu.enddate) || "Present"}
                </div>
              </div>
              <div class="item-subtitle">${edu.college}</div>
              ${edu.location ? `<div class="item-location">${edu.location}</div>` : ''}
            </div>
          ` : '').join('')}
        </div>
      ` : ''}

      ${experience && experience.length > 0 && experience.some(exp => exp.jobtitle) ? `
        <div class="section">
          <h2 class="section-title">Work Experience</h2>
          ${experience.map(exp => exp.jobtitle && exp.company ? `
            <div class="experience-item">
              <div class="item-header">
                <div>
                  <span class="item-title">${exp.jobtitle}</span>
                  <span class="item-subtitle"> at ${exp.company}</span>
                </div>
                <div class="item-date">
                  ${formatDate(exp.startdate)} - ${formatDate(exp.enddate) || "Present"}
                </div>
              </div>
              ${(exp.location || exp.country) ? `
                <div class="item-location">
                  ${[exp.location, exp.country].filter(Boolean).join(", ")}
                </div>
              ` : ''}
              ${exp.description ? `
                <div class="item-description">${exp.description}</div>
              ` : ''}
            </div>
          ` : '').join('')}
        </div>
      ` : ''}

      ${projects && projects.length > 0 && projects.some(proj => proj.title) ? `
        <div class="section">
          <h2 class="section-title">Projects</h2>
          ${projects.map(proj => proj.title ? `
            <div class="project-item">
              <div class="item-header">
                <div>
                  <span class="item-title">${proj.title}</span>
                  ${proj.techstack ? `
                    <span class="item-subtitle"> | ${proj.techstack}</span>
                  ` : ''}
                </div>
                <div class="item-date">
                  ${formatDate(proj.startdate)} - ${formatDate(proj.enddate) || "Present"}
                </div>
              </div>
              ${proj.link ? `
                <div class="item-location">
                  <a href="${proj.link}" target="_blank">${proj.link.length > 50 ? proj.link.substring(0, 50) + "..." : proj.link}</a>
                </div>
              ` : ''}
              ${proj.description ? `
                <div class="item-description">${proj.description}</div>
              ` : ''}
            </div>
          ` : '').join('')}
        </div>
      ` : ''}

      ${skills && skills.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-list">
            ${skills.map(skill => `<span class="skill-tag capitalize">${skill}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    `;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <FaArrowLeft 
            className="cursor-pointer hover:text-gray-600 transition-colors" 
            onClick={() => navigate("/summary")}
          />
          <button 
            className="underline text-lg cursor-pointer hover:text-gray-600 transition-colors" 
            onClick={() => navigate("/summary")}
          >
            Go back
          </button>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <FaPrint /> Print / Save as PDF
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>

      <div 
        ref={printRef}
        className="resume-preview bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none"
        style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >
        <div className="p-8 md:p-10">
         
          

          
          <div className="text-center mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {personaldata.firstname} {personaldata.lastname}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm mb-2">
              {personaldata.email && (
                <div className="flex items-center gap-1">📧 {personaldata.email}</div>
              )}
              {personaldata.phone && (
                <div className="flex items-center gap-1">📞 {personaldata.phone}</div>
              )}
              {personaldata.city && personaldata.country && (
                <div className="flex items-center gap-1">📍 {personaldata.city}, {personaldata.country}</div>
              )}
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
              {personaldata.linkedin && (
                <div className="flex items-center gap-1">
                  🔗 <a href={personaldata.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
                </div>
              )}
              {personaldata.github && (
                <div className="flex items-center gap-1">
                  💻 <a href={personaldata.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                </div>
              )}
              {personaldata.website && (
                <div className="flex items-center gap-1">
                  🌐 <a href={personaldata.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Portfolio</a>
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          {summary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 pb-1 border-b border-gray-200">Professional Summary</h2>
              <p className="text-gray-600 leading-relaxed">{summary}</p>
            </div>
          )}

          {education && education.length > 0 && education.some(edu => edu.college) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 pb-1 border-b border-gray-200">Education</h2>
              {education.map((edu, idx) => (
                edu.college && (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-baseline flex-wrap mb-1">
                      <div>
                        <span className="font-semibold">{edu.degree}</span>
                        {edu.subject && <span className="text-gray-600"> in {edu.subject}</span>}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(edu.startdate)} - {formatDate(edu.enddate) || "Present"}
                      </div>
                    </div>
                    <div className="text-gray-700 font-medium">{edu.college}</div>
                    {edu.location && <div className="text-sm text-gray-500">{edu.location}</div>}
                  </div>
                )
              ))}
            </div>
          )}

         
          {experience && experience.length > 0 && experience.some(exp => exp.jobtitle) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 pb-1 border-b border-gray-200">Work Experience</h2>
              {experience.map((exp, idx) => (
                exp.jobtitle && exp.company && (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-baseline flex-wrap mb-1">
                      <div>
                        <span className="font-semibold">{exp.jobtitle}</span>
                        <span className="text-gray-600"> at {exp.company}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(exp.startdate)} - {formatDate(exp.enddate) || "Present"}
                      </div>
                    </div>
                    {(exp.location || exp.country) && (
                      <div className="text-sm text-gray-500 mb-1">
                        {[exp.location, exp.country].filter(Boolean).join(", ")}
                      </div>
                    )}
                    {exp.description && (
                      <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</div>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

      
          {projects && projects.length > 0 && projects.some(proj => proj.title) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 pb-1 border-b border-gray-200">Projects</h2>
              {projects.map((proj, idx) => (
                proj.title && (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-baseline flex-wrap mb-1">
                      <div>
                        <span className="font-semibold">{proj.title}</span>
                        {proj.techstack && <span className="text-gray-600"> | {proj.techstack}</span>}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(proj.startdate)} - {formatDate(proj.enddate) || "Present"}
                      </div>
                    </div>
                    {proj.link && (
                      <div className="text-sm mb-1">
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {proj.link.length > 50 ? proj.link.substring(0, 50) + "..." : proj.link}
                        </a>
                      </div>
                    )}
                    {proj.description && (
                      <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{proj.description}</div>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

         
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 pb-1 border-b border-gray-200">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={handlePrint}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <FaPrint /> Print / Save as PDF
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Done
        </button>
      </div>

     
    </div>
  );
}

export default Finalize;