import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post('/api/generate', { prompt });
      setResult(response.data.text);
    } catch (error) {
      setResult('Error generating content. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>OmniForge AI Content Creator</h1>
      <textarea
        rows={6}
        style={{ width: '100%', padding: 10, fontSize: 16 }}
        placeholder="Enter your content prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{ marginTop: 10, padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}
      >
        {loading ? 'Generating...' : 'Generate Content'}
      </button>
      {result && (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            background: '#f4f4f4',
            padding: 10,
            marginTop: 20,
            borderRadius: 4,
            minHeight: 100,
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}
