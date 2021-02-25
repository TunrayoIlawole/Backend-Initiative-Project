const express = require('express');

const router = express.Router();

const rentalController = require('../controllers/rentals');

router.post('/add', rentalController.postAddRental);

router.get('/list', rentalController.getRentals);

router.patch('/update/:id', rentalController.updateRental);

router.delete('/delete/:id', rentalController.deleteRental);

module.exports = router;