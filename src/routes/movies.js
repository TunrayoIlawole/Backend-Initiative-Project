const express = require('express');

const router = express.Router();

const movieController = require('../controllers/movies');

router.post('/add', movieController.postAddMovie);

router.get('/list', movieController.getMovies);

router.patch('/update/:id', movieController.updateMovie);

router.delete('/delete/:id', movieController.deleteMovie);

module.exports = router;