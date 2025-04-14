import React, { useState } from 'react';

function Query6ActiveContracts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3005/admin/contracts/active');
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
      <h2>Query 6: Active Contracts</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Contract ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Type</th>
              <th>Owner Name</th>
              <th>Client Name</th>
              <th>Agent Name</th>
              <th>Property Type</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.contract_id}</td>
                <td>{new Date(row.start_date).toLocaleDateString()}</td>
                <td>{new Date(row.end_date).toLocaleDateString()}</td>
                <td>{row.type}</td>
                <td>{row.owner_name}</td>
                <td>{row.client_name}</td>
                <td>{row.agent_name}</td>
                <td>{row.property_type}</td>
                <td>{row.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Query6ActiveContracts;