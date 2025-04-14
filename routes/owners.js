const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all owners
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM OWNER');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get owner by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM OWNER WHERE OID = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create owner
router.post('/', async (req, res) => {
    try {
        const { OID, Name, Contact, Address } = req.body;
        const result = await db.query(
            'INSERT INTO OWNER (OID, Name, Contact, Address) VALUES ($1, $2, $3, $4) RETURNING *',
            [OID, Name, Contact, Address]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update owner
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Contact, Address } = req.body;
        const result = await db.query(
            'UPDATE OWNER SET Name = $1, Contact = $2, Address = $3 WHERE OID = $4 RETURNING *',
            [Name, Contact, Address, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete owner
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM OWNER WHERE OID = $1', [id]);
        res.json({ message: 'Owner deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;