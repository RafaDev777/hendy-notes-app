// import notesData from './notesData.js';
import NoteApiServices from "./noteApiServices.js";

class noteList extends HTMLElement {
  constructor() {
    super();
    this.notes = [];
    this.apiService = new NoteApiServices("https://notes-api.dicoding.dev/v2");
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    await this.fetchNotes();
    this.renderNote();
    this.noteEventListener();
  }

  async fetchNotes() {
    try {
      this.notes = await this.apiService.getAllNotes();
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  renderNote() {
    const notesContainer = document.createElement("div");
    notesContainer.id = "notes-container";

    this.notes.forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.innerHTML = `
                <div class="note-content">
                    <h2>${note.title}</h2>
                    <p>${note.body}</p>
                </div>
            `;
      notesContainer.appendChild(noteElement);
    });

    const style = document.createElement("style");
    style.textContent = `
        #notes-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            padding: 25px;
            justify-content: space-between;
        }
        
        .note-content{
            background-color: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            width: 300px;
            height: 200px;
            color: rgba(0, 0, 0, 0.75);
            border-radius: 10px;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.65);
            padding: 25px;
            box-sizing: border-box;
        }

        .note-content:hover{
            background-color: #FF8C00;
        }
        `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(notesContainer);
  }

  addNote(title, body) {
    const newNote = {
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    this.notes.push(newNote);
    const notesContainer = this.shadowRoot.getElementById("notes-container");
    const noteElement = document.createElement("div");
    noteElement.innerHTML = `
            <div class="note-content">
                <h2>${newNote.title}</h2>
                <p>${newNote.body}</p>
            </div>
        `;
    notesContainer.appendChild(noteElement);
  }

  noteEventListener() {
    document.addEventListener("newNoteAdded", (event) => {
      const { title, body } = event.detail;
      this.addNote(title, body);
    });
  }
}

customElements.define("notes-list", noteList);
