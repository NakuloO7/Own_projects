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

//read all notes
router.get("/read", authMiddleware, async (req, res) => {
  //find the user which has logged in
  const findUser = await User.findOne({
    _id: req.userId,
  });

  // console.log("Inside the read route" + findUser)
  // if we found the user
  // we have an array ids of all the notes created by that user
  const idArray = findUser.notes;
  console.log(idArray);
  console.log(idArray[0]);

  for(const id of idArray){
    const allNotes = await Notes.findOne({
        _id : id
    });
    console.log(allNotes.title);
    console.log(allNotes.content);
  }

//   const noteF = await Notes.findOne({
//     _id: idArray[0],
//   });
//   console.log(noteF);
//   console.log(noteF.title);
//   console.log(noteF.content);

  /*
    const notes = await User.findById(req.userId).populate({
        path : 'notes',
        select : 'title content'
    })
    */

  res.json({
    message: "User found",
  });
});

//delete notes

module.exports = router;
