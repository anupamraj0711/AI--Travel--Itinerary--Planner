@echo off
echo Starting AI Travel Planner...
start cmd /k "cd server && npm start"
start cmd /k "npm run dev"
echo Backend and Frontend are starting. Please wait for the URLs to appear.
pause
