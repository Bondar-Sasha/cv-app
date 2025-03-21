<!-- # Calculator Application

## Table of Contents

- [Task](#task)
- [How to run the app](#how-to-run-the-app)
- [Apps routes](#apps-routes)
- [Database snapshot](#database-snapshot)
- [Application stack](#application-stack)

## Task

Source: https://docs.google.com/document/d/1ARKFyS4bzCqgR-s0eeWwyiTtFtoq1-gaXvzhDKYJ5Rk/edit?tab=t.0

## How to Run the App

### Deploy

To access the app via GitHub Pages, simply visit the following link:  
https://clever-to-do-list-608f2.web.app/

### On your computer
    
1) Clone the repository:
   ```bash
   git clone https://github.com/Bondar-Sasha/Clever-to-do-list
2) Navigate to the project directory:
   ```bash
   cd Clever-to-do-list
3) Install dependencies:
   ```bash
   npm ci
4) Run the app:
   ```bash
   npm run dev


## Apps routes

- `/`: Home page.
- `/tasks/:taskId"`: Particular task page.
- `/edit_task/:date/:taskId`: Page for editing your task.
- `/create_task/:date`: Page for creating task.
- `/auth/registration`: Register page.
- `/auth/login`: Login page.

## Database snapshot

Collection name: task

- `title` string
- `description` string
- `isDone` boolean
- `date` timestamp
- `user` string
- `(id)` environment provides by itself


## Application stack

- `react` library
- `mui` for ui
- `firebase` backend platform
- `formik && yup` for forms handling
- `react-router-dom` app routing
- `react-toastify` user notification
- `react-icons` for getting prepared icons
- `tailwind` css handling -->
