console.log("🔥 MAIN.JS IS WORKING!");

import { html, render } from 'https://unpkg.com/lit@2.8.0/index.js?module';
import page from 'https://unpkg.com/page/page.mjs';

import './pages/LoginPage.js';
import './pages/RegisterPage.js';
import './pages/SessionList.js';
import './pages/CreateSessionForm.js';
import './pages/ExerciseList.js';
import './pages/CreateExerciseForm.js';

const app = document.getElementById('app');

// 🔹 Add this function to highlight active nav link
function highlightActive(path) {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-route') === path);
  });
}

// 🔹 Define routes and call highlightActive after each render
page('/', () => {
  console.log("📍 ROUTE: /");
  render(html`<login-page></login-page>`, app);
  highlightActive('/');
});

page('/register', () => {
  console.log("📍 ROUTE: /register");
  render(html`<register-page></register-page>`, app);
  highlightActive('/register');
});

page('/sessions', () => {
  console.log("📍 ROUTE: /sessions");
  render(html`<session-list></session-list>`, app);
  highlightActive('/sessions');
});

page('/create-session', () => {
  console.log("📍 ROUTE: /create-session");
  render(html`<create-session></create-session>`, app);
  highlightActive('/create-session');
});

page('/exercises', () => {
  console.log("📍 ROUTE: /exercises");
  render(html`<exercise-list></exercise-list>`, app);
  highlightActive('/exercises');
});

page('/create-exercise', () => {
    console.log("📍 ROUTE: /create-exercise");
    render(html`<create-exercise></create-exercise>`, app);
    highlightActive('/create-exercise');
  });
  
// 🧠 Start routing with hashbang mode (important for local/live server)
page({ hashbang: true });