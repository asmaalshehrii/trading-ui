import React, { useState, useEffect } from 'react';
import './App.css';
import BASE_URL from './config';


function TradingApp() {
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [matches, setMatches] = useState([]);
  const [autoSimulating, setAutoSimulating] = useState(false);
  const [connected, setConnected] = useState(false);

  const fetchOrders = async () => {
    try {
      // const res = await fetch('http://localhost:18080/getOrders');
      const res = await fetch(`${BASE_URL}/getOrders`);
      const data = await res.json();
      setBuyOrders(data.buyOrders || []);
      setSellOrders(data.sellOrders || []);
    } catch (err) {
      console.error("Fetch Orders Error:", err.message);
    }
  };

  const simulateOrders = async () => {
    await fetch(`${BASE_URL}/addRandomOrders`, { method: 'POST' });
    // await fetch('http://localhost:18080/addRandomOrders', { method: 'POST' });
    await fetchOrders();
  };
 

  const matchAllTickers = async () => {
    const tickers = new Set();
    buyOrders.forEach((o) => tickers.add(o.ticker));
    sellOrders.forEach((o) => tickers.add(o.ticker));

    for (const ticker of tickers) {
      const res = await fetch(`${BASE_URL}/matchOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker }),
      });
      const data = await res.json();
      if (data.matches?.length > 0) {
        setMatches((prev) => [...data.matches, ...prev]);
      }
    }
  };

  const toggleAutoSim = async () => {
    const res = await fetch(`${BASE_URL}/toggleAutoSim`, { method: 'POST' });
    // const res = await fetch('http://localhost:18080/toggleAutoSim', { method: 'POST' });
    const data = await res.json();
    setAutoSimulating(data.autoSimulating);
  };

  useEffect(() => {
    if (!connected) return;
  
    const interval = setInterval(() => {
      (async () => {
        await fetchOrders();
  
        const res = await fetch(`${BASE_URL}/getMatches`);
        // const res = await fetch('http://localhost:18080/getMatches');
        
        const data = await res.json();
        if (data.matches?.length > 0) {
          setMatches(data.matches);
        }
      })();
    }, 3000);
  
    return () => clearInterval(interval);
  }, [connected]);
  
  
  useEffect(() => {
    if (!connected) return;
    if (buyOrders.length || sellOrders.length) matchAllTickers();
  }, [buyOrders, sellOrders]);

  return (
    <div className="app-container">
      <h1 className="app-title">📈 Stock Match Engine</h1>
      <p className="subheading">
  Simulating live stock transactions and matching orders in real time.
</p>


{connected && (
  <>
    <p className="note">
      Note: QTY fields update dynamically based on live order matching.
    </p>
    <p className="sub-note">
      Order matching might take a few seconds depending on system load.
    </p>
  </>
)}



      <div className="button-group">
        {!connected && (
          <button
          className="connect-button"
          onClick={() => { fetchOrders(); setConnected(true); }}
        >
          Start Engine 🔌 🚀
        </button>
        
        )}

        {connected && (
          <>
            {/* <button onClick={async () => {
              await fetch('http://localhost:18080/loadSampleOrders', { method: 'POST' });
              await fetchOrders();
            }}>
              Accept Sample Orders 📦
            </button>

            <button onClick={simulateOrders}>
              Simulate 10 Orders 🔄
            </button> */}

            <button
              onClick={toggleAutoSim}
              className={autoSimulating ? 'pause-button' : 'start-button'}
            >
              {autoSimulating ? 'Stop Accepting Trading Orders ⏹️' : 'Start Accepting Trading Orders ▶️'}
            </button>

            <button
  className="reset-button"
  onClick={async () => {
    try {
      const res = await fetch(`${BASE_URL}/reset`, { method: 'POST' });
      // const res = await fetch( 'http://localhost:18080/reset', { method: 'POST' });
     
      const data = await res.json();
      console.log("Reset:", data.status);
      // Optionally re-fetch fresh data
      await fetchOrders();
      setMatches([]);
    } catch (err) {
      console.error("Reset failed:", err.message);
    }
  }}
>
  Reset Engine ♻️
</button>


            
          </>
        )}
      </div>

      {connected && (
        <div className="orders-grid">
          {/* Buy Orders */}
          <div className="orders-card">
            <h2 className="buy-title">Buy Orders</h2>
            <table>
              <thead>
                <tr><th>Ticker</th><th>Price</th><th>Qty</th></tr>
              </thead>
              <tbody>
                {buyOrders.map((o, idx) => (
                  <tr key={idx}>
                    <td>{o.ticker}</td>
                    <td>${o.price}</td>
                    <td>{o.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sell Orders */}
          <div className="orders-card">
            <h2 className="sell-title">Sell Orders</h2>
            <table>
              <thead>
                <tr><th>Ticker</th><th>Price</th><th>Qty</th></tr>
              </thead>
              <tbody>
                {sellOrders.map((o, idx) => (
                  <tr key={idx}>
                    <td>{o.ticker}</td>
                    <td>${o.price}</td>
                    <td>{o.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Matched Orders */}
          <div className="orders-card">
            <h2 className="match-title">Matched Orders ✅</h2>
            <table>
              <thead>
                <tr><th>Ticker</th><th>Buy $</th><th>Sell $</th><th>Qty</th></tr>
              </thead>
              <tbody>
                {matches.map((m, idx) => (
                  <tr key={idx}>
                    <td>{m.ticker}</td>
                    <td>${m.buyPrice}</td>
                    <td>${m.sellPrice}</td>
                    <td>{m.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      )}
      <footer className="app-footer">
  Built by <a href="https://github.com/asmaalshehrii" target="_blank" rel="noopener noreferrer">Asma Alshehri</a> 💻
</footer>

    </div>
  );
}

export default TradingApp;
