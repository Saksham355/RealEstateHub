import React, { useState } from 'react';

function Query9AcceptedBids() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3005/admin/bids/accepted');
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

  return (
    <div className="query-component">
      <h2>Query 9: Accepted Bids</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Client Name</th>
              <th>Contact</th>
              <th>Property ID</th>
              <th>Property Type</th>
              <th>Size</th>
              <th>Price</th>
              <th>Address</th>
              <th>Bid Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.cid}</td>
                <td>{row.client_name}</td>
                <td>{row.contact}</td>
                <td>{row.pid}</td>
                <td>{row.property_type}</td>
                <td>{row.size}</td>
                <td>${row.price}</td>
                <td>{row.address}</td>
                <td>${row.bid_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Query9AcceptedBids;