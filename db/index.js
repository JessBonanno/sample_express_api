const mysql = require('mysql');
const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

const db = 'peopleDb';

const mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.MYSQL_PASSWORD,
});

mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${db}`);

const sequelizeDb = new Sequelize(`${db}`, 'root', process.env.MYSQL_PASSWORD, {
	host: 'localhost',
	dialect: 'mysql'
});

const initSequelize = async () => {
	try {
		await sequelizeDb.authenticate();
		console.log(`Connected to db: ${db}`)
	} catch (err) {
		console.error(`Error connecting to db : ${err}`)
	}
}

initSequelize();

module.exports = sequelizeDb;
