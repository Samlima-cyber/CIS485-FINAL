import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';
import page from 'https://unpkg.com/page/page.mjs';

class RegisterPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: Arial, sans-serif;
      background: #f5f5f5;
    }
    form {
      max-width: 400px;
      margin: auto;
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    h2 {
      text-align: center;
    }
    input, button {
      padding: 0.6rem;
      font-size: 1rem;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    button:hover {
      background: #0056b3;
    }
    .message {
      text-align: center;
      font-size: 0.95rem;
    }
    .success {
      color: green;
    }
    .error {
      color: red;
    }
  `;

  static properties = {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    error: { type: String },
    success: { type: Boolean }
  };

  constructor() {
    super();
    this.username = '';
    this.email = '';
    this.password = '';
    this.error = '';
    this.success = false;
  }

  async handleRegister(e) {
    e.preventDefault();
    this.error = '';
    this.success = false;

    try {
      const res = await fetch('https://kumite-backend.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      this.success = true;
      setTimeout(() => page('/'), 1200); // ✅ Redirect to login page
    } catch (err) {
      this.error = err.message;
    }
  }

  render() {
    return html`
      <form @submit=${this.handleRegister}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          .value=${this.username}
          @input=${e => this.username = e.target.value}
          required
        />

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

        <button type="submit">Register</button>

        ${this.error ? html`<p class="message error">❌ ${this.error}</p>` : ''}
        ${this.success ? html`<p class="message success">✅ Registered! Redirecting...</p>` : ''}
      </form>
    `;
  }
}

customElements.define('register-page', RegisterPage);