const express = require('express');

const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'users.json');

exports.saveUserData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(p, stringifyData, (err) => {
        console.log(err);
    })
}

exports.getUserData = () => {
    const jsonData = fs.readFileSync(p)
    return JSON.parse(jsonData);
}