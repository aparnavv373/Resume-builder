import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl text-center">
     
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Resume Builder
        </h1>
        
       
        <p className="text-xl md:text-2xl text-gray-600 mb-3">
          Smart resume builder with AI suggestions
        </p>
        
      
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Land Your Dream Job with a Resume That Recruiters Love
        </p>
        
  
        <button
          onClick={() => navigate("/heading")}
          className="bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Create my resume
        </button>
      </div>
    </div>
  );
}

export default Home;