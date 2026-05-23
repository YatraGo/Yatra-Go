@echo off
echo ==========================================
echo  Yatra Go - Automated Git & Deploy Script
echo ==========================================
echo.

echo 1. Configuring Git user credentials...
git config user.name "Yatra Go"
git config user.email "sales.yatrago@gmai.com"
echo Done.
echo.

echo 2. Staging all modified files...
git add .
echo Done.
echo.

echo 3. Committing changes...
git -c core.safecrlf=false commit -m "Deploy update - navigation and scroll fixes"
echo.

echo 4. Renaming branch and pushing to remote main...
git branch -M main
git push -u origin main
echo.

echo 5. Building and deploying to GitHub Pages...
npm run deploy
echo.

echo ==========================================
echo  Deployment Process Completed!
echo ==========================================
pause
