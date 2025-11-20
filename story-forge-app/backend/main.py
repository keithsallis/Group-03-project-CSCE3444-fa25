import os
from dotenv import load_dotenv
import json
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# --- Pydantic Models ---
class Character(BaseModel):
    name: str
    personality: str
    gender: str

class StoryRequest(BaseModel):
    characters: List[Character]
    genre: str
    environment: str
    style: Optional[str] = "Default" 
    prompt: str
    previous_story: Optional[str] = ""

app = FastAPI()

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ALLOWED_ORIGINS if o.strip()],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("context.json", "r") as f:
    context_data = json.load(f)

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-lite",
    temperature=0.7,
    google_api_key=api_key
)

@app.post("/generate_story")
def generate_story(request: StoryRequest):
    # --- FIX START ---
    # Old version: f"- {c.name} {c.personality}: {c.gender}: " 
    # New version: Explicitly separates Name and Personality labels
    character_list_str = "\n".join(
        [f"- Name: {c.name} | Gender: {c.gender} | Personality/Traits: {c.personality}" for c in request.characters]
    )
    # --- FIX END ---

    genre_context = context_data["genres"].get(request.genre, "")
    env_context = context_data["environments"].get(request.environment, "")
    style_context = context_data["styles"].get(request.style, context_data["styles"]["Default"])
    rules = context_data["rules"]

    full_prompt = f"""
{rules['introduction']}

**Genre:** {request.genre}
{genre_context}

**Environment:** {request.environment}
{env_context}

**Writer Style (TONE):** {request.style}
{style_context}

**Characters:**
{character_list_str}

**Rules:**
- {rules['character_handling']}
- {rules['continuity']}
- {rules['style']}
- IMPORTANT: Do not treat personality traits (e.g. "Smart") as the character's surname. Use only the name provided in the 'Name' field.

---
**Previous Story:**
"{request.previous_story if request.previous_story else 'The story has not yet begun.'}"

---
**User Prompt:**
"{request.prompt}"

Continue the story now:
"""
    try:
        response = llm.invoke(full_prompt)
        return {"story": response.content}
    except Exception as e:
        return {"error": "Failed to generate story."}, 500