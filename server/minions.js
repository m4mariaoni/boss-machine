const express = require('express');
const minionsRouter = express.Router();
const db = require('./db')



minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = db.getFromDatabaseById('minions', id);
    if(minion){
        req.minion = minion;
        next();
    }else {
        res.status(404).send();
    }
});

//get
minionsRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    res.send(minions);
});

//post
minionsRouter.post('/', (req, res, next) => {  
    const newMinion = db.addToDatabase('minions',req.body);
    res.status(201).send(newMinion);
});

//getById
minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = req.minion;
    if(!minion){
        res.status(404).send();
    }else{
        res.send(minion);

    }
});

//update
minionsRouter.put('/:minionId',(req, res, next) => {
    const updateMinion = db.updateInstanceInDatabase(req.minion,req.body)
    if(minion){
        res.send(updateMinion)
    }else{
        res.status(400).send();
    }
});

//delete
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = db.deleteMinion(req.params.minionId);
    if(deletedMinion){
        res.status(204).send();
    }else{
        res.status(404).send();
    }
    
});


module.exports = minionsRouter;