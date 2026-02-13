import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `brutal-nav-link ${isActive ? "active" : ""}`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `mobile-nav-link ${isActive ? "active" : ""}`;

  return (
    <>
      <header className="w-full border-b border-[var(--brutal-border)] bg-[var(--brutal-bg)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="brutal-container h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 text-[var(--brutal-text)] no-underline">
            <div className="w-2 h-6 bg-[var(--brutal-accent)] rounded-[10px]"></div>
            <h1 className="font-display text-sm font-bold tracking-wide uppercase hidden sm:block">
              BITSAT // PREDICTOR
            </h1>
            <h1 className="font-display text-sm font-bold tracking-wide uppercase sm:hidden">
              BITSAT
            </h1>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>
              Main
            </NavLink>
            <NavLink to="/working" className={navLinkClass}>
              Under The Hood
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger-btn md:hidden ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay md:hidden ${mobileOpen ? "open" : ""}`}>
        <button
          className={`hamburger-btn open`}
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
          style={{ position: "absolute", top: "14px", right: "20px", zIndex: 101 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="mobile-nav-content">
          <NavLink to="/" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Main
          </NavLink>
          <NavLink to="/working" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Under The Hood
          </NavLink>
          <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            About Us
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
