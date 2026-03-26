import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function Skills({ skills, setSkills }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    const cleanInput = input.trim().toLowerCase();
    
    if (e.key === "Enter" && cleanInput !== "") {
      e.preventDefault();
      
    
      if (!skills.includes(cleanInput)) {
        if (skills.length < 20) {
          setSkills([...skills, cleanInput]);
          setInput("");
          setError(null);
        } else {
          setError("Maximum 20 skills allowed");
          setTimeout(() => setError(null), 3000);
        }
      } else {
        setError("This skill is already added");
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const handleAddSkill = () => {
    const cleanInput = input.trim().toLowerCase();
    
    if (cleanInput !== "") {
      if (!skills.includes(cleanInput)) {
        if (skills.length < 20) {
          setSkills([...skills, cleanInput]);
          setInput("");
          setError(null);
        } else {
          setError("Maximum 20 skills allowed");
          setTimeout(() => setError(null), 3000);
        }
      } else {
        setError("This skill is already added");
        setTimeout(() => setError(null), 3000);
      }
    } else {
      setError("Please enter a skill");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleRemove = (indexToRemove) => {
    const newSkills = skills.filter((_, index) => index !== indexToRemove);
    setSkills(newSkills);
  };

  const validateAndNext = () => {
    if (skills.length === 0) {
      setError("Please add at least one skill");
      setTimeout(() => setError(null), 3000);
      return;
    }
    navigate("/summary");
  };

  const validateAndPreview = () => {
    navigate("/finalize");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FaArrowLeft 
          className="cursor-pointer hover:text-gray-600 transition-colors" 
          onClick={() => navigate("/projects")}
        />
        <button 
          className="underline text-lg cursor-pointer hover:text-gray-600 transition-colors" 
          onClick={() => navigate("/projects")}
        >
          Go back
        </button>
      </div>
      
      <h1 className="text-3xl md:text-5xl mb-4 font-bold">Skills</h1>
      <p className="text-lg md:text-xl mb-6 text-[#505a63]">
        Tell us about your Skills
      </p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div className="relative">
        <input 
          type="text" 
          placeholder="Type a skill and press Enter (e.g., JavaScript, Python, React)" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border rounded w-full p-4 mb-4 rounded-xl border-[#87888a] focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleAddSkill}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FaPlus className="inline mr-1" /> Add
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="flex items-center bg-black text-white px-4 py-2 rounded-full gap-2 hover:bg-gray-800 transition-colors"
          >
            <span className="capitalize">{skill}</span>
            <button 
              onClick={() => handleRemove(index)}
              className="hover:text-red-400 transition-colors ml-1"
              title="Remove skill"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      
      {skills.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong>Tip:</strong> Add your key skills. Include technical skills, programming languages, tools, and soft skills.
        </div>
      )}
      
      <div className="flex justify-end gap-4 mt-6">
        <button
          className="bg-black px-4 py-2 rounded text-white hover:bg-gray-800 transition-colors"
          onClick={validateAndPreview}
        >
          Preview
        </button>
        <button
          className="bg-black px-4 py-2 rounded text-white hover:bg-gray-800 transition-colors"
          onClick={validateAndNext}
        >
          Next
        </button>
      </div>
      
     
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Popular Skills to Add</h3>
        <div className="flex flex-wrap gap-2">
          {["JavaScript", "Python", "React", "Node.js", "Java", "SQL", "HTML/CSS", "Git", "AWS", "TypeScript", "Project Management", "Communication", "Leadership", "Problem Solving"].map((suggestedSkill) => (
            <button
              key={suggestedSkill}
              onClick={() => {
                const skillLower = suggestedSkill.toLowerCase();
                if (!skills.includes(skillLower) && skills.length < 20) {
                  setSkills([...skills, skillLower]);
                }
              }}
              className="bg-white border border-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition-colors"
            >
              + {suggestedSkill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;