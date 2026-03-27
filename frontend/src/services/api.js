import { API_BASE_URL } from '../config';

export const generateExperience = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/generate/experience`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate experience');
  }
  return response.json();
};

export const generateProject = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/generate/project`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate project');
  }
  return response.json();
};

export const generateSummary = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/generate/summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate summary');
  }
  return response.json();
};