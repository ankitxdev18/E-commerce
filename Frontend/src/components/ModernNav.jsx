import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Package,
  Home,
  Info,
} from "lucide-react";
import { logoutUser } from "../store/slices/userSlice";
import { Button } from "./ui/Base";

const ModernNav = () => {
  const { user } = useSelector((state) => state.userReducer);
  const cartItems = user?.cart?.length || 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchActive(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const NavLink = ({ to, label, icon: Icon }) => (
    <motion.a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        setMobileMenuOpen(false);
      }}
      className="flex items-center gap-2 text-neutral-700 hover:text-blue-600 transition-colors font-medium text-sm cursor-pointer"
      whileHover={{ x: 4 }}
    >
      {Icon && <Icon size={18} />}
      {label}
    </motion.a>
  );

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/")}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Package className="text-white" size={24} />
                </div>
                <span className="font-bold text-xl text-neutral-900 hidden sm:block">
                  ShopHub
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/" label="Products" icon={Home} />
              <NavLink to="/about" label="About" icon={Info} />
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-xs mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 cursor-pointer hover:text-blue-600"
                  size={18}
                  onClick={handleSearch}
                />
              </form>
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/cart")}
                className="relative p-2 text-neutral-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart size={22} />
                {cartItems > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {cartItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Auth Buttons */}
              {user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <ChevronDown size={18} />
                  </motion.button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-neutral-200">
                          <p className="text-sm font-medium text-neutral-900">
                            {user.username}
                          </p>
                          <p className="text-xs text-neutral-500">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={() => {
                              navigate("/settings");
                              setUserDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center gap-2 transition-colors"
                          >
                            <Settings size={16} />
                            Settings
                          </button>
                          {user.isAdmin && (
                            <button
                              onClick={() => {
                                navigate("/create-product");
                                setUserDropdownOpen(false);
                              }}
                              className="w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center gap-2 transition-colors"
                            >
                              <Package size={16} />
                              Create Product
                            </button>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-neutral-200"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/cart")}
                className="relative p-2 text-neutral-700"
              >
                <ShoppingCart size={20} />
                {cartItems > 0 && (
                  <motion.span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-700"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pb-4"
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <Search
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 cursor-pointer"
                    size={18}
                    onClick={handleSearch}
                  />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-neutral-200 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              <NavLink to="/" label="Products" />
              <NavLink to="/about" label="About" />

              <div className="pt-4 border-t border-neutral-200">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-2 mb-2"
                    >
                      <Settings size={18} />
                      Settings
                    </button>
                    {user.isAdmin && (
                      <button
                        onClick={() => {
                          navigate("/create-product");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-2 mb-2"
                      >
                        <Package size={18} />
                        Create Product
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <LogOut size={18} />
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
    </>
  );
};

export default ModernNav;
