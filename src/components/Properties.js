import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newProperty, setNewProperty] = useState({
        PID: '',
        Type: '',
        Size: '',
        Status: '',
        Price: '',
        Address: '',
        OID: '',
        AID: ''
    });

    // Fetch properties
    const [owners, setOwners] = useState([]);
    const [agents, setAgents] = useState([]);
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3005/form/properties');
                console.log('Properties data:', response.data);
                setProperties(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setError('Failed to fetch properties');
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
        const fetchOwnersAndAgents = async () => {
            try {
                const ownersResponse = await axios.get('http://localhost:3005/api/owners');
                const agentsResponse = await axios.get('http://localhost:3005/api/agents');
                setOwners(ownersResponse.data);
                setAgents(agentsResponse.data);
            } catch (error) {
                console.error('Error fetching owners and agents:', error);
            }
        };
        fetchOwnersAndAgents();
    }, []);

    // Add new property
    // Add new state for pid error
    const [pidError, setpidError] = useState('');
    const [totalBidsAmount, setTotalBidsAmount] = useState({});
    const [selectedTotalBidPropertyId, setSelectedTotalBidPropertyId] = useState('');

    // Add after existing fetch functions
    const fetchTotalBidsAmount = async (propertyId) => {
        try {
            const response = await axios.get(`http://localhost:3005/form/bids/total/property/${propertyId}`);
            setTotalBidsAmount(prev => ({
                ...prev,
                [propertyId]: response.data
            }));
        } catch (error) {
            console.error('Error fetching total bids amount:', error);
        }
    };

    // Add pid validation function
    const validatepid = (pid) => {
        

        const isDuplicate = properties.some(property =>  String(property.pid) ===  String(pid));

        if (isDuplicate) {
            setpidError('This Property ID already exists');
            console.log('pid error:', 'This Property ID already exists');
            return false;
        }
        else {setpidError('');
            return true;
        }
    };

// Add new state for legal cases
const [legalCaseProperties, setLegalCaseProperties] = useState([]);

// Add function to fetch legal cases
const fetchLegalCases = async () => {
    try {
        const response = await axios.get('http://localhost:3005/form/properties/legal-cases');
        setLegalCaseProperties(response.data);
    } catch (error) {
        console.error('Error fetching legal cases:', error);
    }
};

// Add after existing state declarations
const [statusBids, setStatusBids] = useState({});
const [selectedStatus, setSelectedStatus] = useState('');

// Add after existing fetch functions
const fetchBidsByStatus = async (status) => {
    try {
        const response = await axios.get(`http://localhost:3005/form/bids/status/${status}`);
        setStatusBids(prev => ({
            ...prev,
            [status]: response.data
        }));
    } catch (error) {
        console.error('Error fetching bids by status:', error);
    }
};


// Add after existing state declarations
const [matchingProperties, setMatchingProperties] = useState({});
const [selectedPropertyType, setSelectedPropertyType] = useState('');

// Add after existing fetch functions
const fetchMatchingProperties = async (propertyType) => {
    try {
        const response = await axios.get(`http://localhost:3005/form/properties/matching/${propertyType}`);
        setMatchingProperties(prev => ({
            ...prev,
            [propertyType]: response.data
        }));
    } catch (error) {
        console.error('Error fetching matching properties:', error);
    }
};

const [selectedBidPropertyId, setSelectedBidPropertyId] = useState('');

// Add after existing useEffect hooks
const [acceptedBids, setAcceptedBids] = useState([]);

// Add after existing useEffect hooks
useEffect(() => {
    fetchAcceptedBids();
}, []);

// Add after existing fetch functions
const fetchAcceptedBids = async () => {
    try {
        const response = await axios.get('http://localhost:3005/form/bids/accepted');
        setAcceptedBids(response.data);
    } catch (error) {
        console.error('Error fetching accepted bids:', error);
    }
};
const [unresolvedCases, setUnresolvedCases] = useState([]);

// Add after existing useEffect hooks
useEffect(() => {
    fetchUnresolvedCases();
}, []);

// Add after existing fetch functions
const fetchUnresolvedCases = async () => {
    try {
        const response = await axios.get('http://localhost:3005/form/legal-cases/unresolved');
        setUnresolvedCases(response.data);
    } catch (error) {
        console.error('Error fetching unresolved legal cases:', error);
    }
};

    
const [propertyBids, setPropertyBids] = useState({});
// Add after existing fetch functions
const fetchPropertyBids = async (propertyId) => {
    try {
        const response = await axios.get(`http://localhost:3005/form/bids/property/${propertyId}`);
        setPropertyBids(prev => ({
            ...prev,
            [propertyId]: response.data
        }));
    } catch (error) {
        console.error('Error fetching property bids:', error);
    }
};

// Add useEffect to fetch legal cases when component mounts
useEffect(() => {
    fetchLegalCases();
}, []);

    // Modify handleSubmit to include validation
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatepid(newProperty.PID)) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3005/api/properties', newProperty);
            console.log('Response:', response.data);
            const propertiesResponse = await axios.get('http://localhost:3005/form/properties');
            setProperties(propertiesResponse.data);
            // Clear form
            setNewProperty({
                PID: '',
                Type: '',
                Size: '',
                Status: '',
                Price: '',
                Address: '',
                OID: '',
                AID: ''
            });
        } catch (error) {
            console.error('Error details:', error);
            if (error.response) {
                // Server responded with an error
                console.error('Server error:', error.response.data);
            } else if (error.request) {
                // Request was made but no response
                console.error('No response from server. Is it running?');
            }
            alert('Failed to add property. Please check if the server is running.');
        }
    };

    // Add this function before the return statement
    const handleDelete = async (pid) => {
        try {
            await axios.delete(`http://localhost:3005/api/properties/${pid}`);
            const response = await axios.get('http://localhost:3005/api/properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    // Add new state for transactions
    const [propertyTransactions, setPropertyTransactions] = useState({});
    const [selectedPropertyId, setSelectedPropertyId] = useState('');

    // Add function to fetch transactions
    const fetchPropertyTransactions = async (propertyId) => {
        try {
            const response = await axios.get(`http://localhost:3005/form/transactions/property/${propertyId}`);
            setPropertyTransactions(prev => ({
                ...prev,
                [propertyId]: response.data
            }));
        } catch (error) {
            console.error('Error fetching property transactions:', error);
        }
    };

    // Add new state for contracts
        const [propertyContracts, setPropertyContracts] = useState({});
        const [selectedContractPropertyId, setSelectedContractPropertyId] = useState('');
    
        // Add function to fetch contracts
        const fetchPropertyContracts = async (propertyId) => {
            try {
                const response = await axios.get(`http://localhost:3005/form/contracts/property/${propertyId}`);
                setPropertyContracts(prev => ({
                    ...prev,
                    [propertyId]: response.data
                }));
            } catch (error) {
                console.error('Error fetching property contracts:', error);
            }
        };
    

    return (
        <div>
             <div className="page-header">
            <h2>Properties</h2>
            </div>
            {error && <div style={{color: 'red'}}>{error}</div>}
            {loading ? (
                <div>Loading properties...</div>
            ) : (
                <>
                    {/* Add Property Form */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Property ID"
                            value={newProperty.PID}
                            onChange={(e) => {
                                setNewProperty({...newProperty, PID: e.target.value});
                                validatepid(e.target.value);
                            }}
                        />
                         {pidError && <span style={{color: 'red', fontSize: '0.8em', display: 'block'}}>{pidError}</span>}
                        <input
                            type="text"
                            placeholder="Type"
                            value={newProperty.Type}
                            onChange={(e) => setNewProperty({...newProperty, Type: e.target.value})}
                        />
                        <input
                            type="number"
                            placeholder="Size"
                            value={newProperty.Size}
                            onChange={(e) => setNewProperty({...newProperty, Size: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="Status"
                            value={newProperty.Status}
                            onChange={(e) => setNewProperty({...newProperty, Status: e.target.value})}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProperty.Price}
                            onChange={(e) => setNewProperty({...newProperty, Price: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={newProperty.Address}
                            onChange={(e) => setNewProperty({...newProperty, Address: e.target.value})}
                        />
                        
                                    <select
                                        value={newProperty.OID}
                                        onChange={(e) => setNewProperty({...newProperty, OID: e.target.value})}
                                    >
                                        <option value="">Select Owner</option>
                                        {owners.map(owner => (
                                            <option key={owner.oid} value={owner.oid}>
                                                {owner.name} | {owner.oid}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={newProperty.AID}
                                        onChange={(e) => setNewProperty({...newProperty, AID: e.target.value})}
                                        
                                    >
                                        <option value="">Select Agent</option>
                                        {agents.map(agent => (
                                            <option key={agent.aid} value={agent.aid}>
                                                {agent.name} | {agent.aid}
                                            </option>
                                        ))}
                                    </select>
                        <button
                            type="submit"
                            disabled={pidError || !newProperty.PID}
                            style={{
                                backgroundColor: pidError || !newProperty.PID ? '#ccc' : '#4CAF50',
                                color: pidError || !newProperty.PID ? '#666' : 'white',
                                cursor: pidError || !newProperty.PID ? 'not-allowed' : 'pointer',
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '4px',
                                marginTop: '10px'
                            }}
                            title={pidError ? pidError : (!newProperty.PID ? 'Enter a PID to enable' : '')}
                        >
                            Add Property
                        </button>
                    </form>

                    {/* Properties List */}
                    <div className="properties-list">
                        {properties.length === 0 ? (
                            <p>No properties found</p>
                        ) : (
                            properties.map(property => (
                                <div key={property.pid} className="property-card">
                                    <h3>Property ID: {property.pid}</h3>
                                    <div className="property-content">
                                        <p>Type: {property.type}</p>
                                        <p>Size: {property.size}</p>
                                        <p>Status: {property.status}</p>
                                        <p>Price: ${property.price}</p>
                                        <p>Address: {property.address}</p>
                                        <p>Owner: {property.owner_name}</p>
                                        <p>Agent: {property.agent_name}</p>
                                        <button onClick={() => handleDelete(property.pid)}>Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="page-header">
                <h4>Property Transactions</h4>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter Property ID"
                        value={selectedPropertyId}
                        onChange={(e) => setSelectedPropertyId(e.target.value)}
                        style={{
                            width: '200px',
                            padding: '8px',
                            marginRight: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                    <button
                        onClick={() => fetchPropertyTransactions(selectedPropertyId)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        Fetch Transactions
                    </button>
                </div>

                {selectedPropertyId && propertyTransactions[selectedPropertyId] && (
                    <div className="pwroperties-list">
                        {propertyTransactions[selectedPropertyId].length === 0 ? (
                            <p>No transactions found for this property</p>
                        ) : (
                            propertyTransactions[selectedPropertyId].map(transaction => (
                                <div key={transaction.tid} className="property-card">
                                    <h4>Transaction ID: {transaction.tid}</h4>
                                    <div className="property-content">
                                        <p>Client Name: {transaction.client_name}</p>
                                        <p>Property ID: {transaction.pid}</p>
                                        <p>Type: {transaction.type}</p>
                                        <p>Size: {transaction.size}</p>
                                        <p>Price: ${transaction.price}</p>
                                        <p>Address: {transaction.address}</p>
                                        <p>Transaction Status: {transaction.transaction_status}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <div className="contracts-section">
            <div className='page-header'> <h4>Property Contracts</h4></div>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Enter Property ID"
                            value={selectedContractPropertyId}
                            onChange={(e) => setSelectedContractPropertyId(e.target.value)}
                            style={{
                                width: '200px',
                                padding: '8px',
                                marginRight: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                        <button
                            onClick={() => fetchPropertyContracts(selectedContractPropertyId)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            Fetch Contracts
                        </button>
                    </div>
    
                    {selectedContractPropertyId && propertyContracts[selectedContractPropertyId] && (
                        <div className="pwroperties-list">
                            {propertyContracts[selectedContractPropertyId].length === 0 ? (
                                <p>No contracts found for this property</p>
                            ) : (
                                propertyContracts[selectedContractPropertyId].map(contract => (
                                    <div key={contract.contract_id} className="property-card">
                                        <h4>Contract ID: {contract.contract_id}</h4>
                                        <div className="property-content">
                                            <p>Start Date: {new Date(contract.start_date).toLocaleDateString()}</p>
                                            <p>End Date: {new Date(contract.end_date).toLocaleDateString()}</p>
                                            <p>Contract Type: {contract.type}</p>
                                            <p>Owner ID: {contract.oid}</p>
                                            <p>Owner Name: {contract.owner_name}</p>
                                            <p>Client ID: {contract.cid}</p>
                                            <p>Client Name: {contract.client_name}</p>
                                            <p>Agent ID: {contract.aid}</p>
                                            <p>Agent Name: {contract.agent_name}</p>
                                            <p>Property ID: {contract.pid}</p>
                                            <p>Property Type: {contract.property_type}</p>
                                            <p>Address: {contract.address}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <div className="legal-cases-section">
           <div className='page-header'> <h4>Properties with Legal Cases</h4></div>
            <div className="properties-list">
                {legalCaseProperties.length === 0 ? (
                    <p>No properties with legal cases found</p>
                ) : (
                    legalCaseProperties.map(property => (
                        <div key={property.pid} className="property-card">
                            <h4>Property ID: {property.pid}</h4>
                            <div className="property-content">
                                <p>Type: {property.type}</p>
                                <p>Size: {property.size}</p>
                                <p>Price: ${property.price}</p>
                                <p>Address: {property.address}</p>
                                <p>Legal Issue: {property.issue}</p>
                                <p>Case Status: {property.case_status}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        <div className="bids-section">
                    <div className='page-header'><h4>Property Bids Information</h4></div>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Enter Property ID"
                            value={selectedBidPropertyId}
                            onChange={(e) => setSelectedBidPropertyId(e.target.value)}
                            style={{
                                width: '200px',
                                padding: '8px',
                                marginRight: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                        <button
                            onClick={() => fetchPropertyBids(selectedBidPropertyId)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            Fetch Bids
                        </button>
                    </div>

                    {selectedBidPropertyId && propertyBids[selectedBidPropertyId] && (
                        <div className="properties-list">
                            {propertyBids[selectedBidPropertyId].length === 0 ? (
                                <p>No bid information found for this property</p>
                            ) : (
                                propertyBids[selectedBidPropertyId].map(property => (
                                    <div key={property.pid} className="property-card">
                                        <h4>Property ID: {property.pid}</h4>
                                        <div className="property-content">
                                            <p>Type: {property.type}</p>
                                            <p>Size: {property.size}</p>
                                            <p>Price: ${property.price}</p>
                                            <p>Address: {property.address}</p>
                                            <p>Total Bids: {property.total_bids}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                </>
            )}
                    <div className="accepted-bids-section">
                        <div className='page-header'><h4>Accepted Bids</h4></div>
                        <div className="properties-list">
                            {acceptedBids.length === 0 ? (
                                <p>No accepted bids found</p>
                            ) : (
                                acceptedBids.map(bid => (
                                    <div key={`${bid.cid}-${bid.pid}`} className="property-card">
                                        <h4>Client ID: {bid.cid}</h4>
                                        <div className="property-content">
                                            <p>Client Name: {bid.client_name}</p>
                                            <p>Contact: {bid.contact}</p>
                                            <p>Property ID: {bid.pid}</p>
                                            <p>Property Type: {bid.property_type}</p>
                                            <p>Size: {bid.size}</p>
                                            <p>Price: ${bid.price}</p>
                                            <p>Address: {bid.address}</p>
                                            <p>Bid Amount: ${bid.bid_amount}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className="total-bids-section">
                    <div className='page-header'><h4>Total Bids Amount by Property</h4></div>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Enter Property ID"
                            value={selectedTotalBidPropertyId}
                            onChange={(e) => setSelectedTotalBidPropertyId(e.target.value)}
                            style={{
                                width: '200px',
                                padding: '8px',
                                marginRight: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                        <button
                            onClick={() => fetchTotalBidsAmount(selectedTotalBidPropertyId)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            Fetch Total Bids
                        </button>
                    </div>

                    {selectedTotalBidPropertyId && totalBidsAmount[selectedTotalBidPropertyId] && (
                        <div className="properties-list">
                            {totalBidsAmount[selectedTotalBidPropertyId].length === 0 ? (
                                <p>No bid amount information found for this property</p>
                            ) : (
                                totalBidsAmount[selectedTotalBidPropertyId].map(property => (
                                    <div key={property.pid} className="property-card">
                                        <h4>Property ID: {property.pid}</h4>
                                        <div className="property-content">
                                            <p>Type: {property.property_type}</p>
                                            <p>Size: {property.size}</p>
                                            <p>Price: ${property.price}</p>
                                            <p>Address: {property.address}</p>
                                            <p>Total Bid Amount: ${property.total_bid_amount}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <div className="matching-properties-section">
                    <div className='page-header'><h4>Matching Properties by Type</h4></div>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Enter Property Type"
                            value={selectedPropertyType}
                            onChange={(e) => setSelectedPropertyType(e.target.value)}
                            style={{
                                width: '200px',
                                padding: '8px',
                                marginRight: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                        <button
                            onClick={() => fetchMatchingProperties(selectedPropertyType)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            Fetch Matching Properties
                        </button>
                    </div>

                    {selectedPropertyType && matchingProperties[selectedPropertyType] && (
                        <div className="properties-list">
                            {matchingProperties[selectedPropertyType].length === 0 ? (
                                <p>No matching properties found for this type</p>
                            ) : (
                                matchingProperties[selectedPropertyType].map(property => (
                                    <div key={`${property.cid}-${property.pid}`} className="property-card">
                                        <h4>Client ID: {property.cid}</h4>
                                        <div className="property-content">
                                            <p>Client Name: {property.client_name}</p>
                                            <p>Property ID: {property.pid}</p>
                                            <p>Property Type: {property.property_type}</p>
                                            <p>Size: {property.size}</p>
                                            <p>Price: ${property.price}</p>
                                            <p>Address: {property.address}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <div className="status-bids-section">
                    <div className='page-header'><h4>Bids by Property Status</h4></div>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Enter Property Status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            style={{
                                width: '200px',
                                padding: '8px',
                                marginRight: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                        <button
                            onClick={() => fetchBidsByStatus(selectedStatus)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            Fetch Status Bids
                        </button>
                    </div>

                    {selectedStatus && statusBids[selectedStatus] && (
                        <div className="properties-list">
                            {statusBids[selectedStatus].length === 0 ? (
                                <p>No bids found for this status</p>
                            ) : (
                                statusBids[selectedStatus].map((bid, index) => (
                                    <div key={index} className="property-card">
                                        <h4>Property Status: {bid.status}</h4>
                                        <div className="property-content">
                                            <p>Total Bids: {bid.total_bids}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <div className="unresolved-cases-section">
                    <div className='page-header'><h4>Unresolved Legal Cases</h4></div>
                    <div className="properties-list">
                        {unresolvedCases.length === 0 ? (
                            <p>No unresolved legal cases found</p>
                        ) : (
                            unresolvedCases.map(legalCase => (
                                <div key={legalCase.lcid} className="property-card">
                                    <h4>Legal Case ID: {legalCase.lcid}</h4>
                                    <div className="property-content">
                                        <p>Issue: {legalCase.issue}</p>
                                        <p>Case Status: {legalCase.case_status}</p>
                                        <p>Property ID: {legalCase.pid}</p>
                                        <p>Property Type: {legalCase.property_type}</p>
                                        <p>Size: {legalCase.size}</p>
                                        <p>Price: ${legalCase.price}</p>
                                        <p>Address: {legalCase.address}</p>
                                        <p>Owner ID: {legalCase.oid}</p>
                                        <p>Owner Name: {legalCase.owner_name}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                </div>
    );
}

export default Properties;
