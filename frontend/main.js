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

// 🔹 Update the content of the app
function renderComponent(tagName) {
  app.replaceChildren(document.createElement(tagName));
}

// 🔹 Add this function to highlight active nav link
function highlightActive(path) {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-route') === path);
  });
}

// 🔹 Route definitions
page('/', () => {
  console.log("📍 ROUTE: /");
  renderComponent('login-page');
  highlightActive('/');
});

page('/register', () => {
  console.log("📍 ROUTE: /register");
  renderComponent('register-page');
  highlightActive('/register');
});

page('/sessions', () => {
  console.log("📍 ROUTE: /sessions");
  renderComponent('session-list');
  highlightActive('/sessions');
});

page('/create-session', () => {
  console.log("📍 ROUTE: /create-session");
  renderComponent('create-session-form');
  highlightActive('/create-session');
});

page('/exercises', () => {
  console.log("📍 ROUTE: /exercises");
  renderComponent('exercise-list');
  highlightActive('/exercises');
});

page('/create-exercise', () => {
  console.log("📍 ROUTE: /create-exercise");
  renderComponent('create-exercise-form');
  highlightActive('/create-exercise');
});

// 🧠 Enable hashbang mode so routing works on GitHub Pages and Live Server
page();