const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all bids
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM BIDS');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get bids for a specific property
router.get('/property/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await db.query('SELECT * FROM BIDS WHERE PID = $1', [pid]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create bid
router.post('/', async (req, res) => {
    try {
        const { CID, PID, Amount, Status, Date } = req.body;
        const result = await db.query(
            'INSERT INTO BIDS (CID, PID, Amount, Status, Date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [CID, PID, Amount, Status, Date]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update bid status
router.put('/:cid/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { Status, Amount } = req.body;
        const result = await db.query(
            'UPDATE BIDS SET Status = $1, Amount = $2 WHERE CID = $3 AND PID = $4 RETURNING *',
            [Status, Amount, cid, pid]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get highest bid for a property
router.get('/property/:pid/highest', async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await db.query(
            'SELECT * FROM BIDS WHERE PID = $1 ORDER BY Amount DESC LIMIT 1',
            [pid]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;