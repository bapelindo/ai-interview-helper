@echo off
cd /d "%~dp0"

if not exist "node_modules" (
    echo Installing dependencies for the first time...
    npm install
)

npm start
