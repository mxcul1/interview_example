import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api-graphql";

const initialFormState = { name: "", description: "" };
type ApiResponse = {
  listNotes: {
    items: any;
    nextToken: any;
  };
};
function App() {
  const [notes, setNotes] = useState([] as any);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = (await API.graphql({
      query: listNotes,
    })) as GraphQLResult<ApiResponse>;
    setNotes(apiData?.data?.listNotes);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    setNotes([...notes, formData]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }: { id: number }) {
    const newNotesArray = notes.filter((note: any) => note.id !== id);

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
        <p>Welcome Macquarie Group!</p>
        <a
          className="App-link"
          href="https://drive.google.com/file/d/1iVnZN9L2SO4p-eoIfbP2Pb_vZdm8OOa6/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" Click here for resumé"}
        </a>
        <div className = "Notes">
        {/* <h1>My Notes App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <button onClick={createNote}>Create Note</button> */}
        {/* <div style={{marginBottom: 30}}>
        {
          notes.map((note:any) => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note)}>Delete note</button>
            </div>
          ))
        }
      </div> */}
      </div>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
