//now here we will create all the CRUD operation routes

const express = require("express");
const router = express.Router();
const zod = require("zod");
const { authMiddleware } = require("../middleware/authMiddleware");
const { Notes, User } = require("../db/db");
const { title } = require("process");

//create endpoint

const createSchema = zod.object({
  title: zod.string(),
  content: zod.string(),
});

//create notes
router.post("/create", authMiddleware, async (req, res) => {
  const { success } = createSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  }

  //create a new note
  //here we will receive the req.userId form the middleware of the authorized user
  try {
    const newNote = await Notes.create({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.userId,
    });

    //also add the objectId of notes to the user
    await User.findByIdAndUpdate(req.userId, {
      $push: { notes: newNote._id },
    });

    return res.status(200).json({
      message: "Notes added succesfully",
    });
  } catch (err) {
    return res.status(411).json({
      message: "Unable to add notes",
    });
  }
});

//update notes
router.post("/update/:noteId", authMiddleware, async (req, res) => {
  try {
    const {noteId} = req.params;

    const user = await User.findOne({
      _id: req.userId,
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    //check if the given noteId is present in notes array inside user
    if(!user.notes.includes(noteId)){
      return res.status(403).json({
        message: "This note does not belong to this user",
      });
    }

    const updatedNote = await Notes.findOneAndUpdate({
      _id : noteId
    },{
      title : req.body.title,
      content : req.body.content
    }, {
      new : true
    })

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message : "Note updated sucessfully",
      note : {
        title : updatedNote.title,
        content : updatedNote.content
      }
    })

  } catch (err) {
    return res.status(411).json({
      message: "Unable to update the data",
    });
  }
});

//read all notes
router.get("/read", authMiddleware, async (req, res) => {
  try {
    //find the user which has logged in
    const findUser = await User.findOne({
      _id: req.userId,
    });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // if we found the user
    // we have an array ids of all the notes created by that user
    const idArray = findUser.notes;
    //here we have the notes array(ids) which is present in User database
    //we have to fetch all the notes present at that ids from the Notes database

    const notesArray = await Notes.find({ _id: { $in: idArray } }); //this will fetch all the notes in single database call
    const formattedNotes = notesArray.map((note) => ({
      title: note.title,
      content: note.content,
    }));

    return res.status(200).json({
      formattedNotes,
    });
  } catch (err) {
    return res.status(411).json({
      message: "Unable to fetch the data",
    });
  }
});

//delete notes

router.delete("/delete/:noteId", authMiddleware, async (req, res) => {
  try {
    const { noteId } = req.params;
    console.log(noteId);
    //find the user first
    const user = await User.findOne({
      _id: req.userId,
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    //check if the note id is present in the user's note array
    if (!user.notes.includes(noteId)) {
      return res.status(403).json({
        message: "This note does not belong to this user",
      });
    }

    //delete this note form the Note's Collection
    const deleteNote = await Notes.findOneAndDelete({
      _id: noteId,
    });

    if (!deleteNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    //now as we have deleted the note from the Notes collection
    //we need to remove that noteId form the Users collection
    user.notes = user.notes.filter((id) => id.toString() !== noteId);
    await user.save();

    return res.status(200).json({
      message: "Note deleted Sucessfully",
    });
  } catch (err) {
    return res.status(411).json({
      message: "Unable to delete the data",
    });
  }
});

module.exports = router;

//one way to fetch all the notes
// for (const id of idArray) {
//   const allNotes = await Notes.findOne({
//     _id: id,
//   });
//   if (allNotes) {
//     notesArray.push({
//       title: allNotes.title,
//       content: allNotes.content,
//     });
//   }
// }
