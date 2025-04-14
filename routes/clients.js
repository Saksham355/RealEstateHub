const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all clients
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM CLIENT');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get client by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM CLIENT WHERE CID = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new client
router.post('/', async (req, res) => {
    try {
        const { CID, Name, Address, Contact, Preferred_Type, Preferred_Price } = req.body;
        const result = await db.query(
            'INSERT INTO CLIENT (CID, Name, Address, Contact, Preferred_Type, Preferred_Price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [CID, Name, Address, Contact, Preferred_Type, Preferred_Price]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update client
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Address, Contact, Preferred_Type, Preferred_Price } = req.body;
        const result = await db.query(
            'UPDATE CLIENT SET Name = $1, Address = $2, Contact = $3, Preferred_Type = $4, Preferred_Price = $5 WHERE CID = $6 RETURNING *',
            [Name, Address, Contact, Preferred_Type, Preferred_Price, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete client
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM CLIENT WHERE CID = $1', [id]);
        res.json({ message: 'Client deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get client's bids
router.get('/:id/bids', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT BIDS.*, PROPERTY.* FROM BIDS JOIN PROPERTY ON BIDS.PID = PROPERTY.PID WHERE BIDS.CID = $1',
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get client's transactions
router.get('/:id/transactions', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT * FROM TRANSACTION WHERE CID = $1',
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get client's contracts
router.get('/:id/contracts', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT * FROM CONTRACT WHERE CID = $1',
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get recommended properties for client based on preferences
router.get('/:id/recommendations', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            `SELECT p.* FROM PROPERTY p
             JOIN CLIENT c ON c.Preferred_Type = p.Type
             WHERE c.CID = $1 
             AND p.Price <= c.Preferred_Price
             AND p.Status = 'Available'`,
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;