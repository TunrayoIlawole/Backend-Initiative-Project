const express = require('express');

const fs = require('fs');

const rentalModel = require('../models/rentals');

// Create user - POST 
exports.postAddRental = (req, res, next) => {
    const existingRentals = rentalModel.getRentalData();

    const rentalData = req.body;

    // check if username exists already
    const findExist = existingRentals.find(rental => rental.id === rentalData.id);
    if (findExist) {
        return res.status(409).send({
            error: true,
            msg: 'Rental already exists'
        })
    }

    existingRentals.push(rentalData);
    rentalModel.saveRentalData(existingRentals);
    res.send({
        success: true,
        msg: 'Rental added succesfully'
    })
};

// Read - GET
exports.getRentals = (req, res, next) => {
    const rentals = rentalModel.getRentalData();
    res.send(rentals);
};

// Update - patch
exports.updateRental = (req, res, next) => {
    const id = parseInt(req.params.id);

    // get the updated data
    const rentalData = req.body;

    const existingRentals = rentalModel.getRentalData();

    const findExist = existingRentals.find(rental => rental.id === id);
    if (!findExist) {
        return res.status(409).send({
            error: true,
            msg: 'rental does not exist'
        })
    }

    const updatedRentals = existingRentals.filter(rental => rental.id !== id);
    updatedRentals.push(rentalData);

    rentalModel.saveRentalData(updatedRentals);

    res.send({
        success: true,
        msg: 'Rental updated succesfully'
    });
}

// Delete
exports.deleteRental = (req, res, next) => {
    const id = parseInt(req.params.id);

    const existingRentals = rentalModel.getRentalData();

    const updatedRentals = existingRentals.filter(rental => rental.id !== id);

    if (existingRentals.length === updatedRentals.length) {
        return res.status(409).send({
            error: true,
            msg: 'Rental does not exist'
        })
    }

    rentalModel.saveRentalData(updatedRentals);

    res.send({
        success: true,
        msg: 'Rental deleted succesfully'
    });
}