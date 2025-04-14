const pool = require('../db');

const formQueries = {
  /// Query 1: Properties with owner and agent details
  getPropertiesWithDetails: async () => {
    try {
      const query = `
        SELECT P.PID, P.Type, P.Size, P.Status, P.Price, P.Address,
               O.Name AS Owner_Name, A.Name AS Agent_Name
        FROM PROPERTY P
        JOIN OWNER O ON P.OID = O.OID
        JOIN AGENT A ON P.AID = A.AID`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 2: Properties By agent
  getPropertiesByAgent: async (agentId) => {
    try {
      const query = `
        SELECT A.AID, A.Name AS Agent_Name, COUNT(P.PID) AS Total_Properties
        FROM AGENT A
        LEFT JOIN PROPERTY P ON A.AID = P.AID
        WHERE A.AID = $1
        GROUP BY A.AID, A.Name`;
      const result = await pool.query(query, [agentId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 3: Average sold property price for specific agent
  getAgentSoldPriceAvg: async (agentId) => {
    try {
      const query = `
        SELECT A.AID, A.Name AS Agent_Name, AVG(P.Price) AS Avg_Sold_Price
        FROM AGENT A
        JOIN PROPERTY P ON A.AID = P.AID
        WHERE P.Status = 'Sold' AND A.AID = $1
        GROUP BY A.AID, A.Name`;
      const result = await pool.query(query, [agentId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 4: Transactions with details for specific property
  getTransactionsWithDetailsByPropertyId: async (propertyId) => {
    try {
      const query = `
        SELECT T.TID, C.Name AS Client_Name, P.PID, P.Type,
               P.Size, P.Price, P.Address, T.Status AS Transaction_Status
        FROM TRANSACTION T
        JOIN CLIENT C ON T.CID = C.CID
        JOIN PROPERTY P ON T.PID = P.PID
        WHERE P.PID = $1`;
      const result = await pool.query(query, [propertyId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  

  // Query 5: Top N agents by client count
  getTopNAgentByClients: async (limit) => {
    try {
      const query = `
        SELECT A.AID, A.Name AS Agent_Name, COUNT(DISTINCT C.CID) AS Client_Count
        FROM AGENT A
        JOIN PROPERTY P ON A.AID = P.AID
        JOIN TRANSACTION T ON P.PID = T.PID
        JOIN CLIENT C ON T.CID = C.CID
        GROUP BY A.AID, A.Name
        ORDER BY Client_Count DESC
        LIMIT $1`;
      const result = await pool.query(query, [limit]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 6: Active contracts for specific property
  getActiveContractsByPropertyId: async (propertyId) => {
    try {
      const query = `
        SELECT C.CONTRACT_ID, C.Start_Date, C.End_Date, C.Type,
               O.OID, O.Name AS Owner_Name, CL.CID, CL.Name AS Client_Name,
               A.AID, A.Name AS Agent_Name, P.PID, P.Type AS Property_Type, P.Address
        FROM CONTRACT C
        JOIN OWNER O ON C.OID = O.OID
        JOIN CLIENT CL ON C.CID = CL.CID
        JOIN AGENT A ON C.AID = A.AID
        JOIN PROPERTY P ON C.PID = P.PID
        WHERE C.End_Date >= CURRENT_DATE AND P.PID = $1`;
      const result = await pool.query(query, [propertyId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  /// Query 7: Properties with legal cases
  getPropertiesWithLegalCases: async () => {
    try {
      const query = `
        SELECT P.PID, P.Type, P.Size, P.Price, P.Address,
               L.Issue, L.Status AS Case_Status
        FROM LEGAL_CASE L
        JOIN PROPERTY P ON L.PID = P.PID`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 8: Bids for specific property
  getBidsByPropertyId: async (propertyId) => {
    try {
      const query = `
        SELECT P.PID, P.Type, P.Size, P.Price, P.Address,
               COUNT(B.pid) AS Total_Bids
        FROM PROPERTY P
        LEFT JOIN BIDS B ON P.PID = B.PID
        WHERE P.PID = $1
        GROUP BY P.PID, P.Type, P.Size, P.Price, P.Address`;
      const result = await pool.query(query, [propertyId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  /// Query 9: Accepted bids with details
  getAcceptedBids: async () => {
    try {
      const query = `
        SELECT C.CID, C.Name AS Client_Name, C.Contact,
               P.PID, P.Type AS Property_Type, P.Size, P.Price, P.Address,
               B.Amount AS Bid_Amount
        FROM BIDS B
        JOIN CLIENT C ON B.CID = C.CID
        JOIN PROPERTY P ON B.PID = P.PID
        WHERE B.Status = 'Accepted'`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  /// Query 10: Top three agents by transactions
  getTopThreeAgents: async () => {
    try {
      const query = `
        SELECT A.AID, A.Name AS Agent_Name, COUNT(T.TID) AS Total_Transactions
        FROM AGENT A
        JOIN PROPERTY P ON A.AID = P.AID
        JOIN TRANSACTION T ON P.PID = T.PID
        GROUP BY A.AID, A.Name
        ORDER BY Total_Transactions DESC
        LIMIT 3`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 11: Total bid amounts for specific property
  getTotalBidsPerProperty: async (propertyId) => {
    try {
      const query = `
        SELECT P.PID, P.Type AS Property_Type, P.Size, P.Price, P.Address,
               COALESCE(SUM(B.Amount), 0) AS Total_Bid_Amount
        FROM PROPERTY P
        LEFT JOIN BIDS B ON P.PID = B.PID
        WHERE P.PID = $1
        GROUP BY P.PID, P.Type, P.Size, P.Price, P.Address`;
      const result = await pool.query(query, [propertyId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 12: Matching properties by specific type
  getMatchingPropertiesByPropertyType: async (propertyType) => {
    try {
      const query = `
        SELECT C.CID, C.Name AS Client_Name,
               P.PID, P.Type AS Property_Type, P.Size, P.Price, P.Address
        FROM CLIENT C
        JOIN PROPERTY P ON C.Preferred_Type = P.Type
        WHERE P.Type = $1`;
      const result = await pool.query(query, [propertyType]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 13: Bids by specific property status
  getBidsByPropertyStatus: async (status) => {
    try {
      const query = `
        SELECT P.Status, COUNT(B.PID) AS Total_Bids
        FROM PROPERTY P
        LEFT JOIN BIDS B ON P.PID = B.PID
        WHERE P.Status = $1
        GROUP BY P.Status`;
      const result = await pool.query(query, [status]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  /// Query 14: Unresolved legal cases
  getUnresolvedLegalCases: async () => {
    try {
      const query = `
        SELECT L.lcid, L.Issue, L.Status AS Case_Status,
               P.PID, P.Type AS Property_Type, P.Size, P.Price, P.Address,
               O.OID, O.Name AS Owner_Name
        FROM LEGAL_CASE L
        JOIN PROPERTY P ON L.PID = P.PID
        JOIN OWNER O ON P.OID = O.OID
        WHERE L.Status IN ('Open', 'Pending')`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = formQueries;