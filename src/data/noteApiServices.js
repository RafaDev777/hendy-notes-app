class NoteApiServices {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async createNote(title, body) {
    const response = await fetch(`${this.apiUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await response.json();
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to create note");
    }
  }

  async getNoteById(id) {
    const response = await fetch(`${this.apiUrl}/notes/${id}`);
    const data = await response.json();
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to get note");
    }
  }

  async getAllNotes() {
    const response = await fetch(`${this.apiUrl}/notes`);
    const data = await response.json();
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to get notes");
    }
  }

  async updateNote(id, newTitle, newBody) {
    const response = await fetch(`${this.apiUrl}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, body: newBody }),
    });

    const data = await response.json();
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to update note");
    }
  }

  async deleteNote(id) {
    const response = await fetch(`${this.apiUrl}/notes/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to delete message");
    }
  }
}

export default NoteApiServices;
