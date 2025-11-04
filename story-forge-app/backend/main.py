import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# LangChain components to integrate with Ollama
from langchain_community.llms import Ollama

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
# Allows the React frontend (running on localhost:5173) to communicate with the backend
origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load Context Data ---
with open("context.json", "r") as f:
    context_data = json.load(f)

# --- AI Model Initialization ---
# This initializes the connection to the local Ollama model.
# Make sure Ollama is running with 'ollama run llama3'
llm = Ollama(model="gemma:2b")

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
        response = llm.invoke(full_prompt)
        return {"story": response}
    except Exception as e:
        print(f"Error invoking Ollama: {e}")
        return {"error": "Failed to generate story from model."}, 500

# To run the server, use the command in your terminal:
# uvicorn main:app --reload