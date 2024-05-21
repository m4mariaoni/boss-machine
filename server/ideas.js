const express = require('express');
const ideasRouter = express.Router();
const db = require('./db')


ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.status(404).send();
    }
  });
  

//get
ideasRouter.get('/', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas');
    if(ideas){
        res.send(ideas);
    }else{
        res.status(404).send();
    }
});

//post
ideasRouter.post('/', (req, res, next) => {
     const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

//getById
ideasRouter.get('/:id', (req, res, next) => {
    const ideaId = req. params.ideaId;
    const idea = db.getFromDatabaseById('ideas', ideaId);
    if(idea){
        res.send(idea);
    }else{
        res.status(404).send();
    }
});

//put
ideasRouter.put('/:id', (req, res, next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body); 
    if(updatedIdea){
        res.status(200).send(updatedIdea);
    }else{
        res.status(404).send();
    }
});

//delete
ideasRouter.delete('/:id',(req, res, next) => {
    const deletedIdea = db.deleteFromDatabasebyId('ideas', req.params.id);
    if(deletedIdea){
        res.status(204).send();
    }else{
        res.status(404).send();
    }

});


module.exports = ideasRouter;