import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function Education({ education, setEducation }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (index, e) => {
    const updated = [...education];
    updated[index][e.target.name] = e.target.value;
    setEducation(updated);
  };

  const handleStartDate = (index, date) => {
    const updated = [...education];
    updated[index].startdate = date;
    setEducation(updated);
  };

  const handleEndDate = (index, date) => {
    const updated = [...education];
    updated[index].enddate = date;
    setEducation(updated);
  };

  const addForm = () => {
    if (education.length < 5) {
      setEducation([
        ...education,
        {
          college: "",
          location: "",
          degree: "",
          subject: "",
          startdate: null,
          enddate: null,
        },
      ]);
      setError(null);
    } else {
      setError("Maximum 5 education entries allowed");
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteForm = (index) => {
    if (education.length === 1) {
      setError("At least one education entry is required");
      setTimeout(() => setError(null), 3000);
      return;
    }
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    setError(null);
  };

  const validateAndNext = () => {
  
    const hasValidEducation = education.some(edu => 
      edu.college && edu.college.trim() !== "" && 
      edu.degree && edu.degree.trim() !== ""
    );
    
    if (!hasValidEducation && education.length > 0) {
      setError("Please fill in at least College/University and Degree for one entry");
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    navigate("/experience");
  };

  const validateAndPreview = () => {
 
    const hasValidEducation = education.some(edu => 
      edu.college && edu.college.trim() !== "" && 
      edu.degree && edu.degree.trim() !== ""
    );
    
    if (!hasValidEducation && education.length > 0) {
      setError("Please fill in at least College/University and Degree for one entry");
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    navigate("/finalize");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FaArrowLeft className="cursor-pointer hover:text-gray-600 transition-colors" onClick={() => navigate("/heading")} />
        <button className="underline text-lg cursor-pointer hover:text-gray-600 transition-colors" onClick={() => navigate("/heading")}>
          Go back
        </button>
      </div>
      
      <h1 className="text-3xl md:text-5xl mb-4 font-bold">Education</h1>
      <p className="text-lg md:text-xl mb-6 text-[#505a63]">Add Your Educational Background</p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {education.map((edu, index) => (
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
                College/University <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black" 
                placeholder="e.g., Stanford University, MIT, Delhi University" 
                name="college" 
                value={edu.college} 
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            
            <div>
              <label className="font-semibold block mb-2">Location</label>
              <input 
                type="text" 
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black" 
                placeholder="e.g., New Delhi, California" 
                name="location" 
                value={edu.location} 
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">
                Degree <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black" 
                placeholder="e.g., Bachelor of Technology, Master of Science, MBA" 
                name="degree" 
                value={edu.degree} 
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            
            <div>
              <label className="font-semibold block mb-2">Field of Study</label>
              <input 
                type="text" 
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black" 
                placeholder="e.g., Computer Science, Business Administration, Mechanical Engineering" 
                name="subject" 
                value={edu.subject} 
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
          
          <div>
            <label className="font-semibold block mb-2">Graduation Duration</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <DatePicker
                  selected={edu.startdate}
                  onChange={(date) => handleStartDate(index, date)}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  placeholderText="Start Year"
                  className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <p className="text-xs text-gray-500 mt-1">Select start year and month</p>
              </div>
              
              <div>
                <DatePicker
                  selected={edu.enddate}
                  onChange={(date) => handleEndDate(index, date)}
                  dateFormat="MMMM yyyy"
                  placeholderText="End Year"
                  showMonthYearPicker
                  className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <p className="text-xs text-gray-500 mt-1">Select end year and month</p>
              </div>
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
            Add education
          </button>
          <span className="text-sm text-gray-500 ml-2">
            ({education.length}/5 entries)
          </span>
        </div>
        
        <div className="flex gap-4">
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
      </div>
    
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Your Education Section</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Include your highest degree first</li>
          <li>• Add your expected graduation date if you're currently studying</li>
          <li>• Include relevant coursework if you're a recent graduate</li>
          <li>• Add your GPA if it's 3.0 or higher (optional)</li>
          <li>• You can add multiple degrees (up to 5 entries)</li>
        </ul>
      </div>
      
      
          
    </div>
  );
}

export default Education;