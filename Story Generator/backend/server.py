"""
Simple Story Generator Server using Gemini API
Generates stories based on keywords input
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Google AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Create generation config
generation_config = {
    "temperature": 0.8,
    "top_p": 0.9,
    "top_k": 40,
    "max_output_tokens": 2048,
}

# Configure safety settings
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

# Create AI model
model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings
)

# Create Flask app
app = Flask(__name__)
CORS(app)

@app.route('/generate_story', methods=['POST'])
def generate_story():
    """Generate a story based on keywords"""
    try:
        data = request.json
        if not data or 'keywords' not in data:
            return jsonify({
                'success': False,
                'error': 'Keywords are required'
            }), 400

        keywords = data['keywords'].strip()
        if not keywords:
            return jsonify({
                'success': False,
                'error': 'Keywords cannot be empty'
            }), 400

        # Create the prompt for story generation
        prompt = f"""
        Create an engaging and creative story (approximately 300-500 words) using the following keywords: {keywords}

        The story should:
        - Be suitable for all ages
        - Have a clear beginning, middle, and end
        - Be imaginative and entertaining
        - Naturally incorporate all the provided keywords
        - Be well-written with good narrative flow
        - Avoid any harmful or sensitive content
        - Avoid markdown format.Return only plain text without any asterisk formatting.

        Please write a complete story now:
        """

        # Generate the story
        response = model.generate_content(prompt)
        story = response.text

        return jsonify({
            'success': True,
            'story': story,
            'keywords_used': keywords
        })

    except Exception as e:
        print(f"Error generating story: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to generate story. Please try again.'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'gemini_configured': bool(os.getenv("GOOGLE_API_KEY"))
    })

if __name__ == '__main__':
    # Check if API key is configured
    if not os.getenv("GOOGLE_API_KEY"):
        print("Warning: GOOGLE_API_KEY environment variable not set!")
        print("Please create a .env file with your Gemini API key")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
