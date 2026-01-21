# step 1

- `nano .git/hooks/pre-commit`

# step 2 : paste the below content in the file

```
#!/usr/bin/env python3

from dotenv import load_dotenv
import subprocess
import os
import google.generativeai as genai
import sys

# Get the project root directory (the script is in .git/hooks)
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
dotenv_path = os.path.join(project_root, '.env')

# Load environment variables from .env file
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path)


# Configure the Gemini API with the key from the environment variable
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    print("Error: GOOGLE_API_KEY environment variable not set.", file=sys.stderr)
    sys.exit(1)

genai.configure(api_key=API_KEY)

def get_staged_diff():
    """
    Retrieves the diff of all staged files.
    """
    # Use git to get the staged changes
    result = subprocess.run(
        ['git', 'diff', '--staged'],
        capture_output=True, text=True, check=True
    )
    return result.stdout

def get_ai_review(diff):
    """
    Sends the diff to a Gemini model for review.
    """
    if not diff.strip():
        return "No staged changes to review."

    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    You are a highly experienced and helpful code reviewer.
    Review the following code changes (in a Git diff format) and provide constructive feedback.
    Focus on potential bugs, security vulnerabilities, adherence to best practices, and overall code quality.
    If the code is good and requires no changes, respond with only this phrase: 'No feedback, code looks good.'

    Code changes to review:
    
    ```diff
    {diff}
    ```
    """
    
    try:
        response = model.generate_content(prompt)
        # Check if the response is safe and not blocked.
        if response and response.text:
            return response.text
        else:
            return "Gemini did not provide a text response, possibly due to safety concerns or an empty response."
    except Exception as e:
        return f"An error occurred while calling the Gemini API: {e}"

if __name__ == "__main__":
    try:
        # Check if the commit is being bypassed
        if os.environ.get('GIT_SKIP_HOOKS') == '1' or '--no-verify' in sys.argv:
            sys.exit(0)

        diff_content = get_staged_diff()
        
        if not diff_content:
            print("No staged changes to review. Commit allowed.")
            sys.exit(0)

        print("\n--- Requesting AI code review... ---")
        review = get_ai_review(diff_content)
        print("--- AI Review ---")
        print(review)
        print("-------------------\n")

        # Check if the AI provided any feedback
        if 'no feedback, code looks good.' in review.lower():
            print("AI has no feedback. Commit allowed.")
            sys.exit(0) # Allow the commit
        else:
            print("Commit blocked due to AI feedback.")
            print("To bypass this check and commit anyway, use:")
            print("  git commit --no-verify -m \"Your commit message\"")
            sys.exit(1) # Block the commit
        
    except subprocess.CalledProcessError as e:
        print(f"Git command failed: {e.stderr}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}", file=sys.stderr)
        sys.exit(1)

```

# step 3

- create a .env and add GOOGLE_API_KEY in it

# step 4

- `chmod +x .git/hooks/pre-commit`

# step 5

- `pip install google.generativeai`
