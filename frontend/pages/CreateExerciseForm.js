// frontend/pages/CreateExerciseForm.js
import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class CreateExerciseForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: Arial, sans-serif;
    }

    h2 {
      text-align: center;
    }

    form {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      background: #f9f9f9;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    input, select, textarea, button {
      padding: 0.5rem;
      font-size: 1rem;
    }

    button {
      cursor: pointer;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }

    button:hover {
      background: #0056b3;
    }

    p.success {
      color: green;
      text-align: center;
    }

    p.error {
      color: red;
      text-align: center;
    }
  `;

  static properties = {
    name: { type: String },
    type: { type: String },
    description: { type: String },
    level: { type: String },
    error: { type: String },
    success: { type: Boolean }
  };

  constructor() {
    super();
    this.name = '';
    this.type = '';
    this.description = '';
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
      const res = await fetch('http://localhost:5050/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: this.name,
          type: this.type,
          description: this.description,
          difficulty: this.level
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      this.success = true;

      // Reset fields
      this.name = '';
      this.type = '';
      this.description = '';
      this.level = '';
    } catch (err) {
      this.error = err.message;
    }
  }

  render() {
    return html`
      <h2>Create New Exercise</h2>
      <form @submit=${this.handleSubmit}>
        <input placeholder="Exercise Name" .value=${this.name} @input=${e => this.name = e.target.value} required />
        <input placeholder="Type (e.g. striking, conditioning)" .value=${this.type} @input=${e => this.type = e.target.value} required />
        <textarea placeholder="Description" .value=${this.description} @input=${e => this.description = e.target.value} required></textarea>
        <select .value=${this.level} @change=${e => this.level = e.target.value} required>
          <option value="">Select Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button type="submit">Create Exercise</button>
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
        ${this.success ? html`<p class="success">✅ Exercise Created!</p>` : ''}
      </form>
    `;
  }
}

customElements.define('create-exercise', CreateExerciseForm);