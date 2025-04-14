const express = require('express');
const router = express.Router();
const remsQueries = require('./remsQueries');

// Property routes
router.get('/properties', async (req, res) => {
  try {
    const data = await remsQueries.getAllProperties();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Owner routes
router.get('/owners', async (req, res) => {
  try {
    const data = await remsQueries.getAllOwners();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agent routes
router.get('/agents', async (req, res) => {
  try {
    const data = await remsQueries.getAllAgents();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Client routes
router.get('/clients', async (req, res) => {
  try {
    const data = await remsQueries.getAllClients();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transaction routes
router.get('/transactions', async (req, res) => {
  try {
    const data = await remsQueries.getAllTransactions();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contract routes
router.get('/contracts', async (req, res) => {
  try {
    const data = await remsQueries.getAllContracts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Legal case routes
router.get('/legal-cases', async (req, res) => {
  try {
    const data = await remsQueries.getAllLegalCases();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bids routes
router.get('/bids', async (req, res) => {
  try {
    const data = await remsQueries.getAllBids();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Advanced query routes
router.get('/properties/price-range', async (req, res) => {
  try {
    const { min, max } = req.query;
    const data = await remsQueries.getPropertiesByPriceRange(min, max);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/agents/performance', async (req, res) => {
  try {
    const data = await remsQueries.getAgentPerformance();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/contracts/active', async (req, res) => {
  try {
    const data = await remsQueries.getActiveContracts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 1: Properties with details
router.get('/properties/details', async (req, res) => {
  try {
    const data = await remsQueries.getPropertiesWithDetails();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 2: Properties per agent
router.get('/agents/properties', async (req, res) => {
  try {
    const data = await remsQueries.getPropertiesPerAgent();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 3: Average sold price per agent
router.get('/agents/sold-price-avg', async (req, res) => {
  try {
    const data = await remsQueries.getAgentSoldPriceAvg();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 4: Transactions with details
router.get('/transactions/details', async (req, res) => {
  try {
    const data = await remsQueries.getTransactionsWithDetails();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 5: Top agent by clients
router.get('/agents/top-by-clients', async (req, res) => {
  try {
    const data = await remsQueries.getTopAgentByClients();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 6: Active contracts
router.get('/contracts/active', async (req, res) => {
  try {
    const data = await remsQueries.getActiveContracts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 7: Properties with legal cases
router.get('/properties/legal-cases', async (req, res) => {
  try {
    const data = await remsQueries.getPropertiesWithLegalCases();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 8: Bids per property
router.get('/properties/bids', async (req, res) => {
  try {
    const data = await remsQueries.getBidsPerProperty();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 9: Accepted bids
router.get('/bids/accepted', async (req, res) => {
  try {
    const data = await remsQueries.getAcceptedBids();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 10: Top three agents
router.get('/agents/top-three', async (req, res) => {
  try {
    const data = await remsQueries.getTopThreeAgents();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 11: Total bids per property
router.get('/properties/total-bids', async (req, res) => {
  try {
    const data = await remsQueries.getTotalBidsPerProperty();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 12: Matching properties
router.get('/properties/matching', async (req, res) => {
  try {
    const data = await remsQueries.getMatchingProperties();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 13: Bids by property status
router.get('/properties/bids-by-status', async (req, res) => {
  try {
    const data = await remsQueries.getBidsByPropertyStatus();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query 14: Unresolved legal cases
router.get('/legal-cases/unresolved', async (req, res) => {
  try {
    const data = await remsQueries.getUnresolvedLegalCases();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;