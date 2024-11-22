@echo off
echo Running npm install with --legacy-peer-deps
npm install --legacy-peer-deps
if %errorlevel% neq 0 exit /b %errorlevel%
