import NavBar from "../Components/Navbar";
import RateLimitedUI from "../Components/RateLimitedUI";
import NoteCard from "../Components/NoteCard";
import NotesNotFound from "../Components/NotesNotFound.jsx";
import {useState, useEffect} from "react";
import toast from "react-hot-toast";
import axios from "axios";

function homePage(){
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoadingState] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/notes");
            console.log(res.data);
            setNotes(res.data);
            setIsRateLimited(false);
        } catch (error) {
            console.log("Error fetching notes");
            console.log(error.response);
            if (error.response?.status === 429) {
            setIsRateLimited(true);
            } else {
            toast.error("Failed to load notes");
            }
        } finally {
            setLoadingState(false);
        }
        };

        fetchNotes();
    }, []);

    return(
        <div>
            <NavBar />
            {isRateLimited && <RateLimitedUI />}
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

                {notes.length === 0 && !isRateLimited && <NotesNotFound />}

                {notes.length > 0 && !isRateLimited && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                    <NoteCard key={note._id} note={note} setNotes={setNotes} />
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}

export default homePage;
