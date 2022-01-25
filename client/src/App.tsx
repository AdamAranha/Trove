import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Landing/Login';
import Signup from './components/Landing/Signup';


function App() {

  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     console.log(urlParams.toString().split('&'));
  //     console.log(urlParams.get('code'));
  //     authUser(urlParams.get('code'));
  //   } else console.log('User not yet authorized!');


  // }, [])

  async function authUser(code: any) {
    await fetch('http://localhost:3001/server/trove/auth/', {
      method: 'GET',
      headers: { code }
    })
    // await fetch('http://localhost:3001')
  }

  return (
    <div className="App bg-slate-900 grid h-screen max-h-full">
      {/* <header className="App-header">
        For testing against my server
        <button onClick={async () => {
          const response = await fetch('https:www.adamaranha.com/server/', {
            method: 'GET'
          }).then(r => r.json());
          console.log(response);
        }}>Click Me Bitch</button>
        <button onClick={() => {
          window.location.href = 'https://www.reddit.com/api/v1/authorize?client_id=eVR6XO9MRO7sTjbt72Fn8w&response_type=code&state=RANDOM_STRING&redirect_uri=http://localhost:3000/&duration=permanent&scope=history+identity+read'
        }}>Authorize</button>
        For testing the localhost server
        <button className='border p-2 hover:text-blue-500 hover:brightness-20 rounded-md text-blue-400' onClick={async () => {
          const response = await fetch('http://localhost:3001/server/', {
            method: 'GET'
          }).then(r => r.json());
          console.log(response);
        }}>Server Test</button>
      </header> */}

      <Login showLogin={showLogin} setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      <Signup showSignup={showSignup} setShowSignup={setShowSignup} setShowLogin={setShowLogin} />

    </div>
  );
}

export default App;