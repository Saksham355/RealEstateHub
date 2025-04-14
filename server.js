const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const propertiesRoute = require('./routes/properties');
const agentsRoute = require('./routes/agents');
const clientsRoute = require('./routes/clients');
const ownersRoute = require('./routes/owners');
const transactionsRoute = require('./routes/transactions');
const contractsRoute = require('./routes/contracts');
const legalCasesRoute = require('./routes/legalCases');
const bidsRoute = require('./routes/bids');
const remsRoutes = require('./routes/remsRoutes');
const formRoutes = require('./routes/formRoutes');

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:3006', 'http://localhost:3005'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
  
app.use(express.json());

// Use routes
app.use('/api/properties', propertiesRoute);
app.use('/api/agents', agentsRoute);
app.use('/api/clients', clientsRoute);
app.use('/api/owners', ownersRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/contracts', contractsRoute);
app.use('/api/legal-cases', legalCasesRoute);
app.use('/api/bids', bidsRoute);
app.use('/admin', remsRoutes); 
app.use('/form', formRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Real Estate API is running' });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});