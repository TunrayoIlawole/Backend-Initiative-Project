const express = require('express');
// install body parser
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const rentalRoutes = require('./routes/rentals');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/rentals', rentalRoutes);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});