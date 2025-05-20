# 🥋 Kumite Buddy — Final Project

**Author:** Sam Lima  
**Course:** CIS 485 - Web Development II  
**Instructor:** Mattew Conroy  

---

## 🚀 What This App Does

Kumite Buddy is a full-stack web application that helps martial artists:

- 🥊 Find and schedule sparring sessions  
- 💪 Create and browse training exercises  
- 🔐 Register/login securely  
- 🗑️ Delete sessions/exercises when needed  

---

## 🛠️ Tech Stack

- **Frontend:** Lit (Web Components)  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT Token-Based  
- **Deployment:** Render (backend) + Netlify (frontend)  
- **CI/CD:** GitHub + Netlify/Render auto-deploy  

---

## 🧪 RESTful API Entities

- **Users**  
  - Register, Login (JWT token issued)
  - Auth required for protected actions

- **Sessions**  
  - CRUD endpoints for sparring sessions
  - Fields: `title`, `location`, `date`, `time`, `style`, `level`

- **Exercises**  
  - CRUD endpoints for martial arts exercises
  - Fields: `name`, `type`, `description`, `difficulty`

---

## 🔒 Authentication

- JWT stored in `localStorage` after login  
- Token is sent in `Authorization: Bearer <token>` header  
- Routes are protected using middleware

---

## 💻 How to Run Locally

To run this project locally, first clone the repository using `git clone https://github.com/Samlima-cyber/CIS485-FINAL.git` and navigate into the project directory with `cd CIS485-FINAL`. Next, go into the backend folder with `cd backend`, run `npm install` to install dependencies, and create a `.env` file with the following contents:

```
PORT=5050  
MONGO_URI=mongodb+srv://<your-user>:<your-pass>@cluster.mongodb.net/kumite-buddy  
JWT_SECRET=yourSuperSecret
```

After that, run the backend using `npm run dev`. Now, open a new terminal tab, go into the frontend folder with `cd frontend`, run `npm install`, then start the frontend with `npm start`. The frontend should run at `http://localhost:3000` and the backend API at `http://localhost:5050`.

---

## 🌐 Live Deployment

- 🔗 Frontend: https://kumite-frontend.onrender.com
- 🔗 Backend: https://kumite-backend.onrender.com
- 🧪 Postman Collection: Included in the repo as `KumiteBuddy.postman_collection.json`

---

## ✅ Features Checklist

- [x] User registration & login  
- [x] Token-based authentication  
- [x] Full CRUD for Sessions & Exercises  
- [x] Protected routes using JWT  
- [x] Styled UI using Lit Web Components  
- [x] CI/CD deployment with GitHub + Render/Netlify  
- [x] Postman tests for all endpoints

---

## 🧠 Notes

- If you're grading this: log in or register, then navigate via the top nav bar  
- All sensitive routes are protected  
- MongoDB and Render must be up and running for full functionality
