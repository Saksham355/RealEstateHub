const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM PROPERTY');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new property
router.post('/', async (req, res) => {
    try {
        const { PID, Type, Size, Status, Price, Address, OID, AID } = req.body;
        const result = await db.query(
            'INSERT INTO PROPERTY (PID, Type, Size, Status, Price, Address, OID, AID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [PID, Type, Size, Status, Price, Address, OID, AID]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a property
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM PROPERTY WHERE PID = $1', [id]);
        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;