const Covid = require('../models/covid');
const express = require('express');
const router = express.Router();

// Endpoint for Adding data
router.post('/', async(req, res) => {
    let covid = new Covid({ country: req.body.country, totalCases: req.body.totalCases, recoveredCases: req.body.recoveredCases});

    try {
        covid = await covid.save();
        res.send(covid);
    } catch(error) {
        res.status(500).send('Something went wrong..');
    }
});

//Endpoint to view all data
router.get('/', async(req,res) => {
    try {
        const query = await Covid.find();
        res.send(query);
    } catch(error) {
        res.status(500).send('Something went wrong');
    }
});

// Endpoint to view one specific country
router.get('/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const doc = await Covid.findOne({ _id: id });
        res.send(doc);
    } catch(error) {
        res.status(500).send('Something went wrong');
    }
});

// Endpoint to update a country
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const doc = await Covid.findOne({ _id: id });

        if (req.body.country) {
            res.json({'msg': 'Not allowed'});
        }

        let updatedTotalCases = 0;
        if (req.body.totalCases) {
            updatedTotalCases = req.body.totalCases;
        } else {
            updatedTotalCases = doc.totalCases;
        }

        let updatedRecoveredCases = 0;
        if(req.body.recoveredCases) {
            updatedRecoveredCases = req.body.recoveredCases;
        } else {
            updatedRecoveredCases = doc.recoveredCases;
        }

        const update = { totalCases: updatedTotalCases, recoveredCases: updatedRecoveredCases };
        const updated = await doc.updateOne(update);
        res.send(updated);
    } catch(error) {
        res.status(500).send('Something went wrong');
    }
});

// Endpoint to delete data
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const del = await Covid.deleteOne({ _id: id });
        res.send(del);
    } catch(error) {
        res.status(500).send('Something went wrong..');
    }
});

module.exports = router;