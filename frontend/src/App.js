import React, { useEffect, useState } from 'react';
import API_URL from './config';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/test`)
      .then(response => response.json())
      .then(data => setData(data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Frontend Connected!</h1>
      <p>Backend Response: {data}</p>
    </div>
  );
}

export default App;
