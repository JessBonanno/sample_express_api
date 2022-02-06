const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const peopleController = require('../controllers/people');
const cors = require('cors');

const PORT = 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/people', peopleController)

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})

module.exports = app;
