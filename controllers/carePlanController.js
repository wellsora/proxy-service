const CarePlan = require('../models/CarePlan');

// Create a new care plan
exports.createCarePlan = async (req, res) => {
  try {
    const { firstName, lastName, appointmentName, status, services, location, date, time } = req.body;

    const carePlan = new CarePlan({
      userId: req.userId,
      firstName,
      lastName,
      appointmentName,
      status,
      services,
      location,
      date,
      time,
    });

    await carePlan.save();
    res.status(201).json({ message: 'Care plan created successfully', carePlan });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all care plans for the logged-in user
exports.getCarePlans = async (req, res) => {
  try {
    const carePlans = await CarePlan.find({ userId: req.userId });
    res.status(200).json(carePlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Edit an existing care plan
exports.editCarePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const carePlan = await CarePlan.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updates,
      { new: true }
    );

    if (!carePlan) {
      return res.status(404).json({ message: 'Care plan not found or unauthorized' });
    }

    res.status(200).json({ message: 'Care plan updated successfully', carePlan });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a care plan
exports.deleteCarePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const carePlan = await CarePlan.findOneAndDelete({ _id: id, userId: req.userId });
    if (!carePlan) {
      return res.status(404).json({ message: 'Care plan not found or unauthorized' });
    }

    res.status(200).json({ message: 'Care plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
