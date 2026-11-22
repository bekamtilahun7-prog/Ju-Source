import { Menu, X, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAuthenticated = Boolean(isLoggedIn || user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/#contact");
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleMobileContactClick = () => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/#contact");
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 z-[999] w-full bg-navy/80 backdrop-blur-md px-6 py-4 border-b border-[var(--border)]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <p className="text-xl font-bold text-[var(--heading)]">JU-Source</p>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="size-8 rounded-full bg-[var(--navy-blue)] border border-[var(--border)] flex items-center justify-center text-white font-semibold hover:brightness-110 transition cursor-pointer shadow-[0_0_0_4px_rgba(183,198,255,0.35)]"
                  aria-label="Open profile menu"
                >
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-[var(--border)] rounded-lg shadow-lg overflow-hidden z-[1001]">
                    <div className="px-4 py-3 border-b border-[var(--border)]">
                      <p className="text-[var(--card-heading)] text-sm font-semibold">
                        {user?.name || "User"}
                      </p>
                      <p className="text-[var(--muted-text)] text-xs truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-[var(--body-text)] hover:bg-[var(--page-bg)] transition flex items-center gap-2"
                    >
                      <LogOut className="size-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : isHomePage ? (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block px-6 py-2 bg-[var(--navy-blue)] rounded-full text-white hover:brightness-110 transition shadow-[0_8px_20px_rgba(183,198,255,0.25)]"
              >
                Get Started
              </button>
            ) : null}

            <button className="md:hidden" onClick={() => setIsOpen(true)}>
              <Menu className="text-[var(--body-text)]" />
            </button>
          </div>
        </div>
      </motion.nav>

      {isOpen && (
        <div className="fixed inset-0 z-[1000] bg-[var(--page-bg)]/95 flex flex-col items-center justify-center gap-6 md:hidden">
          {!isAuthenticated && (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="px-6 py-2 bg-[var(--navy-blue)] rounded-full text-white hover:brightness-110 transition shadow-[0_8px_20px_rgba(183,198,255,0.45)]"
            >
              Sign In
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={async () => {
                setIsOpen(false);
                await handleLogout();
              }}
              className="px-6 py-2 border border-[var(--border)] rounded-full text-[var(--body-text)] hover:bg-white transition flex items-center gap-2"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </button>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 bg-[var(--navy-blue)] p-2 rounded text-white shadow-[0_8px_20px_rgba(183,198,255,0.45)]"
          >
            <X />
          </button>
        </div>
      )}
    </>
  );
}
