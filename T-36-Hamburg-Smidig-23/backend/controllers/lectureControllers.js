const Lecture = require('../schema/lecturesModel');
const mongoose = require('mongoose');

// GET all lectures
const getLectures = async (req, res) => {
    const lectures = await Lecture.find({});

    res.status(200).json(lectures)
}

// GET one lecture
const getLecture = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No lecture with that id'});
    }

    const lecture = await Lecture.findById(id);

    if(!lecture){
        return res.status(404).json({error: 'No lecture with that id'})
    }

    res.status(200).json(lecture);
}

// DELETE a lecture
const deleteLecture = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No lecture with that id'});
    }

    const lecture = await Lecture.findByIdAndDelete({_id: id});

    if(!lecture){
        return res.status(404).json({error: 'No lecture with that id'});
    }

    res.status(200).json(lecture)
}

// UPDATE a lecture
const updateLecture = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No lecture with that id'});
    }

    const lecture = await Lecture.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!lecture){
        return res.status(404).json({error: 'No lecture with that id'});
    }

    res.status(200).json(lecture);
}

module.exports = {
    getLectures,
    getLecture,
    deleteLecture,
    updateLecture
};