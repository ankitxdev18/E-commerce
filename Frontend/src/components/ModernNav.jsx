import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  LogOut,
  Settings,
  ChevronDown,
  Package,
  Home,
  Info,
} from "lucide-react";
import { logoutUser } from "../store/slices/userSlice";
import { Button } from "./ui/Base";

const navLinks = [
  { label: "Products", to: "/", icon: Home },
  { label: "About", to: "/about", icon: Info },
];

const ModernNav = () => {
  const { user } = useSelector((state) => state.userReducer);
  const cartItems = user?.cart?.length || 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/?search=${encodeURIComponent(query)}`);
    setSearchQuery("");
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-label="Primary navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-700 px-3 py-2 text-white shadow-md shadow-blue-100/20 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            aria-label="Go to homepage"
          >
            <Package size={20} />
            <span className="hidden sm:inline text-lg font-semibold tracking-tight">ShopHub</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium transition ${
                    isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                  }`
                }
              >
                <link.icon size={18} />
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex flex-1 justify-center px-4">
            <form onSubmit={handleSearch} role="search" className="relative w-full max-w-xl">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories"
                aria-label="Search products"
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 p-2 text-white shadow-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {cartItems > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                  {cartItems}
                </span>
              )}
            </button>

            {user ? (
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  aria-haspopup="true"
                  aria-expanded={String(userDropdownOpen)}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-slate-700 text-sm font-semibold text-white">
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </span>
                  <ChevronDown size={16} />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                      role="menu"
                    >
                      <div className="px-4 py-4 border-b border-slate-200">
                        <p className="text-sm font-semibold text-slate-900">{user.username}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <div className="space-y-1 p-2">
                        <button
                          type="button"
                          onClick={() => {
                            navigate("/settings");
                            setUserDropdownOpen(false);
                          }}
                          className="w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                          <Settings size={16} className="inline-block mr-2" />
                          Account settings
                        </button>
                        {user.isAdmin && (
                          <button
                            type="button"
                            onClick={() => {
                              navigate("/create-product");
                              setUserDropdownOpen(false);
                            }}
                            className="w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                          >
                            <Package size={16} className="inline-block mr-2" />
                            Add product
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full rounded-2xl px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50"
                        >
                          <LogOut size={16} className="inline-block mr-2" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate("/signin")}>Sign in</Button>
                <Button variant="primary" size="sm" onClick={() => navigate("/signup")}>Sign up</Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {cartItems > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                  {cartItems}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200"
          >
            <div className="px-4 pb-4 pt-3">
              <form onSubmit={handleSearch} role="search" className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 p-2 text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <Search size={18} />
                </button>
              </form>
              <div className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.to}
                    type="button"
                    onClick={() => {
                      navigate(link.to);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    {link.label}
                  </button>
                ))}
                {user ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/settings");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Settings
                    </button>
                    {user.isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          navigate("/create-product");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        Create Product
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full"
                      onClick={() => {
                        navigate("/signin");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() => {
                        navigate("/signup");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ModernNav;
