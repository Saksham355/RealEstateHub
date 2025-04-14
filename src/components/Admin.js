import React from 'react';
import Query1PropertyDetails from './Admin/Query1PropertyDetails';
import Query2PropertiesPerAgent from './Admin/Query2PropertiesPerAgent';
import Query3AgentSoldPriceAvg from './Admin/Query3AgentSoldPriceAvg';
import Query4TransactionDetails from './Admin/Query4TransactionDetails';
import Query5TopAgentByClients from './Admin/Query5TopAgentByClients';
import Query6ActiveContracts from './Admin/Query6ActiveContracts';
import Query7LegalCases from './Admin/Query7LegalCases';
import Query8BidsPerProperty from './Admin/Query8BidsPerProperty';
import Query9AcceptedBids from './Admin/Query9AcceptedBids';
import Query10TopThreeAgents from './Admin/Query10TopThreeAgents';
import Query11TotalBids from './Admin/Query11TotalBids';
import Query12MatchingProperties from './Admin/Query12MatchingProperties';
import Query13BidsByStatus from './Admin/Query13BidsByStatus';
import Query14UnresolvedCases from './Admin/Query14UnresolvedCases';

function Admin() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Estate Management System</h1>
      </header>
      <main className="App-main">
        <Query1PropertyDetails />
        <Query2PropertiesPerAgent />
        <Query3AgentSoldPriceAvg />
        <Query4TransactionDetails />
        <Query5TopAgentByClients />
        <Query6ActiveContracts />
        <Query7LegalCases />
        <Query8BidsPerProperty />
        <Query9AcceptedBids />
        <Query10TopThreeAgents />
        <Query11TotalBids />
        <Query12MatchingProperties />
        <Query13BidsByStatus />
        <Query14UnresolvedCases />
      </main>
    </div>
  );
}

export default Admin;