const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/index');

const Person = db.define('person', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	profession: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: false,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

Person.sync();

const getAll = async () => {
	try {
		const people = await Person.findAll();
		return people;
	} catch (err) {
		console.error(err)
	}
}

const create = async (person) => {
	try {
		const newPerson = await Person.create({
			firstName: person.firstName,
			lastName: person.lastName,
			profession: person.profession && person.profession,
		});
		return newPerson;
	} catch (err) {
		console.error(err)
	};
};

const getBy = async (option) => {
	try {
		const person = await Person.findOne({
			where: option,
		})
		return person
	} catch (err) {
		console.error(err)
	};
};

const update = async (id, options) => {
	console.log(options)
	try {
		const updatedPerson = await Person.update(options, { where: { id } });
		return updatedPerson;
	} catch (err) {
		console.error(err)
	}
}

const remove = async (id) => {
	try {
		const deleted = await Person.destroy({
			where: { id }
		})
	} catch (err) {
		console.error(err)
	}
}


module.exports = {
	getAll,
	create,
	getBy,
	update,
	remove
}
