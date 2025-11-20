
import os
from dotenv import load_dotenv

import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from fastapi import FastAPI, Response
#SHOW RESPONSE TIMING.

# load environment variables from .env file
load_dotenv()

##### Test block to make sure API key is loaded #####
print("--- LOADING .ENV FILE ---")
api_key = os.getenv("GOOGLE_API_KEY")
if api_key:
    # This will print the last 4 characters of your key
    # It proves the .env file was read.
    print(f"API Key Found: ...{api_key[-4:]}")
else:
    print("!!! API KEY NOT FOUND IN ENVIRONMENT !!!")
print("-------------------------")
##### Test end #####

# import google genai
from langchain_google_genai import ChatGoogleGenerativeAI

# --- Pydantic Models for Request Body ---
class Character(BaseModel):
    name: str
    personality: str
    gender: str

class StoryRequest(BaseModel):
    characters: List[Character]
    genre: str
    environment: str
    prompt: str
    previous_story: Optional[str] = ""

# --- FastAPI App Initialization ---
app = FastAPI()

# --- CORS Configuration ---
from fastapi.middleware.cors import CORSMiddleware
import re

# pulls allowed origins from render environment variables
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173"
).split(",")

# 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ALLOWED_ORIGINS if o.strip()],
    allow_origin_regex=r"https://.*\.vercel\.app",  # allows any Vercel preview URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load Context Data ---
with open("context.json", "r") as f:
    context_data = json.load(f)

# --- AI Model Initialization ---
# CHANGE 2: Instantiate ChatGoogleGenerativeAI instead of Ollama
# It will automatically find the GOOGLE_API_KEY from the environment.
# "gemini-1.5-flash" is a great choice for speed and capability.
llm = ChatGoogleGenerativeAI (
    model="gemini-2.0-flash-lite",
    temperature=0.7,  # Adjust creativity
    google_api_key=api_key
)
# api health endpoints 

@app.get("/")
def root():
    return {"status": "ok", "message": "Use POST /generate_story"}

@app.get("/api/health")
def health():
    return {"ok": True}

@app.get("/favicon.ico")
def favicon():
    return Response(status_code=204)
# --- API Endpoint ---
@app.post("/generate_story")
def generate_story(request: StoryRequest):
    """
    Receives story context and generates the next part of the story.
    """
    # 1. Construct the character descriptions string
    character_list_str = "\n".join([f"- {c.name} {c.personality}: {c.gender}: " for c in request.characters])

    # 2. Get context from the JSON file
    genre_context = context_data["genres"].get(request.genre, "")
    env_context = context_data["environments"].get(request.environment, "")
    rules = context_data["rules"]

    # 3. Build the full prompt for the LLM
    # This structured prompt guides the AI to produce a coherent story segment.
    full_prompt = f"""
{rules['introduction']}

**Genre:** {request.genre}
{genre_context}

**Environment:** {request.environment}
{env_context}

**Characters:**
{character_list_str}

**Rules:**
- {rules['character_handling']}
- {rules['continuity']}
- {rules['style']}

---
**Previous Story:**
"{request.previous_story if request.previous_story else 'The story has not yet begun.'}"

---
**User Prompt:**
"{request.prompt}"

Continue the story now:
"""

    print("--- GENERATING PROMPT ---")
    print(full_prompt)
    print("-------------------------")

    # 4. Run the LLM to generate the story continuation
    try:
        # CHANGE 3: The response object is an AIMessage,
        # so we access the text with the '.content' attribute.
        response = llm.invoke(full_prompt)
        return {"story": response.content}
    except Exception as e:
        print(f"Error invoking Google model: {e}")
        return {"error": "Failed to generate story from model."}, 500

# To run the server, use the command in your terminal:
# uvicorn main:app --reload