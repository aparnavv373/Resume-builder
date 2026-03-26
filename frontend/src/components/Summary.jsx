// Summary.jsx
import { FaArrowLeft } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";

function Summary({ summary, setSummary, personaldata, skills, experience, projects, education }) {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [aiError, setAiError] = useState(null);

  const insertExample = (text) => {
    setSummary(text);
  };

  const generateSummary = async () => {
    setGenerating(true);
    setAiError(null);
    
    try {
  
      const formattedExperience = experience.map(exp => ({
        jobtitle: exp.jobtitle || "",
        company: exp.company || "",
        location: exp.location || "",
        country: exp.country || "",
        description: exp.description || "",
        startdate: exp.startdate || "",
        enddate: exp.enddate || ""
      }));

      const formattedProjects = projects.map(proj => ({
        title: proj.title || "",
        techstack: proj.techstack || "",
        link: proj.link || "",
        description: proj.description || "",
        startdate: proj.startdate || "",
        enddate: proj.enddate || ""
      }));

      const formattedEducation = education.map(edu => ({
        college: edu.college || "",
        location: edu.location || "",
        degree: edu.degree || "",
        subject: edu.subject || "",
        startdate: edu.startdate || "",
        enddate: edu.enddate || ""
      }));

      const requestData = {
        personal_info: {
          firstname: personaldata.firstname || "",
          lastname: personaldata.lastname || "",
          email: personaldata.email || "",
          phone: personaldata.phone || "",
          city: personaldata.city || "",
          country: personaldata.country || "",
          linkedin: personaldata.linkedin || "",
          website: personaldata.website || "",
          github: personaldata.github || ""
        },
        skills: skills || [],
        experience: formattedExperience,
        projects: formattedProjects,
        education: formattedEducation 
      };

      console.log("Sending request with data:", requestData);

      const response = await fetch('http://localhost:8000/api/generate/summary', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.detail || `Server returned ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Generated summary:", data);
      
      if (data.generated_text) {
        setSummary(data.generated_text);
      } else {
        throw new Error("No text generated");
      }
      
    } catch (error) {
      console.error('Generation error:', error);
      let errorMessage = error.message;
      
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to backend. Make sure the server is running: cd backend && python main.py';
      } else if (error.message.includes('422')) {
        errorMessage = 'Invalid data format. Please fill in all required fields.';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Check your GROQ_API_KEY in .env file and ensure all data is properly formatted.';
      }
      
      setAiError(errorMessage);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FaArrowLeft className="cursor-pointer" onClick={() => navigate("/skills")} />
        <button className="underline text-lg cursor-pointer" onClick={() => navigate("/skills")}>
          Go back
        </button>
      </div>

      <h1 className="text-3xl md:text-5xl mb-4 font-bold">Summary</h1>
      <p className="text-lg md:text-xl mb-6 text-[#505a63]">
        Write a short introduction that highlights your experience, key skills, and career goals.
      </p>
      
      {aiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {aiError}
        </div>
      )}

      <textarea
        className="w-full h-[250px] border p-4 rounded focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Start Typing or click Generate with AI..."
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <button 
        className="bg-black text-white px-6 py-2 rounded w-full md:w-auto mb-6 hover:bg-gray-800 transition-colors disabled:opacity-50"
        onClick={generateSummary}
        disabled={generating}
      >
        {generating ? (
          <span className="flex items-center justify-center gap-2">
            <FiLoader className="animate-spin" /> Generating...
          </span>
        ) : (
          'Generate with AI'
        )}
      </button>

      <div className="bg-[#ebedf0] rounded flex flex-col gap-4 p-6">
        <h2 className="font-bold text-xl md:text-2xl">Suggested summary structure</h2>
        <p className="text-[#505a63]">Click an example to insert and customize.</p>

        <div
          className="bg-white rounded p-4 flex gap-2 items-start cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => insertExample(
            "Experienced professional with expertise in full-stack development and project management. Proven track record of delivering high-quality software solutions and leading cross-functional teams. Seeking to leverage technical skills and leadership experience to drive innovation at a forward-thinking organization."
          )}
        >
          <FaCirclePlus className="text-xl flex-shrink-0 mt-1" />
          <span className="flex-1">
            Experienced professional with expertise in full-stack development...
          </span>
        </div>

        <div
          className="bg-white rounded p-4 flex gap-2 items-start cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => insertExample(
            "Results-driven software engineer with 5+ years of experience in web development and cloud technologies. Skilled in React, Node.js, and AWS with a strong focus on scalable architecture. Passionate about creating efficient solutions that solve real-world problems."
          )}
        >
          <FaCirclePlus className="text-xl flex-shrink-0 mt-1" />
          <span className="flex-1">
            Results-driven software engineer with 5+ years of experience...
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          className="bg-black px-4 py-2 rounded text-white hover:bg-gray-800 transition-colors"
          onClick={() => navigate("/finalize")}
        >
          Preview
        </button>
        <button
          className="bg-black px-4 py-2 rounded text-white hover:bg-gray-800 transition-colors"
          onClick={() => navigate("/finalize")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Summary;