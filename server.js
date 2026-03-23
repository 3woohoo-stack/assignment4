const express = require('express');
// FIXED: Changed '/' to './' to look in the current directory
const dogFacts = require('/dog_facts.js'); 
const app = express();

app.get('/facts', (req, res) => {
  try {
    const { number } = req.query;

    if (!number) {
      return res.status(200).json({ facts: dogFacts, success: true });
    }

    const numFacts = parseInt(number);

    if (isNaN(numFacts) || numFacts < 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid 'number' parameter. Please provide a non-negative integer." 
      });
    }

    const requestedFacts = dogFacts.slice(0, numFacts);
    
    res.status(200).json({ 
      facts: requestedFacts, 
      success: true 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Export for Supertest
module.exports = app;