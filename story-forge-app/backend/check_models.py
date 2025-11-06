import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    print("--- ERROR: GOOGLE_API_KEY not found in .env file. ---")
    exit()

try:
    # Set up the Google client
    genai.configure(api_key=api_key)

    print("--- Successfully authenticated. Fetching models... ---")
    
    # Call ListModels
    for m in genai.list_models():
        # Check if the model supports the 'generateContent' method
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)

    print("-----------------------------------------------------")

except Exception as e:
    print("\n--- An Error Occurred ---")
    print(f"Failed to authenticate or list models: {e}")