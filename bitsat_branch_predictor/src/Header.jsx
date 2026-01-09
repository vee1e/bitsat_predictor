import { NavLink, useLocation } from "react-router-dom";

function Header() {

    const location = useLocation();

    const map = {
        "/": "BITSAT-Predictor",
        "/working": "How It Works",
        "/about": "About",
    };

    const navButtonClass = ({ isActive }) =>
    `px-2 py-2 rounded-full transition
    ${isActive
    ? "bg-violet-700 text-white shadow-lg"
    : "bg-slate-950 text-violet-300 hover:bg-slate-800"}`;


    const title = map[location.pathname] || "BITSAT Branch Predictor";

    return (
        <header className="w-full">
            <nav className="relative flex items-center justify-end p-4">

                <h1 className="absolute left-1/2 -translate-x-1/2 text-blue-100 text-3xl font-semibold font-mono">
                    {title}
                </h1>

                <div className="flex gap-2">
                    <NavLink to="/" className={navButtonClass}>
                        <button className="px-4 py-2 text-cyan-300 bg-slate-950 rounded-full hover:bg-slate-800  font-mono">
                            Home
                        </button>
                    </NavLink>

                    <NavLink to="/working" className={navButtonClass}>
                        <button className="px-4 py-2 text-cyan-300 bg-slate-950 rounded-full hover:bg-slate-800 transition font-mono">
                            Working
                        </button>
                    </NavLink>

                    <NavLink to="/about" className={navButtonClass}>
                        <button className="px-4 py-2 text-cyan-300 bg-slate-950 rounded-full hover:bg-slate-800 transition font-mono">
                            About
                        </button>
                    </NavLink>
                </div>
            </nav>
        </header>
        );
    }

export default Header;
