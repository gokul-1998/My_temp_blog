```
# Download and install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# Reload shell configuration
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"

# Install the latest LTS version of Node.js
nvm install --lts
nvm use --lts

# Verify installation
node -v
npm -v
```
