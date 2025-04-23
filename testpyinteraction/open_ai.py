import requests
import json
import openai
from dotenv import load_dotenv
import os

load_dotenv()

def chat(question):
# Set your OpenAI API key
    openai.api_key = os.getenv("OPENAI_API_KEY")
    MODEL = "gpt-4o-mini"
    API_URL = "https://api.openai.com/v1/chat/completions"

#"https://api.openai.com/v1/chat/completions"

# Interactive loop
#print("Welcome to the AI assistant. Ask anything or type 'exit' to quit.")
#while True:
   
    prompt = "take this list and tell me if it is a healthy: "
    chatinput = prompt + question
    print(question)
#if question.lower() == "exit":
        #break

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}"

    }

    data = {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": "You are a helpful assistant. Answer my questions."},
                {"role": "user", "content": chatinput}
            ]
    }

    # Record the time before sending the request


    try:
            response = requests.post(API_URL, headers=headers, data=json.dumps(data))
            

            response.raise_for_status()
            completion = response.json()

            ai_response = completion['choices'][0]['message']['content']
            usage = completion.get('usage', {})
            prompt_tokens = usage.get('prompt_tokens', 0)
            completion_tokens = usage.get('completion_tokens', 0)
            total_tokens = usage.get('total_tokens', 0)

        # Print retrun response
            print("AI Assistant: " + ai_response)
            print(f"Tokens Used - Prompt: {prompt_tokens}, Completion: {completion_tokens}, Total: {total_tokens}")
            #return (ai_response)
            

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
print("Goodbye!")


