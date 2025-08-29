import React, { useEffect, useState } from 'react';

function App() {
  const [health, setHealth] = useState('');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data.message))
      .catch(() => setHealth('Error connecting to backend'));
  }, []);

  return (
    <div>
      <h1>Agency App</h1>
      <p>Backend status: {health}</p>
    </div>
  );
}

export default App;
