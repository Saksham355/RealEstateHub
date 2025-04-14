const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM TRANSACTION');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get transaction by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM TRANSACTION WHERE TID = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create transaction
router.post('/', async (req, res) => {
    try {
        const { TID, Status, Mode, AID, CID, PID } = req.body;
        const result = await db.query(
            'INSERT INTO TRANSACTION (TID, Status, Mode, AID, CID, PID) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [TID, Status, Mode, AID, CID, PID]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update transaction
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Status, Mode } = req.body;
        const result = await db.query(
            'UPDATE TRANSACTION SET Status = $1, Mode = $2 WHERE TID = $3 RETURNING *',
            [Status, Mode, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;