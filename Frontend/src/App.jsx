import { Route, Routes } from "react-router"
import HomePage from "./pages/Home"
import CreateNote from "./pages/CreateNote"
import NoteDetails from "./pages/NoteDetails"
import toast from "react-hot-toast";

function App() {

  return (
    <div data-theme = "luxury">
      <Routes>
        <Route path="/" element= {<HomePage />} />
        <Route path="/create" element= {<CreateNote />} />
        <Route path="/note/:id" element= {<NoteDetails />} />
      </Routes>
    </div>
  )
}

export default App
