import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome Macquarie Group!
        </p>
        <a
          className="App-link"
          href="https://drive.google.com/file/d/1iVnZN9L2SO4p-eoIfbP2Pb_vZdm8OOa6/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here for resume
        </a>
      </header>
    </div>
  );
}

export default App;
