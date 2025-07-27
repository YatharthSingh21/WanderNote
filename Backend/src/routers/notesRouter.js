import express from "express";
import { deleteNotes, getNotes, postNotes, updateNotes, getNoteById } from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getNotes)
router.get("/:id", getNoteById)
router.post("/", postNotes)
router.put("/:id", updateNotes)
router.delete("/:id", deleteNotes)

export default router;