import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { useState } from "react";

function Heading({ personaldata, setPersonalData }) {
  const [isOptional, setIsOptional] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPersonalData(prev => ({ ...prev, [name]: value }));
    
   
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!personaldata.firstname || personaldata.firstname.trim() === "") {
      newErrors.firstname = "First name is required";
    }
    
    if (!personaldata.lastname || personaldata.lastname.trim() === "") {
      newErrors.lastname = "Last name is required";
    }
    
    if (!personaldata.email || personaldata.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(personaldata.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!personaldata.phone || personaldata.phone.trim() === "") {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/.test(personaldata.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!personaldata.city || personaldata.city.trim() === "") {
      newErrors.city = "City is required";
    }
    
    if (!personaldata.country || personaldata.country.trim() === "") {
      newErrors.country = "Country is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/education");
    }
  };

  const handlePreview = () => {
    if (validateForm()) {
      navigate("/finalize");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FaArrowLeft 
          className="cursor-pointer hover:text-gray-600 transition-colors" 
          onClick={() => navigate("/")}
        />
        <button 
          className="underline text-lg cursor-pointer hover:text-gray-600 transition-colors"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
      </div>

      <h1 className="text-3xl md:text-5xl mb-4 font-bold">Personal Information</h1>
      <p className="text-lg md:text-xl mb-6 text-[#505a63]">
        Let's start with your contact details
      </p>
      
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold block mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              className={`border w-full h-12 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.firstname ? "border-red-500" : "border-[#87888a]"
              }`}
              placeholder="e.g., Arya" 
              value={personaldata.firstname} 
              name="firstname" 
              onChange={handleChange}
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
            )}
          </div>
          
          <div>
            <label className="font-semibold block mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              className={`border w-full h-12 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.lastname ? "border-red-500" : "border-[#87888a]"
              }`}
              placeholder="e.g., Raj" 
              value={personaldata.lastname} 
              name="lastname" 
              onChange={handleChange}
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold block mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              className={`border w-full h-12 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.city ? "border-red-500" : "border-[#87888a]"
              }`}
              placeholder="e.g., New Delhi" 
              value={personaldata.city} 
              name="city" 
              onChange={handleChange}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          
          <div>
            <label className="font-semibold block mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              className={`border w-full h-12 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.country ? "border-red-500" : "border-[#87888a]"
              }`}
              placeholder="e.g., India" 
              value={personaldata.country} 
              name="country" 
              onChange={handleChange}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold block mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input 
              type="tel" 
              className={`border w-full h-12 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.phone ? "border-red-500" : "border-[#87888a]"
              }`}
              placeholder="e.g., +91 98765 43210" 
              value={personaldata.phone} 
              name="phone" 
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          
          <div>
            <label className="font-semibold block mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              className={`border w-full h-12 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.email ? "border-red-500" : "border-[#87888a]"
              }`}
              placeholder="e.g., aryaraj@example.com" 
              value={personaldata.email} 
              name="email" 
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      </form>
      
      
      <div className="flex items-center gap-2 mt-6 mb-4">
        <p
          className="text-lg underline cursor-pointer hover:text-gray-600 transition-colors"
          onClick={() => setIsOptional(!isOptional)}
        >
          {isOptional ? "Hide" : "Add"} additional information (optional)
        </p>
        <IoIosInformationCircle
          className="text-xl text-gray-500"
          title="If you have a LinkedIn profile, portfolio or website you can add link"
        />
      </div>

      
      {isOptional && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">LinkedIn</label>
              <input
                type="url"
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="https://linkedin.com/in/username"
                name="linkedin"
                value={personaldata.linkedin}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Website</label>
              <input
                type="url"
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="https://yourportfolio.com"
                name="website"
                value={personaldata.website}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">GitHub</label>
              <input
                type="url"
                className="border w-full h-12 rounded-xl border-[#87888a] p-4 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="https://github.com/username"
                name="github"
                value={personaldata.github}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4 mt-4">
        <button 
          className="bg-black px-4 py-2 rounded text-white hover:bg-gray-800 transition-colors" 
          onClick={handlePreview}
        >
          Preview
        </button>
        <button 
          className="bg-black px-4 py-2 rounded text-white hover:bg-gray-800 transition-colors" 
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      
   
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Personal Information</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use your professional name as you want it to appear on your resume</li>
          <li>• Provide a professional email address (e.g., firstname.lastname@example.com)</li>
          <li>• Include your country code with phone number for international opportunities</li>
          <li>• Optional fields help recruiters find your professional profiles</li>
        </ul>
      </div>
    </div>
  );
}

export default Heading;