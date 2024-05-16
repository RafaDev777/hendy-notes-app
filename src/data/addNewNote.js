class addNewNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.renderNewNote();
    this.newNoteAdded();
  }

  renderNewNote() {
    const form = document.createElement("form");
    form.innerHTML = `
            <h2>Tambahkan notes baru</h2>
            <label for="title">Judul:</label><br>
            <input type="text" id="title" name="title" required><br><br>
            <label for="body">Isi:</label><br>
            <textarea id="body" name="body" rows="4" cols="50" required></textarea><br><br>
            <button type="submit">Add Notes</button>
        `;

    const style = document.createElement("style");
    style.textContent = `
        :host {
            display: block;
            max-width: 500px;
            margin: 10px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }
        
        h2 {
            margin-bottom: 20px;
            font-size: 24px;
            color: white;
            text-allign:center;
        }
        
        input[type="text"],
        textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 16px;
            box-sizing: border-box;
            margin-bottom: 10px;
        }
        
        textarea {
            resize: vertical;
            min-height: 150px;
        }
        
        button[type="submit"] {
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            background-color: navy;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        button[type="submit"]:hover {
            background-color: #FF8C00;
            color:black;
        }
         
            
        `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(form);
  }

  newNoteAdded() {
    const form = this.shadowRoot.querySelector("form");
    const titleInput = form.querySelector("#title");
    const bodyInput = form.querySelector("#body");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.checkValidity()) {
        const formData = new FormData(form);
        const title = formData.get("title");
        const body = formData.get("body");
        const eventToAddNote = new CustomEvent("newNoteAdded", {
          detail: { title, body },
        });
        document.dispatchEvent(eventToAddNote);
        form.reset();
      }
    });

    titleInput.addEventListener("input", () => {
      if (!titleInput.validity.valid) {
        titleInput.setCustomValidity("Wajib untuk diisi");
      } else {
        titleInput.setCustomValidity("");
      }
    });

    bodyInput.addEventListener("input", () => {
      if (!bodyInput.validity.valid) {
        bodyInput.setCustomValidity("Minimal diisi dengan 1 karakter");
      } else {
        bodyInput.setCustomValidity("");
      }
    });
  }
}
customElements.define("add-new-note", addNewNote);
