import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Heading from './components/Heading';
import Sidebar from './components/Sidebar';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Summary from './components/Summary';
import Finalize from './components/Finalize';
import Home from './components/Home';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [personaldata, setPersonalData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    linkedin: "",
    website: "",
    github: ""
  });

  const [education, setEducation] = useState([{
    college: "",
    location: "",
    degree: "",
    subject: "",
    startdate: null,
    enddate: null
  }]);

  const [experience, setExperience] = useState([{
    jobtitle: "",
    company: "",
    location: "",
    country: "",
    description: "",
    startdate: null,
    enddate: null
  }]);

  const [projects, setProjects] = useState([{
    title: "",
    techstack: "",
    link: "",
    description: "",
    startdate: null,
    enddate: null
  }]);

  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState("");


  useEffect(() => {
    const saveData = setTimeout(() => {
      const allData = {
        personaldata,
        education,
        experience,
        projects,
        skills,
        summary
      };
      localStorage.setItem('resumeData', JSON.stringify(allData));
    }, 800);
    return () => clearTimeout(saveData);
  }, [personaldata, education, experience, projects, skills, summary]);


  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setPersonalData(parsed.personaldata || {});
        setEducation(parsed.education || []);
        setExperience(parsed.experience || []);
        setProjects(parsed.projects || []);
        setSkills(parsed.skills || []);
        setSummary(parsed.summary || "");
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }
  }, []);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="min-h-screen w-full p-4"><Home /></div>} />

          <Route path="/*" element={
            <div className="flex flex-col md:flex-row min-h-screen print:!block">

           
              {isMobile && (
                <button
                  className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded shadow-lg"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? '✕' : '☰'}
                </button>
              )}

              <div
                className={`
                  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                  md:translate-x-0 fixed md:static w-64 bg-black min-h-screen z-40
                  transition-transform duration-300 ease-in-out
                  print:hidden
                `}
              >
                <Sidebar onNavigate={() => isMobile && setSidebarOpen(false)} />
              </div>

             
              {isMobile && sidebarOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                     onClick={() => setSidebarOpen(false)} />
              )}

             
              <div className="flex-1 p-4 md:p-8 mt-12 md:mt-0 print:mt-0">
                <Routes>
                  <Route path="/heading" element={<Heading personaldata={personaldata} setPersonalData={setPersonalData} />} />
                  <Route path="/education" element={<Education education={education} setEducation={setEducation} />} />
                  <Route path="/experience" element={<Experience experience={experience} setExperience={setExperience} />} />
                  <Route path="/projects" element={<Projects projects={projects} setProjects={setProjects} />} />
                  <Route path="/skills" element={<Skills skills={skills} setSkills={setSkills} />} />
                  <Route path="/summary" element={<Summary summary={summary} setSummary={setSummary} personaldata={personaldata} education={education} projects={projects} skills={skills} experience={experience} />} />
                  <Route path="/finalize" element={<Finalize personaldata={personaldata} education={education} experience={experience} projects={projects} skills={skills} summary={summary} />} />
                </Routes>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;