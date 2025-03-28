# Curriculum Vitae team

## Table of Contents

- [Task](#task)
- [How to run the app](#how-to-run-the-app)
- [Apps routes](#apps-routes)

## Task

Source: https://curriculum-vitae-project.notion.site/b5c2402e649a44629178f52a8679eff9?v=66b53609862b4aeaa1134e4c6d74af6c

## How to Run the App

### Deploy

To access the app via GitHub Pages, simply visit the following link:  
https://cv-app-8b43a.web.app/

### On your computer
    
1) Clone the repository:
   ```bash
   git clone https://github.com/Bondar-Sasha/cv-app
2) Navigate to the project directory:
   ```bash
   cd cv-app
3) Install dependencies:
   ```bash
   npm ci
4) Run the app:
   ```bash
   npm run dev


## Apps routes

- `/users`: Home page.
- `/users/${userId}/profile`: User's profile page.
- `/users/${userId}/skills`: User's skills page.
- `/users/${userId}/languages`: User's languages page.
- `/projects`: Page with projects available to be added to CV.
- `/cvs`: Page with user's CVs.
- `/cvs/${cvId}/details`: CV's details page.
- `/cvs/${cvId}/skills`: Page with user's skills in CV.
- `/cvs/${cvId}/projects`: Page with projects in CV.
- `/cvs/${cvId}/preview`: Preview CV page.
- `/skills`: Page with user's skills.
- `/languages`: Page with languages, which user knows.
- `/settings`: Settings page.

- `/auth/signup`: Register page.
- `/auth/login`: Login page.
- `/forgot-password`: Page what you can restore your password in.
- `/reset-password`: Page what you can reset your password in.
