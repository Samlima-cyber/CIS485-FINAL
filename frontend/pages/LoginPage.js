import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class LoginPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      min-height: 100vh;
    }
    h2 {
      text-align: center;
      color: #333;
    }
    form {
      max-width: 400px;
      margin: auto;
      background: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    input, button {
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .logout {
      text-align: center;
      margin-top: 2rem;
    }
  `;

  static properties = {
    email: { type: String },
    password: { type: String },
    error: { type: String },
    token: { type: String }
  };

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.error = '';
    this.token = localStorage.getItem('token') || '';
  }

  async handleLogin(e) {
    e.preventDefault();
    this.error = '';

    try {
      const res = await fetch('http://localhost:5050/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      this.token = data.token;
      console.log("✅ Login successful, token saved:", data.token);
      window.location.hash = '#!/sessions';
    } catch (err) {
      this.error = err.message;
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.token = '';
    this.email = '';
    this.password = '';
    window.location.hash = '#!/';
  }

  render() {
    if (this.token) {
      return html`
        <div class="logout">
          <p>You are already logged in.</p>
          <button @click=${this.handleLogout}>🚪 Log Out</button>
        </div>
      `;
    }

    return html`
      <h2>Login</h2>
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
        ${this.error ? html`<p style="color: red;">${this.error}</p>` : ''}
      </form>
    `;
  }
}

console.log("🧭 LoginPage mounted");
customElements.define('login-page', LoginPage);