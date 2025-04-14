const express = require('express');
const router = express.Router();
const formQueries = require('./formQueries');

// Route 1: Get all properties with details
router.get('/properties', async (req, res) => {
    try {
        const properties = await formQueries.getPropertiesWithDetails();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 2: Get properties by agent
router.get('/properties/agent/:agentId', async (req, res) => {
    try {
        const properties = await formQueries.getPropertiesByAgent(req.params.agentId);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 3: Get average sold price by agent
router.get('/properties/agent/:agentId/avg-price', async (req, res) => {
    try {
        const avgPrice = await formQueries.getAgentSoldPriceAvg(req.params.agentId);
        res.json(avgPrice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 4: Get transactions by property
router.get('/transactions/property/:propertyId', async (req, res) => {
    try {
        const transactions = await formQueries.getTransactionsWithDetailsByPropertyId(req.params.propertyId);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 5: Get top N agents by client count
router.get('/agents/top/:limit', async (req, res) => {
    try {
        const topAgents = await formQueries.getTopNAgentByClients(req.params.limit);
        res.json(topAgents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 6: Get active contracts by property
router.get('/contracts/property/:propertyId', async (req, res) => {
    try {
        const contracts = await formQueries.getActiveContractsByPropertyId(req.params.propertyId);
        res.json(contracts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 7: Get properties with legal cases
router.get('/properties/legal-cases', async (req, res) => {
    try {
        const properties = await formQueries.getPropertiesWithLegalCases();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 8: Get bids by property
router.get('/bids/property/:propertyId', async (req, res) => {
    try {
        const bids = await formQueries.getBidsByPropertyId(req.params.propertyId);
        res.json(bids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 9: Get accepted bids
router.get('/bids/accepted', async (req, res) => {
    try {
        const acceptedBids = await formQueries.getAcceptedBids();
        res.json(acceptedBids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 10: Get top three agents
router.get('/agents/top-three', async (req, res) => {
    try {
        const topAgents = await formQueries.getTopThreeAgents();
        res.json(topAgents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 11: Get total bids by property
router.get('/bids/total/property/:propertyId', async (req, res) => {
    try {
        const totalBids = await formQueries.getTotalBidsPerProperty(req.params.propertyId);
        res.json(totalBids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 12: Get matching properties by type
router.get('/properties/matching/:propertyType', async (req, res) => {
    try {
        const properties = await formQueries.getMatchingPropertiesByPropertyType(req.params.propertyType);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 13: Get bids by property status
router.get('/bids/status/:status', async (req, res) => {
    try {
        const bids = await formQueries.getBidsByPropertyStatus(req.params.status);
        res.json(bids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 14: Get unresolved legal cases
router.get('/legal-cases/unresolved', async (req, res) => {
    try {
        const cases = await formQueries.getUnresolvedLegalCases();
        res.json(cases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;