import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    fetch('/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Failed to load message'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full‑Stack Demo</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;