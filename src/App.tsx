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

const initialFormState = { name: "", description: "" };
type ApiResponse = {
  data: {
    listNotes: Array<any>
  }
}
function App() {
  const [notes, setNotes] = useState( [] as any);
  const [formData, setFormData] = useState(initialFormState);

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  // async function fetchNotes() {
  //   const apiData: ApiResponse = await API.graphql({ query: listNotes }) as ApiResponse;
  //   console.log(apiData)
  //   setNotes(apiData.data.listNotes.items);
  //   // setNotes(apiData)
  // }

  // async function createNote() {
  //   if (!formData.name || !formData.description) return;
  //   await API.graphql({ query: createNoteMutation, variables: { input: formData } });
  //   setNotes([ ...notes, formData ]);
  //   setFormData(initialFormState);
  // }

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
      </header>
    </div>
  );
}

export default withAuthenticator(App);
