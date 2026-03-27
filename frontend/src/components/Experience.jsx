import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { generateExperience } from '../services/api';

function Experience({ experience, setExperience }) {
  const navigate = useNavigate();
  const [generatingIndex, setGeneratingIndex] = useState(null);
  const [aiError, setAiError] = useState(null);

  const handleChange = (index, e) => {
    const updated = [...experience];
    updated[index][e.target.name] = e.target.value;
    setExperience(updated);
  };

  const handleStartDate = (index, date) => {
    const updated = [...experience];
    updated[index].startdate = date;
    setExperience(updated);
  };

  const handleEndDate = (index, date) => {
    const updated = [...experience];
    updated[index].enddate = date;
    setExperience(updated);
  };

  const generateDescription = async (index) => {
    const exp = experience[index];
    
    // Validate required fields
    if (!exp.jobtitle || !exp.jobtitle.trim()) {
      setAiError("Please enter Job Title before generating");
      setTimeout(() => setAiError(null), 3000);
      return;
    }
    
    if (!exp.company || !exp.company.trim()) {
      setAiError("Please enter Company name before generating");
      setTimeout(() => setAiError(null), 3000);
      return;
    }

    setGeneratingIndex(index);
    setAiError(null);
    
    try {
      const data = await generateExperience({
        job_title: exp.jobtitle.trim(),
        company: exp.company.trim(),
        description: exp.description || ""
      });
      
      if (data.generated_text) {
        const updated = [...experience];
        updated[index].description = data.generated_text;
        setExperience(updated);
      } else {
        throw new Error("No text generated");
      }
    } catch (error) {
      console.error('Generation error:', error);
      let errorMessage = error.message;
      
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to backend. Make sure the server is running.';
      } else if (error.message.includes('422')) {
        errorMessage = 'Invalid data format. Please check your job title and company.';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Please check your GROQ_API_KEY and try again.';
      }
      
      setAiError(errorMessage);
      setTimeout(() => setAiError(null), 5000);
    } finally {
      setGeneratingIndex(null);
    }
  };

  const addForm = () => {
    if (experience.length < 5) {
      setExperience([
        ...experience,
        {
          jobtitle: "",
          company: "",
          location: "",
          country: "",
          description: "",
          startdate: null,
          enddate: null,
        },
      ]);
    } else {
      setAiError("Maximum 5 experience entries allowed");
      setTimeout(() => setAiError(null), 3000);
    }
  };
  
  const deleteForm = (index) => {
    if (experience.length === 1) {
      setAiError("At least one experience entry is required");
      setTimeout(() => setAiError(null), 3000);
      return;
    }
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FaArrowLeft className="cursor-pointer" onClick={() => navigate("/education")} />
        <button className="underline text-lg cursor-pointer" onClick={() => navigate("/education")}>
          Go back
        </button>
      </div>
      
      <h1 className="text-3xl md:text-5xl mb-4 font-bold">Experience</h1>
      <p className="text-lg md:text-xl mb-6 text-[#505a63]">
        Tell us about your Experience (If you are fresher you can skip this section)
      </p>
      
      {aiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {aiError}
        </div>
      )}
      
      {experience.map((exp, index) => (
        <div key={index} className="flex flex-col gap-6 border rounded p-4 md:p-6 relative mb-6">
          <button
            type="button"
            onClick={() => deleteForm(index)}
            className="absolute top-3 right-3 text-red-600 hover:text-red-800 transition-colors"
            title="Delete Entry"
          >
            <FaTrash />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black" 
                placeholder="e.g., Software Engineer, Product Manager" 
                name="jobtitle" 
                value={exp.jobtitle} 
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            
            <div>
              <label className="font-semibold block mb-2">
                Company <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black" 
                placeholder="e.g., Google, Microsoft, Startup" 
                name="company" 
                value={exp.company} 
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">Location</label>
              <input 
                type="text" 
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black" 
                placeholder="e.g., New Delhi, San Francisco" 
                name="location" 
                value={exp.location} 
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            
            <div>
              <label className="font-semibold block mb-2">Country</label>
              <input 
                type="text" 
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black" 
                placeholder="e.g., India, USA" 
                name="country" 
                value={exp.country} 
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
          
          <div>
            <label className="font-semibold block mb-2">Description</label>
            <textarea 
              className="border w-full rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black" 
              placeholder="Describe your responsibilities, achievements, and impact..." 
              rows="4" 
              name="description" 
              value={exp.description} 
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          
          <button 
            className="bg-black text-white px-6 py-2 rounded w-full md:w-auto hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                selected={exp.startdate}
                onChange={(date) => handleStartDate(index, date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black"
                placeholderText="Select start date"
              />
            </div>
            
            <div>
              <label className="font-semibold block mb-2">End Date</label>
              <DatePicker
                selected={exp.enddate}
                onChange={(date) => handleEndDate(index, date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black"
                placeholderText="Select end date"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty if currently working here</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
        <div className="flex items-center gap-2">
          <FaPlus 
            className="text-xl cursor-pointer hover:text-gray-600 transition-colors" 
            onClick={addForm} 
          />
          <button 
            className="text-lg underline hover:text-gray-600 transition-colors" 
            onClick={addForm}
          >
            Add experience
          </button>
          <span className="text-sm text-gray-500 ml-2">
            ({experience.length}/5 entries)
          </span>
        </div>
        
        <div className="flex gap-4">
          <button 
            className="underline hover:text-gray-600 transition-colors" 
            onClick={() => navigate("/projects")}
          >
            Skip for Now
          </button>
          <button 
            className="bg-black px-4 py-2 rounded text-white hover:bg-gray-800 transition-colors" 
            onClick={() => navigate("/finalize")}
          >
            Preview
          </button>
          <button 
            className="bg-black px-4 py-2 rounded text-white hover:bg-gray-800 transition-colors" 
            onClick={() => navigate("/projects")}
          >
            Next
          </button>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Better AI Generation</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Be specific with your Job Title (e.g., "Senior Frontend Developer" instead of just "Developer")</li>
          <li>• Include the full company name for better context</li>
          <li>• Add any specific technologies or achievements in the description field for better results</li>
          <li>• You can edit the generated text to better match your actual experience</li>
        </ul>
      </div>
    </div>
  );
}

export default Experience;