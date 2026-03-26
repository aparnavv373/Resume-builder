import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";

function Projects({ projects, setProjects }) {
  const navigate = useNavigate();
  const [generatingIndex, setGeneratingIndex] = useState(null);
  const [aiError, setAiError] = useState(null);

  const handleChange = (index, e) => {
    const updated = [...projects];
    updated[index][e.target.name] = e.target.value;
    setProjects(updated);
  };

  const handleStartDate = (index, date) => {
    const updated = [...projects];
    updated[index].startdate = date;
    setProjects(updated);
  };

  const handleEndDate = (index, date) => {
    const updated = [...projects];
    updated[index].enddate = date;
    setProjects(updated);
  };

  const generateDescription = async (index) => {
    const proj = projects[index];
    if (!proj.title) {
      alert("Please enter Project Title first");
      return;
    }

    setGeneratingIndex(index);
    setAiError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/generate/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: proj.title,
          techstack: proj.techstack,
          description: proj.description
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate');
      
      const data = await response.json();
      const updated = [...projects];
      updated[index].description = data.generated_text;
      setProjects(updated);
    } catch (error) {
      setAiError('Failed to generate description. Please try again.');
      console.error(error);
    } finally {
      setGeneratingIndex(null);
    }
  };

  const addForm = () => {
    setProjects([
      ...projects,
      {
        title: "",
        techstack: "",
        link: "",
        description: "",
        startdate: "",
        enddate: "",
      },
    ]);
  };

  const deleteForm = (index) => {
    if (projects.length === 1) return;
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FaArrowLeft className="cursor-pointer" onClick={() => navigate("/experience")} />
        <button className="underline text-lg" onClick={() => navigate("/experience")}>
          Go back
        </button>
      </div>

      <h1 className="text-3xl md:text-5xl mb-4 font-bold">Projects</h1>
      <p className="text-lg md:text-xl mb-6 text-[#505a63]">
        Tell us about your projects
      </p>
      
      {aiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {aiError}
        </div>
      )}

      {projects.map((proj, index) => (
        <div key={index} className="flex flex-col gap-6 border rounded p-4 md:p-6 relative mb-6">
          <button
            type="button"
            onClick={() => deleteForm(index)}
            className="absolute top-3 right-3 text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">Project Title</label>
              <input
                type="text"
                className="border w-full h-12 rounded-xl border-[#87888a] p-4"
                placeholder="Portfolio Website"
                name="title"
                value={proj.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Tech Stack</label>
              <input
                type="text"
                className="border w-full h-12 rounded-xl border-[#87888a] p-4"
                placeholder="React, Node.js"
                name="techstack"
                value={proj.techstack}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-2">Project Link</label>
            <input
              type="url"
              className="border w-full h-12 rounded-xl border-[#87888a] p-4"
              placeholder="GitHub Repo or Live Demo"
              name="link"
              value={proj.link}
              onChange={(e) => handleChange(index, e)}
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Description</label>
            <textarea
              className="border w-full rounded-xl border-[#87888a] p-4"
              placeholder="Describe your role, achievements..."
              rows="4"
              name="description"
              value={proj.description}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          
          <button 
            className="bg-black text-white px-6 py-2 rounded w-full md:w-auto"
            onClick={() => generateDescription(index)}
            disabled={generatingIndex === index}
          >
            {generatingIndex === index ? (
              <span className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin" /> Generating...
              </span>
            ) : (
              'Generate with AI'
            )}
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">Start Date</label>
              <DatePicker
                selected={proj.startdate}
                onChange={(date) => handleStartDate(index, date)}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                className="border w-full h-12 rounded-xl border-[#87888a] p-4"
                placeholderText="Start Date"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">End Date</label>
              <DatePicker
                selected={proj.enddate}
                onChange={(date) => handleEndDate(index, date)}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                className="border w-full h-12 rounded-xl border-[#87888a] p-4"
                placeholderText="End Date"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
        <div className="flex items-center gap-2">
          <FaPlus className="text-xl cursor-pointer" onClick={addForm} />
          <button className="text-lg underline" onClick={addForm}>
            Add Project
          </button>
        </div>

        <div className="flex gap-4">
          <button className="underline" onClick={() => navigate("/skills")}>
            Skip for Now
          </button>
          <button className="bg-black text-white px-4 py-2 rounded" onClick={() => navigate("/finalize")}>
            Preview
          </button>
          <button className="bg-black text-white px-4 py-2 rounded" onClick={() => navigate("/skills")}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Projects;