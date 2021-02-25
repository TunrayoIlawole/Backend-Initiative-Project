const express = require('express');

const fs = require('fs');

const movieModel = require('../models/movies');

// Create movie - POST 
exports.postAddMovie = (req, res, next) => {
    const existingMovies = movieModel.getMovieData();

    const movieData = req.body;

    // check if movie exists already
    const findExist = existingMovies.find(movie => movie.id === movieData.id);
    if (findExist) {
        return res.status(409).send({
            error: true,
            msg: 'Movie already exists'
        })
    }

    existingMovies.push(movieData);
    movieModel.saveMovieData(existingMovies);
    res.send({
        success: true,
        msg: 'Movie data added succesfully'
    })
};

// Read - GET
exports.getMovies = (req, res, next) => {
    const movies = movieModel.getMovieData();
    res.send(movies);
};

// Update - patch
exports.updateMovie = (req, res, next) => {
    const id = parseInt(req.params.id);

    // get the updated data
    const movieData = req.body;

    const existingMovies = movieModel.getMovieData();

    const findExist = existingMovies.find(movie => movie.id === id);
    if (!findExist) {
        return res.status(409).send({
            error: true,
            msg: 'Movie does not exist'
        })
    }

    const updatedMovies = existingMovies.filter(movie => movie.id !== id);
    updatedMovies.push(movieData);

    movieModel.saveMovieData(updatedMovies);

    res.send({
        success: true,
        msg: 'Movie data updated succesfully'
    });
}

// Delete
exports.deleteMovie = (req, res, next) => {
    const id = parseInt(req.params.id);

    const existingMovies = movieModel.getMovieData();

    const updatedMovies = existingMovies.filter(movie => movie.id !== id);

    if (existingMovies.length === updatedMovies.length) {
        return res.status(409).send({
            error: true,
            msg: 'Movie does not exist'
        })
    }

    movieModel.saveMovieData(updatedMovies);

    res.send({
        success: true,
        msg: 'Movie deleted succesfully'
    });
}