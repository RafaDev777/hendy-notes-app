import notesData from './notesData.js';

class searchNote extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderSearchNote();
        this.searchEventListener();
        this.stylesCSS(); 
    }

    renderSearchNote() {
        const searchBar = document.createElement('div');
        searchBar.innerHTML = `
            <h2>Cari notes anda</h2>
            <input type="text" id="searchInput" placeholder="Masukkan kata kunci...">
        `;

        this.shadowRoot.appendChild(searchBar);
    }

    searchEventListener() {
        const searchInput = this.shadowRoot.getElementById('searchInput');

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const notesContainer = document.querySelector('notes-list').shadowRoot.getElementById('notes-container');

            notesContainer.innerHTML = ''; 
            notesData.forEach(note => {
                if (note.title.toLowerCase().includes(searchTerm) || note.body.toLowerCase().includes(searchTerm)) {
                    const noteElement = document.createElement('div');
                    noteElement.classList.add('note-content');
                    noteElement.innerHTML = `
                        <h2>${note.title}</h2>
                        <p>${note.body}</p>
                    `;
                    notesContainer.appendChild(noteElement);
                }
            });
        });
    }


    stylesCSS() {
        const style = document.createElement('style');
        style.textContent = `
        :host {
            display: block;
            max-width: 500px;
            margin: 10px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
        }
        
        h2 {
            margin-bottom: 20px;
            font-size: 24px;
            color: smokewhite;
        }
        
        #searchInput {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 16px;
            box-sizing: border-box;
            margin-bottom: 10px;
        }
        
        #searchInput:focus {
            outline: none;
            border-color: #007bff;
        }
        
        .note-content {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
            margin-bottom: 10px;
        }
        
        .note-content h2 {
            margin-bottom: 5px;
            font-size: 18px;
            color: #333;
        }
        
        .note-content p {
            font-size: 16px;
            color: #666;
        }
    `;

        this.shadowRoot.appendChild(style);
    }
}

customElements.define('search-bar', searchNote);
