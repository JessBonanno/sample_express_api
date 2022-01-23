const express = require('express');
const router = express.Router();
const peopleModel = require('../models/people');


// get all people endpoint

router.get('/', async (req, res, next) => {
	try {
		const allPeople = await peopleModel.getAll();
		if (allPeople) {
			res.status(200).json(allPeople);
		} else {
			res.status(404).json({ message: "No people found in DB" })
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Sorry internal server error' })
	}
});

// create new person endpoint

router.post('/', async (req, res, next) => {
	const { person } = req.body;
	try {
		const newPerson = await peopleModel.create(person);
		if (newPerson) {
			res.status(200).json({ message: 'New person added successfully', newPerson: newPerson })
		} else {
			res.status(400).json({ message: 'Error creating new person' })
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Sorry internal server error' })
	}
})

// get a person by <some attribute>

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const person = await peopleModel.getBy(parseInt(id));
		if (person) {
			res.status(200).json(person)
		} else {
			res.status(404).json({ message: 'Person by that Id not found' })
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Sorry internal server error' })
	}
})

// get a person by <some attribute>

router.put('/:id', async (req, res, next) => {
	const update = req.body;
	const id = parseInt(req.params.id);
	try {
		const personToUpdate = await peopleModel.getBy(id);
		if (!personToUpdate) {
			res.status(404).json({ message: 'Person by that Id not found' })
		} else {
			const updateId = await peopleModel.update(id, update);
			if (!updateId) {
				res.status(400).json({ message: 'Error updating that person' })
			} else {
				const updatedPerson = await peopleModel.getBy(id);
				res.status(200).json(updatedPerson)
			}
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Sorry internal server error' })
	}
})

// get a person by <some attribute>

router.delete('/:id', async (req, res, next) => {
	const id = parseInt(req.params.id);
	try {
		const personToDelete = await peopleModel.getBy(id);
		if (!personToDelete) {
			res.status(404).json({ message: 'Person by that Id not found' })
		} else {
			await peopleModel.remove(id);
			res.status(201).json({ message: 'Person successfully deleted from DB' })
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Sorry internal server error' })
	}
})


module.exports = router;
