import React, { useState } from 'react';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const simulateTransactions = async () => {
    setLoading(true);
    try {
      await fetch('http://localhost:18080/addRandomOrders', { method: 'POST' });

      const matchResponse = await fetch('http://localhost:18080/matchOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: Math.floor(Math.random() * 1024) }),
      });

      const result = await matchResponse.json();
      setMatches(result.matches || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="header">📈 Real-time Stock Trading</h1>
      <button className="simulate-btn" onClick={simulateTransactions} disabled={loading}>
        {loading ? '🚀 Simulating...' : 'Simulate Transactions'}
      </button>

      <div className="results-card">
        <h2>Matched Orders</h2>
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <div className="match-item" key={index}>
              <span>💰 <strong>Price:</strong> ${match.price}</span>
              <span>🔢 <strong>Quantity:</strong> {match.quantity}</span>
            </div>
          ))
        ) : (
          <p className="no-matches">No matches yet. Run a simulation!</p>
        )}
      </div>
    </div>
  );
}

export default App;
