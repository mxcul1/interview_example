import { GraphQLResult } from "@aws-amplify/api-graphql";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { listNotes } from "./graphql/queries";
import logo from "./logo.svg";

type Note = {
  id: string;
  name: string;
  description: string;
};

const initialFormState = { name: "", description: "" };

type ApiResponse = {
  listNotes: {
    items: Array<Note>;
    nextToken: any;
  };
};

function App() {
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = (await API.graphql({
      query: listNotes,
    })) as GraphQLResult<ApiResponse>;
    setNotes(apiData?.data?.listNotes?.items || []);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    const newNote: Note = { ...formData, id: uuid() };
    setNotes([...notes, newNote]);
    setFormData(initialFormState);
  }

  async function deleteNote(id: string) {
    const newNotesArray = notes.filter((note) => note.id !== id);

    setNotes(newNotesArray);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div className="App">
      <div id="button">
        <AmplifySignOut />
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome Macquarie Group!</h1>
        <p>Please use this note app to take notes!</p>
        
        <div className="Notes">
          <h3>Notes</h3>
          <input
            className = 'Note-input'
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Note name"
            value={formData.name}
          />
          <input
          className = 'Note-input'
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Note description"
            value={formData.description}
          />
          <button className = 'Button' onClick={createNote}>Create Note</button>
          <div style={{ marginBottom: 30 }}>
            {notes.map((note) => (
              <div key={note.id}>
                <h4>{note.name}</h4>
                <p>{note.description}</p>
                <button className = 'Button' onClick={() => deleteNote(note.id)}>Delete note</button>
              </div>
            ))}
          </div>
          <a
          className="App-link"
          href="https://drive.google.com/file/d/1iVnZN9L2SO4p-eoIfbP2Pb_vZdm8OOa6/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" Click here for resumé"}
        </a>
        </div>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
