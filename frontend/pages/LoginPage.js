// frontend/pages/LoginPage.js
import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';
import page from 'https://unpkg.com/page/page.mjs';

class LoginPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: Arial, sans-serif;
    }
    form {
      max-width: 400px;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: #f5f5f5;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    input, button {
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    button {
      background: black;
      color: white;
      cursor: pointer;
      font-weight: bold;
    }
    .error {
      color: red;
      font-weight: bold;
    }
    .success {
      color: green;
      font-weight: bold;
    }
  `;

  static properties = {
    email: { type: String },
    password: { type: String },
    error: { type: String },
    success: { type: Boolean }
  };

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.error = '';
    this.success = false;
  }

  async handleLogin(e) {
    e.preventDefault();
    this.error = '';
    this.success = false;

    try {
      const res = await fetch('http://localhost:5050/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      this.success = true;

      setTimeout(() => page('/sessions'), 1200);
    } catch (err) {
      this.error = err.message;
    }
  }

  render() {
    return html`
      <h2 style="text-align: center;">Login</h2>
      <form @submit=${this.handleLogin}>
        <input
          type="email"
          placeholder="Email"
          .value=${this.email}
          @input=${e => this.email = e.target.value}
          required
        />
        <input
          type="password"
          placeholder="Password"
          .value=${this.password}
          @input=${e => this.password = e.target.value}
          required
        />
        <button type="submit">Log In</button>
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
        ${this.success ? html`<p class="success">✅ Logged in! Redirecting...</p>` : ''}
      </form>
    `;
  }
}

customElements.define('login-page', LoginPage);