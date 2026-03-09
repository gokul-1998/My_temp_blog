
```

Invoke-WebRequest -Uri "https://nodejs.org/dist/v22.13.1/node-v22.13.1-win-x64.zip" -OutFile "$env:USERPROFILE\Downloads\node.zip"

Expand-Archive -Path "$env:USERPROFILE\Downloads\node.zip" -DestinationPath "$env:USERPROFILE\nodejs" -Force

$env:Path = "$env:USERPROFILE\nodejs\node-v22.13.1-win-x64;$env:Path"; node --version; npm --version

[Environment]::SetEnvironmentVariable("Path", "$env:USERPROFILE\nodejs\node-v22.13.1-win-x64;" + [Environment]::GetEnvironmentVariable("Path", "User"), "User")


npm create vite@latest my-project

$env:Path = "$env:USERPROFILE\nodejs\node-v22.13.1-win-x64;$env:Path"


$env:Path = "$env:USERPROFILE\nodejs\node-v22.13.1-win-x64;$env:Path"; npm create vite@latest my-project -- --template react
```
