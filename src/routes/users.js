const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

router.post('/add', userController.postAddUser);

router.get('/list', userController.getUsers);

router.patch('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

module.exports = router;