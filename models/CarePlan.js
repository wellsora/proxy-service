const mongoose = require('mongoose');

const CarePlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  appointmentName: { 
    type: String, 
    required: true,  
    minlength: 1,    // Ensures at least 1 character is entered
    maxlength: 500   // Prevents excessive input
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved'],
    default: 'New',
    required: true,
  },
  services: {
    type: String,
    enum: ['Transport', 'Support', 'Post Visit', 'Physical Assistance', 'Health Monitor'],
    required: true,
  },
  location: { type: String, required: true },
  date: { type: String, required: true }, // Separate date field
  time: { type: String, required: true }, // Separate time field
}, { timestamps: true });

module.exports = mongoose.model('CarePlan', CarePlanSchema);
