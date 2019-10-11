module.exports = (app)=> {
    const notes = require('../controller/notes.controller.js');
    //create a note
    app.post('/notes',notes.create);
    //get all the notes
    app.get('/notes',notes.findAll);
    //get specific note
    app.get('/notes/:noteId',notes.findOne);
    //update the note
    app.put('/notes/:noteId',notes.update);
    //delete the note
    app.delete('/notes/:noteId',notes.delete);
}