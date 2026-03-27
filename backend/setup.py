from setuptools import setup, find_packages

setup(
    name="resume-builder-backend",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "fastapi==0.104.1",
        "uvicorn[standard]==0.24.0",
        "python-dotenv==1.0.0",
        "groq==0.4.2",
        "pydantic==2.5.0",
        "pydantic-settings==2.1.0",
    ],
)