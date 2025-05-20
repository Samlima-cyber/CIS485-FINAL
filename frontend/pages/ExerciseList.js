// frontend/pages/ExerciseList.js
import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class ExerciseList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: Arial, sans-serif;
    }
    h2 {
      text-align: center;
    }
    .exercise {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .exercise h3 {
      margin: 0 0 0.5rem;
    }
  `;

  static properties = {
    exercises: { type: Array },
    error: { type: String }
  };

  constructor() {
    super();
    this.exercises = [];
    this.error = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5050/api/exercises', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load exercises');
      this.exercises = data;
    } catch (err) {
      this.error = err.message;
    }
  }

  async deleteExercise(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this exercise?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5050/api/exercises/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to delete");
  
      // Remove from local state
      this.exercises = this.exercises.filter(ex => ex._id !== id);
    } catch (err) {
      this.error = err.message;
    }
  }  

  render() {
    return html`
      <h2>Training Exercises</h2>
      ${this.error ? html`<p style="color: white;">${this.error}</p>` : ''}
      ${this.exercises.length === 0
        ? html`<p>No exercises found.</p>`
        : this.exercises.map(
            ex => html`
              <div class="exercise">
                <h3>${ex.name}</h3>
                <p><strong>Description:</strong> ${ex.description}</p>
                <p><strong>Type:</strong> ${ex.type}</p>
                <p><strong>Level:</strong> ${ex.difficulty}</p>
                <button 
                  style="background-color: red; color: white;"
                  @click=${() => this.deleteExercise(ex._id)}
                >
                  🗑 Delete
                </button>
              </div>
            `
          )
      }
    `;
  }    
}

customElements.define('exercise-list', ExerciseList);