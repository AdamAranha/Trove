import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      console.log('The code is: ' + urlParams.get('code'))
      console.log('The state is: ' + urlParams.get('state'))
      console.log(typeof urlParams.get('code'));
      sendHelp(urlParams.get('code'));
    } else console.log('User not yet authorized');
  }, [])

  function sendHelp(returnCode) {
    fetch('/api/code', {
      method: 'GET',
      headers: {
        code: returnCode
      }
    })
  }

  async function testFunc() {
    const response = await fetch('/api/test')
      .then(r => r.json());
    console.log(response.data.children);
    setPosts(response.data.children);
  }

  async function getCredentials() {
    const response = await fetch('/api/credentials')
      .then(r => r.json());
    console.log(response);
  }

  return (

    <div className="App">
      {
        posts ? posts.map((post) => {
          return (
            <div key={`${post.data.author}-${post.data.created}`}>
              <a href={post.data.url} target='_blank' rel='noreferrer'>
                <h3>{post.data.title}</h3>
              </a>
            </div>
          )
        }) :
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <button onClick={testFunc}>Click Me to Get Started</button>
            <a href='https://www.reddit.com/api/v1/authorize?client_id=eVR6XO9MRO7sTjbt72Fn8w&response_type=code&state=RANDOM_STRING&redirect_uri=http://localhost:3000/&duration=permanent&scope=history+identity+read'>Authorize Here</a>
          </header>
      }
    </div>
  );
}

export default App;
