const Notes = require('../models/noteModel');

const noteController = {
    getNotes: async (req, res) => {
        try {
            const notes = await Notes.find({user_id: req.user.id});

            res.status(200).json({
                status: 'success',
                data: {
                    notes
                }
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createNote: async (req, res) => {
        try {
            const {title, content, date} = req.body;
            
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                username: req.user.name
            });
            
            await newNote.save();

            res.status(200).json({
                message: "Note created successfully"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    deleteNote: async (req, res) => {
        try {
            await Notes.findByIdAndDelete(req.params.id);
            res.json({message: "Note deleted"});
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    updateNote: async (req, res) => {
        try {
            const { title, content, date } = req.body;

            await Notes.findOneAndUpdate({_id: req.params.id}, {
                title,
                content,
                date
            });

            res.json({message: "Note updated"});
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    getNote: async (req, res) => {
        try {
            const note = await Notes.findById(req.params.id);

            res.json({note});
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = noteController;