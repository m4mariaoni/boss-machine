const express = require('express');
const meetingsRouter = express.Router();
const db = require('./db')

//get
meetingsRouter.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.send(meetings);
  });
  
  // POST /api/meetings
  meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
  });
  
  // DELETE /api/meetings
  meetingsRouter.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase('meetings');
    res.status(204).send();
  });


  module.exports = meetingsRouter;