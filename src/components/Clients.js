import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clients() {
    const [clients, setClients] = useState([]);
    const [nextCID, setNextCID] = useState('');
    const [newClient, setNewClient] = useState({
        CID: '',
        Name: '',
        Address: '',
        Contact: '',
        Preferred_Type: '',
        Preferred_Price: ''
    });

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:3005/api/clients');
                setClients(response.data);
                const maxCID = Math.max(...response.data.map(client => parseInt(client.cid)), 0);
                const nextID = (maxCID + 1).toString();
                setNextCID(nextID);
                setNewClient(prev => ({ ...prev, CID: nextID }));
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        fetchClients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3005/api/clients', newClient);
            const response = await axios.get('http://localhost:3005/api/clients');
            setClients(response.data);
            const maxCID = Math.max(...response.data.map(client => parseInt(client.cid)), 0);
            const nextID = (maxCID + 1).toString();
            setNewClient({
                CID: nextID,
                Name: '',
                Address: '',
                Contact: '',
                Preferred_Type: '',
                Preferred_Price: ''
            });
        } catch (error) {
            console.error('Error adding client:', error);
        }
    };

    return (
        <div>
             <div className="page-header">
            <h2>Clients</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Client ID"
                    value={newClient.CID}
                    onChange={(e) => setNewClient({...newClient, CID: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={newClient.Name}
                    onChange={(e) => setNewClient({...newClient, Name: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={newClient.Address}
                    onChange={(e) => setNewClient({...newClient, Address: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={newClient.Contact}
                    onChange={(e) => setNewClient({...newClient, Contact: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Preferred Type"
                    value={newClient.Preferred_Type}
                    onChange={(e) => setNewClient({...newClient, Preferred_Type: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Preferred Price"
                    value={newClient.Preferred_Price}
                    onChange={(e) => setNewClient({...newClient, Preferred_Price: e.target.value})}
                />
                <button type="submit">Add Client</button>
            </form>

            <div className="clients-list">
                {clients.map(client => (
                    <div key={client.cid} className="client-card">
                        <h3>Client ID: {client.cid}</h3>
                        <div className="client-content">
                            <p>Name: {client.name}</p>
                            <p>Contact: {client.contact}</p>
                            <p>Address: {client.address}</p>
                            <p>Preferred Type: {client.preferred_type}</p>
                            <p>Preferred Price: ${client.preferred_price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Clients;