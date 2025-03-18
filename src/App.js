// import React, { useState, useEffect } from 'react';

// function TradingApp() {
//   const [buyOrders, setBuyOrders] = useState([]);
//   const [sellOrders, setSellOrders] = useState([]);
//   const [matches, setMatches] = useState([]);
//   const [autoSimulating, setAutoSimulating] = useState(false);
//   const [connected, setConnected] = useState(false);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch('http://localhost:18080/getOrders');
//       if (!res.ok) throw new Error('Failed to fetch orders');
//       const data = await res.json();
//       setBuyOrders(data.buyOrders || []);
//       setSellOrders(data.sellOrders || []);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err.message);
//     }
//   };

//   const simulateOrders = async () => {
//     try {
//       const res = await fetch('http://localhost:18080/addRandomOrders', {
//         method: 'POST',
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       await fetchOrders();
//     } catch (err) {
//       console.error('Simulate Orders failed:', err.message);
//     }
//   };

//   const matchAllTickers = async () => {
//     const tickers = new Set();
//     buyOrders.forEach((o) => tickers.add(o.ticker));
//     sellOrders.forEach((o) => tickers.add(o.ticker));

//     for (const ticker of tickers) {
//       try {
//         const res = await fetch('http://localhost:18080/matchOrder', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ ticker }),
//         });
//         const data = await res.json();
//         if (data.matches?.length > 0) {
//           console.log(`[Match Found]`, data.matches);
//           setMatches((prev) => [...data.matches, ...prev]);
//         }
//       } catch (err) {
//         console.error("Match failed:", err.message);
//       }
//     }
//   };

//   const toggleAutoSim = async () => {
//     try {
//       const res = await fetch('http://localhost:18080/toggleAutoSim', {
//         method: 'POST',
//       });
//       const data = await res.json();
//       setAutoSimulating(data.autoSimulating);
//     } catch (err) {
//       console.error("Toggle failed:", err.message);
//     }
//   };

//   useEffect(() => {
//     if (!connected) return;
//     const interval = setInterval(fetchOrders, 3000);
//     return () => clearInterval(interval);
//   }, [connected]);

//   useEffect(() => {
//     if (!connected) return;
//     if (buyOrders.length === 0 && sellOrders.length === 0) return;
//     matchAllTickers();
//   }, [buyOrders, sellOrders, connected]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Trading Simulation</h1>

//       {!connected && (
//         <button
//           onClick={() => {
//             fetchOrders();
//             setConnected(true);
//           }}
//           className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
//         >
//           Connect to Backend 🔌
//         </button>
//       )}

//       {connected && (
//         <>
//           <button
//             onClick={async () => {
//               await fetch('http://localhost:18080/loadSampleOrders', {
//                 method: 'POST',
//               });
//               await fetchOrders();
//             }}
//             className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
//           >
//             Accept Sample Orders 📦
//           </button>

//           <div className="flex gap-4 mb-4">
//             <button onClick={simulateOrders} className="bg-blue-500 text-white px-4 py-2 rounded">
//               Simulate 10 Orders 🔄
//             </button>

//             <button
//               onClick={toggleAutoSim}
//               className={`px-4 py-2 rounded ${autoSimulating ? 'bg-red-500' : 'bg-green-500'} text-white`}
//             >
//               {autoSimulating ? 'Pause Auto Simulation ⏸️' : 'Start Auto Simulation ▶️'}
//             </button>
//           </div>
//         </>
//       )}

//       {connected && (
//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             <h2 className="text-lg font-bold mb-2">Buy Orders</h2>
//             {buyOrders.map((order, idx) => (
//               <div key={idx} className={`p-2 rounded mb-1 ${order.quantity === 0 ? 'bg-gray-300 line-through text-gray-600' : 'bg-green-100'}`}>
//                 <strong>TICK {order.ticker}</strong> — ${order.price} | Qty: {order.quantity}
//               </div>
//             ))}
//           </div>

//           <div>
//             <h2 className="text-lg font-bold mb-2">Sell Orders</h2>
//             {sellOrders.map((order, idx) => (
//               <div key={idx} className={`p-2 rounded mb-1 ${order.quantity === 0 ? 'bg-gray-300 line-through text-gray-600' : 'bg-red-100'}`}>
//                 <strong>TICK {order.ticker}</strong> — ${order.price} | Qty: {order.quantity}
//               </div>
//             ))}
//           </div>

//           <div>
//             <h2 className="text-lg font-bold mb-2">Matched Orders ✅</h2>
//             {matches.map((match, idx) => (
//               <div key={idx} className="bg-blue-100 p-2 rounded mb-1">
//                 <strong>TICK {match.ticker}</strong><br />
//                 Buy: ${match.buyPrice} | Sell: ${match.sellPrice} | Qty: {match.quantity}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TradingApp;




// import React, { useState, useEffect } from 'react';

// function TradingApp() {
//   const [buyOrders, setBuyOrders] = useState([]);
//   const [sellOrders, setSellOrders] = useState([]);
//   const [matches, setMatches] = useState([]);
//   const [autoSimulating, setAutoSimulating] = useState(false);
//   const [connected, setConnected] = useState(false);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch('http://localhost:18080/getOrders');
//       if (!res.ok) throw new Error('Failed to fetch orders');
//       const data = await res.json();
//       setBuyOrders(data.buyOrders || []);
//       setSellOrders(data.sellOrders || []);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err.message);
//     }
//   };

//   const simulateOrders = async () => {
//     try {
//       const res = await fetch('http://localhost:18080/addRandomOrders', {
//         method: 'POST',
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       await fetchOrders();
//     } catch (err) {
//       console.error('Simulate Orders failed:', err.message);
//     }
//   };

//   const matchAllTickers = async () => {
//     const tickers = new Set();
//     buyOrders.forEach((o) => tickers.add(o.ticker));
//     sellOrders.forEach((o) => tickers.add(o.ticker));

//     for (const ticker of tickers) {
//       const res = await fetch('http://localhost:18080/matchOrder', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ticker }),
//       });
//       const data = await res.json();
//       if (data.matches?.length > 0) {
//         setMatches((prev) => [...data.matches, ...prev]);
//       }
//     }
//   };

//   const toggleAutoSim = async () => {
//     try {
//       const res = await fetch('http://localhost:18080/toggleAutoSim', {
//         method: 'POST',
//       });
//       const data = await res.json();
//       setAutoSimulating(data.autoSimulating);
//     } catch (err) {
//       console.error("Toggle failed:", err.message);
//     }
//   };

//   useEffect(() => {
//     if (!connected) return;
//     const interval = setInterval(fetchOrders, 3000);
//     return () => clearInterval(interval);
//   }, [connected]);

//   useEffect(() => {
//     if (!connected || buyOrders.length === 0 && sellOrders.length === 0) return;
//     matchAllTickers();
//   }, [buyOrders, sellOrders, connected]);

//   const renderTable = (orders, type) => (
//     <table className="w-full text-sm border border-gray-300">
//       <thead className="bg-gray-200">
//         <tr>
//           <th className="px-2 py-1">Ticker</th>
//           <th className="px-2 py-1">Price</th>
//           <th className="px-2 py-1">Quantity</th>
//         </tr>
//       </thead>
//       <tbody>
//         {orders.map((order, idx) => (
//           <tr key={idx} className={order.quantity === 0 ? 'text-gray-400' : ''}>
//             <td className="px-2 py-1">{order.ticker}</td>
//             <td className="px-2 py-1">${order.price}</td>
//             <td className="px-2 py-1">{order.quantity}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Trading Simulation</h1>

//       {!connected && (
//         <button
//           onClick={() => {
//             fetchOrders();
//             setConnected(true);
//           }}
//           className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
//         >
//           Connect to Backend 🔌
//         </button>
//       )}

//       {connected && (
//         <>
//           <button
//             onClick={async () => {
//               await fetch('http://localhost:18080/loadSampleOrders', { method: 'POST' });
//               await fetchOrders();
//             }}
//             className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
//           >
//             Accept Sample Orders 📦
//           </button>

//           <div className="flex gap-4 mb-4">
//             <button onClick={simulateOrders} className="bg-blue-500 text-white px-4 py-2 rounded">
//               Simulate 10 Orders 🔄
//             </button>

//             <button
//               onClick={toggleAutoSim}
//               className={`px-4 py-2 rounded ${autoSimulating ? 'bg-red-500' : 'bg-green-500'} text-white`}
//             >
//               {autoSimulating ? 'Pause Auto Simulation ⏸️' : 'Start Auto Simulation ▶️'}
//             </button>
//           </div>

//           <div className="grid grid-cols-3 gap-6">
//             <div>
//               <h2 className="text-lg font-bold mb-2">Buy Orders</h2>
//               {renderTable(buyOrders, 'Buy')}
//             </div>
//             <div>
//               <h2 className="text-lg font-bold mb-2">Sell Orders</h2>
//               {renderTable(sellOrders, 'Sell')}
//             </div>
//             <div>
//               <h2 className="text-lg font-bold mb-2">Matched Orders ✅</h2>
//               <table className="w-full text-sm border border-gray-300">
//                 <thead className="bg-gray-200">
//                   <tr>
//                     <th className="px-2 py-1">Ticker</th>
//                     <th className="px-2 py-1">Buy Price</th>
//                     <th className="px-2 py-1">Sell Price</th>
//                     <th className="px-2 py-1">Quantity</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {matches.map((match, idx) => (
//                     <tr key={idx}>
//                       <td className="px-2 py-1">{match.ticker}</td>
//                       <td className="px-2 py-1">${match.buyPrice}</td>
//                       <td className="px-2 py-1">${match.sellPrice}</td>
//                       <td className="px-2 py-1">{match.quantity}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default TradingApp;


import React, { useState, useEffect } from 'react';
import './App.css'; // optional if you want to add custom styles here

function TradingApp() {
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [matches, setMatches] = useState([]);
  const [autoSimulating, setAutoSimulating] = useState(false);
  const [connected, setConnected] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:18080/getOrders');
      const data = await res.json();
      setBuyOrders(data.buyOrders || []);
      setSellOrders(data.sellOrders || []);
    } catch (err) {
      console.error("Fetch Orders Error:", err.message);
    }
  };

  const simulateOrders = async () => {
    await fetch('http://localhost:18080/addRandomOrders', { method: 'POST' });
    await fetchOrders();
  };

  const matchAllTickers = async () => {
    const tickers = new Set();
    buyOrders.forEach((o) => tickers.add(o.ticker));
    sellOrders.forEach((o) => tickers.add(o.ticker));

    for (const ticker of tickers) {
      const res = await fetch('http://localhost:18080/matchOrder', {
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
    const res = await fetch('http://localhost:18080/toggleAutoSim', { method: 'POST' });
    const data = await res.json();
    setAutoSimulating(data.autoSimulating);
  };

  useEffect(() => {
    if (!connected) return;
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, [connected]);

  useEffect(() => {
    if (!connected) return;
    if (buyOrders.length || sellOrders.length) matchAllTickers();
  }, [buyOrders, sellOrders]);

  return (
    <div className="app-container">
      <h1 className="app-title">📈 Trading Simulation</h1>

      <div className="button-group">
        {!connected && (
          <button onClick={() => { fetchOrders(); setConnected(true); }}>
            Connect to Backend 🔌
          </button>
        )}

        {connected && (
          <>
            <button onClick={async () => {
              await fetch('http://localhost:18080/loadSampleOrders', { method: 'POST' });
              await fetchOrders();
            }}>
              Accept Sample Orders 📦
            </button>

            <button onClick={simulateOrders}>
              Simulate 10 Orders 🔄
            </button>

            <button
              onClick={toggleAutoSim}
              className={autoSimulating ? 'pause-button' : 'start-button'}
            >
              {autoSimulating ? 'Pause Simulation ⏸️' : 'Start Simulation ▶️'}
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
    </div>
  );
}

export default TradingApp;
