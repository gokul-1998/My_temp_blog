- `sudo nano ~/.bashrc`
- paste the below command in the file
```
gai_commit() {
  local GEMINI_CLI="$HOME/gemini.sh"
  if ! git diff --cached --quiet; then
    echo "🔍 Generating commit message using Gemini..."

    # Get staged diff
    local diff_text
    diff_text=$(git diff --cached)

    # Prompt Gemini for commit message
    local prompt
    prompt="Generate a concise, single-line conventional commit message under 15 words for the following git diff. Do not add any extra description or bullet points. Example: 'feat: add user authentication'. Here is the diff:\n\n$diff_text"

    local commit_msg
    commit_msg=$(echo -e "$prompt" | "$GEMINI_CLI")

    echo "✅ Suggested commit message:"
    echo "$commit_msg"
    echo

    # Allow override
    read -p "Press Enter to use this message, or type a custom one: " custom_msg

    if [[ -n "$custom_msg" ]]; then
      commit_msg="$custom_msg"
    fi

    git commit --no-verify -m "$commit_msg"
  else
    echo "⚠️ No staged changes to commit."
  fi
}
```
- `source ~/.bashrc`
- `nano $HOME/gemini.sh`
```bash gemini.sh (add your api key)
#!/bin/bash

# Simple CLI wrapper for Google Gemini Pro API
# Requires: GCP API Key with access to Gemini Pro

API_KEY="your api key"

prompt=$(cat)

# Create the JSON payload using jq to properly escape the prompt content
json_payload=$(jq -n --arg prompt "$prompt" \
'{
  "contents": [{
    "parts": [{
      "text": $prompt
    }]
  }]
}')

response=$(curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$json_payload"
)

echo "$response" >&2  # Print raw response for debugging

# Parse the response with jq
echo "$response" | jq -r '.candidates[0].content.parts[0].text' 2>/dev/null



```
- `chmod +x ~/gemini.sh`
- `sudo apt update
sudo apt install jq`
- `jq --version`

