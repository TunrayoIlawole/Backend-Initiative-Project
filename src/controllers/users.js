const express = require('express');

const fs = require('fs');

const userModel = require('../models/users');

// Create user - POST 
exports.postAddUser = (req, res, next) => {
    const existingUsers = userModel.getUserData();

    const userData = req.body;

    // check if username exists already
    const findExist = existingUsers.find(user => user.id === userData.id);
    if (findExist) {
        return res.status(409).send({
            error: true,
            msg: 'Username already exists'
        })
    }

    existingUsers.push(userData);
    userModel.saveUserData(existingUsers);
    res.send({
        success: true,
        msg: 'User data added succesfully'
    })
};

// Read - GET
exports.getUsers = (req, res, next) => {
    const users = userModel.getUserData();
    res.send(users);
};

// Update - patch
exports.updateUser = (req, res, next) => {
    const id = parseInt(req.params.id);

    // get the updated data
    const userData = req.body;

    const existingUsers = userModel.getUserData();

    const findExist = existingUsers.find(user => user.id === id);
    if (!findExist) {
        return res.status(409).send({
            error: true,
            msg: 'User does not exist'
        })
    }

    const updatedUsers = existingUsers.filter(user => user.id !== id);
    updatedUsers.push(userData);

    userModel.saveUserData(updatedUsers);

    res.send({
        success: true,
        msg: 'User data updated succesfully'
    });
}

// Delete
exports.deleteUser = (req, res, next) => {
    const id = parseInt(req.params.id);

    const existingUsers = userModel.getUserData();

    const updatedUsers = existingUsers.filter(user => user.id !== id);

    if (existingUsers.length === updatedUsers.length) {
        return res.status(409).send({
            error: true,
            msg: 'User does not exist'
        })
    }

    userModel.saveUserData(updatedUsers);

    res.send({
        success: true,
        msg: 'User deleted succesfully'
    });
}