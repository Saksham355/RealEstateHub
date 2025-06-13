# Real Estate Management System (REMS)

A comprehensive web application for managing real estate properties, agents, clients, and transactions. Built with React.js for the frontend and Node.js/Express.js for the backend, with PostgreSQL as the database.

## Features

- **Property Management**
  - List and manage real estate properties
  - Track property details, pricing, and availability
  - Upload and manage property images

- **Agent Management**
  - Register and manage real estate agents
  - Track agent performance metrics
  - Monitor agent property portfolios
  - View top performing agents

- **Client Management**
  - Maintain client database
  - Track client preferences and interactions
  - Manage client property viewings

- **Transaction Handling**
  - Process property transactions
  - Track bids and offers
  - Manage contracts and legal documentation

## Tech Stack

### Frontend
- React.js
- CSS3 for styling
- Modern UI/UX design principles
- Responsive layout for all devices

### Backend
- Node.js
- Express.js
- PostgreSQL database
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dbms_real
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_db_name
PORT=3000
```

4. Initialize the database:
- Run the SQL scripts from `database.sql` to set up your database schema

5. Start the development server:
```bash
npm start
```

## Project Structure

```
├── public/           # Static files
├── routes/           # API route handlers
├── src/              # React source files
│   ├── components/   # React components
│   ├── context/      # Context providers
│   └── App.js        # Main application component
├── server.js         # Express server setup
├── database.sql      # Database schema
└── db.js            # Database connection setup
```

## API Endpoints

- `/api/properties` - Property management endpoints
- `/api/agents` - Agent management endpoints
- `/api/clients` - Client management endpoints
- `/api/transactions` - Transaction handling endpoints
