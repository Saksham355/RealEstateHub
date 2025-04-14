import React, { useState } from 'react';

function Query1PropertyDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3005/admin/properties/details');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="query-component">
      <h2>Query 1: Property Details with Owner and Agent</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Property Details'}
      </button>
      
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>PID</th>
              <th>Type</th>
              <th>Size</th>
              <th>Status</th>
              <th>Price</th>
              <th>Address</th>
              <th>Owner Name</th>
              <th>Agent Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.pid}</td>
                <td>{row.type}</td>
                <td>{row.size}</td>
                <td>{row.status}</td>
                <td>{row.price}</td>
                <td>{row.address}</td>
                <td>{row.owner_name}</td>
                <td>{row.agent_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Query1PropertyDetails;