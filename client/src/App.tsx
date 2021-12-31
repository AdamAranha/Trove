import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {

  useEffect(() => {
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      console.log(urlParams.get('code'));
      authUser(urlParams.get('code'));
    } else console.log('User not yet authorized!')
  }, [])

  async function authUser(code: any) {
    await fetch('http://localhost:3001/server/trove/auth/', {
      method: 'GET',
      headers: { code }
    })
    // await fetch('http://localhost:3001')
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={async () => {
          const response = await fetch('https:www.adamaranha.com/server/', {
            method: 'GET'
          }).then(r => r.json());
          console.log(response);
        }}>Click Me Bitch</button>
        <button onClick={() => {
          window.location.href = 'https://www.reddit.com/api/v1/authorize?client_id=eVR6XO9MRO7sTjbt72Fn8w&response_type=code&state=RANDOM_STRING&redirect_uri=http://localhost:3000/&duration=temporary&scope=history+identity+read'
        }}>Authorize</button>
        <button onClick={async () => {
          const response = await fetch('http://localhost:3001/server/', {
            method: 'GET'
          }).then(r => r.json());
          console.log(response);
        }}>Server Test</button>
      </header>

    </div>
  );
}

export default App;