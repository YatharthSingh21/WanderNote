import Note from "../DBmodel/Note.js"

export async function getNotes(req, res){
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getNotes controller", error);
        res.status(500).send("Internal server error");
    }
}

export async function getNoteById(req,res){
    try {
        const currentNote = await Note.findById(req.params.id);
        if(!currentNote){
            return res.status(404).json({message: "Note Id does not exist"});
        }

        res.status(200).json(currentNote);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).send("Internal server error");           
    }
}

export async function postNotes(req,res){
    try {
        const {title, content} = req.body;
        if(!title || !content){
            return res.status(400).json({ message: "Title and content are required" });
        }
        const newNote = new Note({title, content});
        await newNote.save();
        res.status(201).json({message: "Note created successfully"});
    } catch (error) {
        console.error("Error in postNotes controller", error);
        res.status(500).send("Internal server error");        
    }
}

export async function updateNotes(req, res){
    try {
        const {title, content} = req.body;
        if(!title || !content){
            return res.status(400).json({ message: "Title and content are required"});
        }
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true,});

        if(!updatedNote){
            return res.status(404).json({message: "Note Id does not exist"});
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        console.error("Error in updateNotes controller", error);
        res.status(500).send("Internal server error");          
    }
}

export async function deleteNotes(req,res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message: "Note Id does not exist"});
        }

        res.status(200).json({message:"Note Deleted Successfully"});
    } catch (error) {
        console.error("Error in deleteNotes controller", error);
        res.status(500).send("Internal server error");           
    }
}