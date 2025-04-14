import React, { useState } from 'react';

function Query2PropertiesPerAgent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3005/admin/agents/properties');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="query-component">
      <h2>Query 2: Properties Per Agent</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Agent Properties'}
      </button>
      
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Agent ID</th>
              <th>Agent Name</th>
              <th>Total Properties</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.aid}</td>
                <td>{row.agent_name}</td>
                <td>{row.total_properties}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Query2PropertiesPerAgent;