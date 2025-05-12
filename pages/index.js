
import React, { useState } from 'react';

export default function GirlyAI() {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ topic })
    });
    const data = await response.json();
    setOutput(data.result);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>Girly AI ✨</h1>
      <p>Enter a soft topic and let the magic happen.</p>
      <input 
        style={{ padding: 10, width: '80%' }} 
        value={topic} 
        onChange={e => setTopic(e.target.value)} 
        placeholder="e.g. soft life, self-love" 
      />
      <br /><br />
      <button onClick={generateContent} disabled={loading} style={{ padding: 10 }}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      <div style={{ marginTop: 30, fontSize: 18 }}>
        {output && <p>"{output}"</p>}
      </div>
    </div>
  );
}
