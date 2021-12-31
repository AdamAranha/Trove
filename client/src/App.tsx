import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={async () => {
          const response = await fetch('https://adamaranha.com/server', {
            method: 'GET'
          }).then(r => r.json());
          console.log(response);
        }}>Click Me Bitch</button>
      </header>
    </div>
  );
}

export default App;