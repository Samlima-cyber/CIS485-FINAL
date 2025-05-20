// frontend/pages/SessionList.js
import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class SessionList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: Arial, sans-serif;
    }
    h2 {
      text-align: center;
    }
    .session {
      border: 1px solid #ccc;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
    }
    .session h3 {
      margin: 0 0 0.5rem;
    }
    button {
      background: crimson;
      color: white;
      padding: 0.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `;

  static properties = {
    sessions: { type: Array },
    error: { type: String }
  };

  constructor() {
    super();
    this.sessions = [];
    this.error = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchSessions();
  }

  async fetchSessions() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5050/api/sessions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load sessions');
      this.sessions = data;
    } catch (err) {
      this.error = err.message;
    }
  }

  async deleteSession(id) {
    if (!confirm('Are you sure you want to delete this session?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5050/api/sessions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete session');
      this.sessions = this.sessions.filter(s => s._id !== id);
    } catch (err) {
      this.error = err.message;
    }
  }

  render() {
    return html`
      <h2>Available Sparring Sessions</h2>
      ${this.error ? html`<p style="color:white;">${this.error}</p>` : ''}
      ${this.sessions.length === 0
        ? html`<p>No sessions available.</p>`
        : this.sessions.map(
            s => html`
              <div class="session">
                <h3>${s.title}</h3>
                <p><strong>Location:</strong> ${s.location}</p>
                <p><strong>Date:</strong> ${s.date}</p>
                <p><strong>Time:</strong> ${s.time}</p>
                <p><strong>Style:</strong> ${s.style}</p>
                <p><strong>Level:</strong> ${s.level}</p>
                <button @click=${() => this.deleteSession(s._id)}>🗑 Delete</button>
              </div>
            `
          )
      }
    `;
  }
}

customElements.define('session-list', SessionList);