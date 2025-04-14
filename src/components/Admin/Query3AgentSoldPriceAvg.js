import React, { useState } from 'react';

function Query3AgentSoldPriceAvg() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3005/admin/agents/sold-price-avg');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(`Failed to fetch data: ${error.message}`);
    }
    setLoading(false);
  };

  const formatPrice = (price) => {
    return price ? `$${Number(price).toFixed(2)}` : '$0.00';
  };

  return (
    <div className="query-component">
      <h2>Query 3: Average Price of Properties Sold by Agents</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Agent ID</th>
              <th>Agent Name</th>
              <th>Average Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.aid}</td>
                <td>{row.agent_name}</td>
                <td>{formatPrice(row.avg_sold_price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Query3AgentSoldPriceAvg;