import React, { useState } from 'react';

function Query7LegalCases() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3005/admin/properties/legal-cases');
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
      <h2>Query 7: Properties with Legal Cases</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Property ID</th>
              <th>Type</th>
              <th>Size</th>
              <th>Price</th>
              <th>Address</th>
              <th>Issue</th>
              <th>Case Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.pid}</td>
                <td>{row.type}</td>
                <td>{row.size}</td>
                <td>${row.price}</td>
                <td>{row.address}</td>
                <td>{row.issue}</td>
                <td>{row.case_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Query7LegalCases;