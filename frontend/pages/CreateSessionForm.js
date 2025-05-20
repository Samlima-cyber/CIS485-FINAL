import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class CreateSession extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: Arial, sans-serif;
      background: #f7f7f7;
      min-height: 100vh;
    }
    form {
      max-width: 500px;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    input, select, button {
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
    title: { type: String },
    location: { type: String },
    date: { type: String },
    time: { type: String },
    style: { type: String },
    level: { type: String },
    error: { type: String },
    success: { type: Boolean }
  };

  constructor() {
    super();
    this.title = '';
    this.location = '';
    this.date = '';
    this.time = '';
    this.style = '';
    this.level = '';
    this.error = '';
    this.success = false;
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.error = '';
    this.success = false;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5050/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: this.title,
          location: this.location,
          date: this.date,
          time: this.time,
          style: this.style,
          level: this.level
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      this.success = true;
    } catch (err) {
      this.error = err.message;
    }
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <h2 style="text-align: center;">Create a New Sparring Session</h2>
        <input placeholder="Title" .value=${this.title} @input=${e => this.title = e.target.value} required />
        <input placeholder="Location" .value=${this.location} @input=${e => this.location = e.target.value} required />
        <input type="date" .value=${this.date} @input=${e => this.date = e.target.value} required />
        <input type="time" .value=${this.time} @input=${e => this.time = e.target.value} required />
        <input placeholder="Style (e.g. Muay Thai)" .value=${this.style} @input=${e => this.style = e.target.value} required />
        <select .value=${this.level} @change=${e => this.level = e.target.value} required>
          <option value="">Select Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button type="submit">Create Session</button>
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
        ${this.success ? html`<p class="success">✅ Session Created!</p>` : ''}
      </form>
    `;
  }
}

customElements.define('create-session', CreateSession);