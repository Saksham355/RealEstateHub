import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Agents() {
    const [agents, setAgents] = useState([]);
    const [nextAID, setNextAID] = useState('');
    const [newAgent, setNewAgent] = useState({
        AID: '',
        Name: '',
        Contact: ''
    });

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get('http://localhost:3005/api/agents');
                setAgents(response.data);
                // Calculate next AID
                const maxAID = Math.max(...response.data.map(agent => parseInt(agent.aid)), 0);
                const nextID = (maxAID + 1).toString();
                setNextAID(nextID);
                setNewAgent(prev => ({ ...prev, AID: nextID }));
            } catch (error) {
                console.error('Error fetching agents:', error);
            }
        };
        fetchAgents();
    }, []);
  // Add new state for agent properties
  const [agentProperties, setAgentProperties] = useState({});

  // Add function to fetch properties for an agent
  const fetchAgentProperties = async (agentId) => {
      try {
          const response = await axios.get(`http://localhost:3005/form/properties/agent/${agentId}`);
          setAgentProperties(prev => ({
              ...prev,
              [agentId]: response.data
          }));
      } catch (error) {
          console.error('Error fetching agent properties:', error);
      }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3005/api/agents', newAgent);
            const response = await axios.get('http://localhost:3005/api/agents');
            setAgents(response.data);
            // Calculate next AID after successful save
            const maxAID = Math.max(...response.data.map(agent => parseInt(agent.aid)), 0);
            const nextID = (maxAID + 1).toString();
            setNextAID(nextID);
            setNewAgent({ 
                AID: nextID,
                Name: '', 
                Contact: '' 
            });
        } catch (error) {
            console.error('Error adding agent:', error);
        }
    };

    // Add new state for selected agent
    const [selectedAgent, setSelectedAgent] = useState('');

    // Add new state for average prices
    const [agentAvgPrices, setAgentAvgPrices] = useState({});

    // Add function to fetch average prices
    const fetchAgentAvgPrice = async (agentId) => {
        try {
            const response = await axios.get(`http://localhost:3005/form/properties/agent/${agentId}/avg-price`);
            setAgentAvgPrices(prev => ({
                ...prev,
                [agentId]: response.data
            }));
        } catch (error) {
            console.error('Error fetching agent average prices:', error);
        }
    };

    // Add new state for top agents and limit
    const [topAgents, setTopAgents] = useState([]);
    const [top3Agents, setTop3Agents] = useState([]);
    // Add after existing useEffect hooks
    useEffect(() => {
        fetchTop3Agents();
    }, []);

    // Add after existing fetch functions
    const fetchTop3Agents = async () => {
        try {
            const response = await axios.get('http://localhost:3005/form/agents/top-three');
            setTop3Agents(response.data);
        } catch (error) {
            console.error('Error fetching top agents:', error);
        }
    };
      
    const [limit, setLimit] = useState(5); // default limit of 5

    // Add function to fetch top agents
    const fetchTopAgents = async (limit) => {
        try {
            const response = await axios.get(`http://localhost:3005/form/agents/top/${limit}`);
            setTopAgents(response.data);
        } catch (error) {
            console.error('Error fetching top agents:', error);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Agents</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Agent ID"
                    value={newAgent.AID}
                    readOnly
                    style={{ backgroundColor: '#f0f0f0' }}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={newAgent.Name}
                    onChange={(e) => setNewAgent({...newAgent, Name: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={newAgent.Contact}
                    onChange={(e) => setNewAgent({...newAgent, Contact: e.target.value})}
                />
                <button type="submit">Add Agent</button>
            </form>

            <div className="agents-list">
                {agents.map(agent => (
                    <div key={agent.aid} className="agent-card">
                        <h3>Agent ID: {agent.aid}</h3>
                        <div className="agent-content">
                            <p>Name: {agent.name}</p>
                            <p>Contact: {agent.contact}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Properties Section */}
            <div className="properties-section">
            <div className="page-header"><h4>Agent Properties Count</h4>
                <select
                    value={selectedAgent}
                    onChange={(e) => {
                        setSelectedAgent(e.target.value);
                        if (e.target.value) {
                            fetchAgentProperties(e.target.value);
                        }
                    }}
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginBottom: '20px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                    }}
                >
                    <option value="">Select Agent</option>
                    {agents.map(agent => (
                        <option key={agent.aid} value={agent.aid}>
                            {agent.name} | {agent.aid}
                        </option>
                    ))}
                </select>
                </div>
                {selectedAgent && agentProperties[selectedAgent] && (
                    <div className="properties-list">
                        {agentProperties[selectedAgent].length === 0 ? (
                            <p>No properties found for this agent</p>
                        ) : (
                            agentProperties[selectedAgent].map(agentProperty => (
                                <div key={agentProperty.aid} className="property-card">
                                    <h3>Agent ID: {agentProperty.aid}</h3>
                                    <div className="property-content">
                                        <p>Agent Name: {agentProperty.agent_name}</p>
                                        <p>Total Properties: {agentProperty.total_properties}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
                    <div className="avg-price-section">
                        <div className="page-header"><h4>Agent Average Sold Price</h4>
                        <select
                            value={selectedAgent}
                            onChange={(e) => {
                                setSelectedAgent(e.target.value);
                                if (e.target.value) {
                                    fetchAgentAvgPrice(e.target.value);
                                }
                            }}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '20px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        >
                            <option value="">Select Agent</option>
                            {agents.map(agent => (
                                <option key={agent.aid} value={agent.aid}>
                                    {agent.name} | {agent.aid}
                                </option>
                            ))}
                        </select>
                        </div>
                        {selectedAgent && agentAvgPrices[selectedAgent] && (
                            <div className="properties-list">
                                {agentAvgPrices[selectedAgent].length === 0 ? (
                                    <p>No sales data found for this agent</p>
                                ) : (
                                    agentAvgPrices[selectedAgent].map(avgPrice => (
                                        <div key={avgPrice.aid} className="agent-card">
                                            <h3>Agent ID: {avgPrice.aid}</h3>
                                            <div className="property-content">
                                                <p>Agent Name: {avgPrice.agent_name}</p>
                                                <p>Average Sold Price: ${avgPrice.avg_sold_price ? 
                                                    Number(avgPrice.avg_sold_price).toLocaleString() : 'No sales'}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                    {/* Top Agents Section */}
                    <div className="top-agents-section">
                    <div className="page-header"><h4>Top Agents by Client Count</h4>
                       
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <input
                                type="number"
                                min="1"
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                                style={{
                                    width: '100px',
                                    padding: '8px',
                                    marginRight: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            />
                            <button
                                onClick={() => fetchTopAgents(limit)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                Fetch Top Agents
                            </button>
                        </div>
                        <div className="agents-list">
                            {topAgents.length === 0 ? (
                                <p></p>
                            ) : (
                                topAgents.map(agent => (
                                    <div key={agent.aid} className="agent-card">
                                        <h3>Agent ID: {agent.aid}</h3>
                                        <div className="agent-content">
                                            <p>Agent Name: {agent.agent_name}</p>
                                            <p>Total Clients: {agent.client_count}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="top-agents-section">
                    <div className='page-header'><h4>Top 3 Performing Agents</h4></div>
                    <div className="properties-list">
                        {top3Agents.length === 0 ? (
                            <p>No top agents data found</p>
                        ) : (
                            top3Agents.map((agent, index) => (
                                <div key={agent.aid} className="property-card">
                                    <h4>Rank #{index + 1}</h4>
                                    <div className="property-content">
                                        <p>Agent ID: {agent.aid}</p>
                                        <p>Agent Name: {agent.agent_name}</p>
                                        <p>Total Transactions: {agent.total_transactions}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
        </div>
    );
}

export default Agents;