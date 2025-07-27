import { Link } from "react-router";
import { Plus } from "lucide-react";

function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-primary">WanderNote</h1>
      </div>

      <div className="flex-none space-x-2">

        {/* New Note button */}
        <Link to="/create" className="btn btn-primary gap-2">
            <Plus className="h-4 w-4" />
            New Note
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
