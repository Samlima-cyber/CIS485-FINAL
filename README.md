# 🥋 Kumite Buddy — Final Project

**Author:** Sam Lima  
**Course:** CIS 485 - Web Development II  
**Instructor:** Matthew Conroy  
**Submission Date:** May 19, 2025  

---

## 🚀 What This App Does

Kumite Buddy is a full-stack martial arts training platform built for sparring enthusiasts. It allows users to:

- 🥊 Find and schedule sparring sessions
- 💪 Create and browse training exercises
- 🔐 Register/login securely
- 🗑️ Delete sessions/exercises when needed

---

## 🛠️ Tech Stack

| Layer       | Tools/Tech                            |
|-------------|----------------------------------------|
| Frontend    | Lit (Web Components), Vanilla JS       |
| Backend     | Node.js, Express                       |
| Database    | MongoDB Atlas                          |
| Auth        | JSON Web Tokens (JWT)                  |
| Deployment  | Render (backend) + Netlify or Local (frontend) |
| CI/CD       | GitHub integrated auto-deploy          |

---

## 📁 Project Structure
kumite-buddy/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── index.html
│ ├── main.js
│ ├── pages/
│ ├── package.json
│ └── bs-config.json

---

## 🌍 Live Demo

- **Frontend:** [kumite-frontend.netlify.app](https://kumite-frontend.netlify.app/)  
- **Backend:** [kumite-backend.onrender.com](https://kumite-backend.onrender.com/)

---

## 💻 How to Run Locally

### ⚙️ Backend Setup
### 1. Clone the repo:
```bash
git clone https://github.com/Samlima-cyber/CIS485-FINAL.git
cd CIS485-FINAL
1. Open a terminal and go to the backend folder:

   ```bash
   cd backend
   npm install
Create a .env file using this structure:
PORT=5050
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

Start the backend server:
npm run dev

🖥️ Frontend Setup
Open another terminal and go to the frontend folder:
cd frontend
npm install
npm start
Open your browser and visit:
http://localhost:3000
