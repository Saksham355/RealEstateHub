const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all agents
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM AGENT');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get agent by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM AGENT WHERE AID = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new agent
router.post('/', async (req, res) => {
    try {
        const { AID, Name, Contact } = req.body;
        const result = await db.query(
            'INSERT INTO AGENT (AID, Name, Contact) VALUES ($1, $2, $3) RETURNING *',
            [AID, Name, Contact]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update agent
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Contact } = req.body;
        const result = await db.query(
            'UPDATE AGENT SET Name = $1, Contact = $2 WHERE AID = $3 RETURNING *',
            [Name, Contact, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete agent
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM AGENT WHERE AID = $1', [id]);
        res.json({ message: 'Agent deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all properties managed by an agent
router.get('/:id/properties', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM PROPERTY WHERE AID = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all clients managed by an agent
router.get('/:id/clients', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT CLIENT.* FROM CLIENT JOIN MANAGES ON CLIENT.CID = MANAGES.CID WHERE MANAGES.AID = $1',
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all transactions handled by an agent
router.get('/:id/transactions', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM TRANSACTION WHERE AID = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;