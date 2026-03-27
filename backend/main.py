from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
from groq import Groq
from dotenv import load_dotenv
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(title="Resume Builder API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://*.railway.app",
        "https://*.railway.internal",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Groq API key
GROQ_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_KEY:
    logger.error("ERROR: GROQ_API_KEY not found in environment variables")
    raise Exception("GROQ_API_KEY not found in environment variables")

logger.info("Groq API key loaded successfully")

try:
    client = Groq(api_key=GROQ_KEY)
    logger.info("Groq client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Groq client: {e}")
    raise

# Pydantic models
class ExperienceGenerateRequest(BaseModel):
    job_title: str
    company: str
    description: Optional[str] = ""

class ProjectGenerateRequest(BaseModel):
    title: str
    techstack: str
    description: Optional[str] = ""

class SummaryGenerateRequest(BaseModel):
    personal_info: Dict
    skills: List[str]
    experience: List[Dict]
    projects: List[Dict]
    education: List[Dict]

def generate_ai_response(prompt: str, max_tokens=500):
    """Reusable function to call Groq API."""
    try:
        logger.info(f"Sending request to Groq API (prompt length: {len(prompt)})")
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=max_tokens,
        )
        generated_text = response.choices[0].message.content
        logger.info(f"Successfully generated response (length: {len(generated_text)})")
        return generated_text
    except Exception as e:
        logger.error(f"Error calling Groq API: {e}")
        raise HTTPException(status_code=500, detail=f"AI Generation Error: {str(e)}")

@app.get("/")
def home():
    return {"message": "Resume Builder AI Backend Running", "status": "online"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "groq_configured": GROQ_KEY is not None,
        "service": "resume-builder-backend"
    }

@app.post("/api/generate/experience")
async def generate_experience(request: ExperienceGenerateRequest):
    if not request.job_title or not request.company:
        raise HTTPException(status_code=422, detail="Job title and company are required")
    
    logger.info(f"Generating experience for: {request.job_title} at {request.company}")
    
    prompt = f"""
    Write a professional resume experience section based on these details:

    Job Title: {request.job_title}
    Company: {request.company}
    Additional Context: {request.description if request.description else "No additional context provided"}

    Requirements:
    - Use 3-4 bullet points
    - Start with strong action verbs (Led, Developed, Managed, etc.)
    - Include specific achievements and quantifiable results when possible
    - Focus on impact and responsibilities
    - Keep each bullet point concise but impactful
    - Don't use first person (I, me, my)
    
    Format as bullet points with "•" at the start of each point.
    """

    generated_text = generate_ai_response(prompt, max_tokens=400)
    return {"generated_text": generated_text}

@app.post("/api/generate/project")
async def generate_project(request: ProjectGenerateRequest):
    if not request.title:
        raise HTTPException(status_code=422, detail="Project title is required")
    
    logger.info(f"Generating project description for: {request.title}")
    
    prompt = f"""
    Create a professional project description for a resume:

    Project Title: {request.title}
    Technologies Used: {request.techstack if request.techstack else "Not specified"}
    Additional Notes: {request.description if request.description else "No additional notes"}

    Requirements:
    - Use 2-3 bullet points
    - Describe key features and functionality
    - Highlight technical challenges solved
    - Mention specific technologies and how they were used
    - Include outcomes or impact when possible
    - Use strong action verbs
    
    Format as bullet points with "•" at the start of each point.
    """

    generated_text = generate_ai_response(prompt, max_tokens=350)
    return {"generated_text": generated_text}

@app.post("/api/generate/summary")
async def generate_summary(request: SummaryGenerateRequest):
    try:
        logger.info("Generating professional summary")
        
        top_skills = request.skills[:5] if request.skills else []
        skills_str = ", ".join(top_skills) if top_skills else "various technical skills"
        
        job_titles = []
        for exp in request.experience[:1]:
            if exp.get('jobtitle'):
                job_titles.append(exp['jobtitle'])
        job_title = job_titles[0] if job_titles else "professional"
        
        companies = []
        for exp in request.experience[:1]:
            if exp.get('company'):
                companies.append(exp['company'])
        company = companies[0] if companies else ""
        
        years = 0
        for exp in request.experience:
            if exp.get('startdate'):
                try:
                    if isinstance(exp['startdate'], str):
                        start_year = int(exp['startdate'][:4])
                    else:
                        start_year = exp['startdate'].year if hasattr(exp['startdate'], 'year') else 2020
                    current_year = datetime.now().year
                    exp_years = current_year - start_year
                    years = max(years, exp_years)
                except:
                    pass
        
        if years > 0:
            experience_part = f"With {years} years of experience as a {job_title}"
        else:
            experience_part = f"As a {job_title}"
        
        if company:
            experience_part += f" at {company}"
        
        prompt = f"""
        Write a natural, human-sounding resume summary in FIRST PERSON (using "I") for:

        {experience_part}.
        Skilled in {skills_str}.

        Requirements:
        - 2-3 sentences
        - Start with "I am a" or "As a"
        - Sound natural and conversational
        - Highlight skills and experience
        - End with career goals or value proposition
        - No bullet points, no emojis
        
        Example: "I am a {job_title} with {years} years of experience specializing in {skills_str.split(',')[0] if skills_str else 'my field'}. I have a proven track record of delivering results and I'm passionate about creating impactful solutions."
        """
        
        generated_text = generate_ai_response(prompt, max_tokens=200)
        generated_text = generated_text.strip()
        generated_text = generated_text.replace('"', '')
        
        logger.info("Summary generated successfully")
        return {"generated_text": generated_text}
        
    except Exception as e:
        logger.error(f"Error generating summary: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    logger.info(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)