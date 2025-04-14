const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all legal cases
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM LEGAL_CASE');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get legal case by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM LEGAL_CASE WHERE LCID = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create legal case
router.post('/', async (req, res) => {
    try {
        const { LCID, PID, OID, Issue, Status } = req.body;
        const result = await db.query(
            'INSERT INTO LEGAL_CASE (LCID, PID, OID, Issue, Status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [LCID, PID, OID, Issue, Status]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update legal case
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Issue, Status } = req.body;
        const result = await db.query(
            'UPDATE LEGAL_CASE SET Issue = $1, Status = $2 WHERE LCID = $3 RETURNING *',
            [Issue, Status, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;