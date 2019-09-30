const Note = require('../models/note.model.js');

exports.create = (req,res) =>{
    console.log(req.body);
    //validating the notes
    if(!req.body){
        return res.status(400).send({
            message : "Note can not be created as empty"
        });
    }   
    //creating new note
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    note.save()
    .then(data=> {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : "Something Error while creating the notes"
        });
    });

};
exports.findAll = (req,res) => {
    Note.find()
    .then(notes=>{
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message : "Error while retrieving the data"
        });
    });

};
exports.findOne = (req,res) => {
 Note.findById(req.params.noteId)
 .then(note => {
     if(!note){
         return res.status(404).send({
             message : "notes with specified note id is not found"
         });
     }
     res.send(note);
 }).catch(err =>{
     if(err.kind === 'objectId'){
         return res.status(404).send ({
           message : "Notes not found with Id " +req.params.noteId  
         });
     }
     return res.status(500).send({
         message : "error retriving the note with id " +req.params.noteId
     });
 });

};
exports.update = (req,res) => {
    if(!req.body.title){
        res.status(400).send ({
            message : "Title can not be blank"
        });
    }
    Note.findByIdAndUpdate(req.params.noteId , {
        title: req.body.title,
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note){
            return res.status(404).send({
                message : "notes with specified note id is not found"
            });
        }
        res.send(note);
    }).catch(err =>{
        if(err.kind === 'objectId'){
            return res.status(404).send ({
              message : "Notes not found with Id " +req.params.noteId  
            });
        }
        return res.status(500).send({
            message : "error retriving the note with id " +req.params.noteId
        });
    });
};
exports.delete = (req,res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
        return res.status(404).send({
            message : "notes with specific id not found " +req.params.noteId
        });
    }
    res.send({message : "notes deleted successfully"});
}).catch(err => {
    if(err.kind === 'objectId'){
        return res.status(404).send ({
          message : "Notes not found with Id " +req.params.noteId  
        });
    }
    return res.status(500).send({
        message : "error retriving the note with id " +req.params.noteId
    });
});

};