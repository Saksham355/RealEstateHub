import React, { useState } from 'react';

function Query14UnresolvedCases() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3005/admin/legal-cases/unresolved');
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
      <h2>Query 14: Unresolved Legal Cases</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Legal Case ID</th>
              <th>Issue</th>
              <th>Case Status</th>
              <th>Property ID</th>
              <th>Property Type</th>
              <th>Size</th>
              <th>Price</th>
              <th>Address</th>
              <th>Owner ID</th>
              <th>Owner Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.lcid}</td>
                <td>{row.issue}</td>
                <td>{row.case_status}</td>
                <td>{row.pid}</td>
                <td>{row.property_type}</td>
                <td>{row.size}</td>
                <td>${row.price}</td>
                <td>{row.address}</td>
                <td>{row.oid}</td>
                <td>{row.owner_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Query14UnresolvedCases;