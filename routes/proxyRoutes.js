const express = require("express");
const {
    createCarePlan,
    getCarePlans,
    editCarePlan,
    deleteCarePlan,
  } = require('../controllers/carePlanController');
const {
    soraSearch,
    benefitsSearch
} = require("../controllers/chatController");
const authenticate = require('../middleware/authenticate');
  
const router = express.Router();

// sora routes
router.post("/sora-search", authenticate, soraSearch); 
router.post("/benefits-search", authenticate, benefitsSearch); 

// Care plan routes
router.post('/careplan', authenticate, createCarePlan);
router.get('/careplan', authenticate, getCarePlans);
router.put('/careplan/:id', authenticate, editCarePlan);
router.delete('/careplan/:id', authenticate, deleteCarePlan);

module.exports = router;
