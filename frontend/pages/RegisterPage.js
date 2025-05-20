import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class RegisterPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: Arial, sans-serif;
      background: #f7f7f7;
      min-height: 100vh;
    }
    form {
      max-width: 400px;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    input, button {
      padding: 0.6rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #007bff;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #0056b3;
    }
    .success {
      color: green;
      text-align: center;
    }
    .error {
      color: red;
      text-align: center;
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
      const res = await fetch('http://localhost:5050/api/users/register', {
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
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500); // Redirect to login after success
    } catch (err) {
      this.error = err.message;
    }
  }

  render() {
    return html`
      <form @submit=${this.handleRegister}>
        <h2 style="text-align: center;">Register</h2>
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

        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
        ${this.success ? html`<p class="success">✅ Registration successful! Redirecting...</p>` : ''}
      </form>
    `;
  }
}

customElements.define('register-page', RegisterPage);