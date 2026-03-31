@echo off
echo =======================================================
echo Yatra Go - Auto GitHub Deployment Script
echo =======================================================
echo.

cd /d "%~dp0"

echo [1/6] Adding files...
git add .

echo [2/6] Committing changes...
git commit -m "First upload - Auto deploy script"

echo [3/6] Setting main branch...
git branch -M main

echo [4/6] Linking GitHub repository...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/YatraGo/Yatra-Go.git

echo [5/6] Pushing to GitHub (this might open a browser for login)...
git push -u origin main
if errorlevel 1 goto error

echo [6/6] Building and deploying website...
call npm run deploy
if errorlevel 1 goto error

echo.
echo =======================================================
echo SUCCESS! Your code is pushed and the site is deploying!
echo.
echo INSTRUCTIONS TO MAKE IT LIVE:
echo 1. Go to https://github.com/YatraGo/Yatra-Go/settings/pages
echo 2. Under 'Source', select 'Deploy from a branch'
echo 3. Under 'Branch', select 'gh-pages' and click 'Save'.
echo =======================================================
pause
exit

:error
echo.
echo =======================================================
echo AN ERROR OCCURRED! See the messages above.
echo =======================================================
pause
exit
