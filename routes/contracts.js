const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all contracts
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM CONTRACT');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get contract by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM CONTRACT WHERE CONTRACT_ID = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create contract
router.post('/', async (req, res) => {
    try {
        const { CONTRACT_ID, PID, CID, AID, OID, Type, Start_Date, End_Date, Terms, Status } = req.body;
        const result = await db.query(
            'INSERT INTO CONTRACT (CONTRACT_ID, PID, CID, AID, OID, Type, Start_Date, End_Date, Terms, Status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [CONTRACT_ID, PID, CID, AID, OID, Type, Start_Date, End_Date, Terms, Status]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update contract
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Type, Start_Date, End_Date, Terms, Status } = req.body;
        const result = await db.query(
            'UPDATE CONTRACT SET Type = $1, Start_Date = $2, End_Date = $3, Terms = $4, Status = $5 WHERE CONTRACT_ID = $6 RETURNING *',
            [Type, Start_Date, End_Date, Terms, Status, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;