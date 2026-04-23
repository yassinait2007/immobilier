"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Menu,
  LogOut,
  Heart,
  Calendar,
  UserCircle,
  X,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../context/authentication/auth-context";

import clsx from "clsx";
import { useAuthModal } from "@/context/authentication/auth-modal-context";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openAuthModal } = useAuthModal();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/contact", label: "Contact" },
    { href: "/about-us", label: "À propos" },
  ];

  // Handle scroll effect and close dropdown when clicking outside
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    navigate("/");
  };

  const toggleProfileDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleBecomeHost = () => {
    // Don't proceed if auth state is still loading
    if (loading) return;

    if (!isAuthenticated || !user) {
      // Open auth modal with callback to redirect after authentication
      openAuthModal("login", () => navigate("/become-host"));
      return;
    }
    
    // User is authenticated - navigate based on user type
    const destination = user.type === 'host' ? "/host-space" : "/become-host";
    navigate(destination);
  };

  // Get button text based on user type
  const getHostButtonText = () => {
    return isAuthenticated && user?.type === 'host' ? 'Mon espace' : 'Devenez hôte';
  };

  // Helper function to get user initials
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-primary/10"
            : "bg-white shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/assets/logo-footer.png"
                alt="Les Vacances d'Agadir"
                className="h-12 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={clsx(
                    "relative text-sm font-medium transition-all duration-300 px-6 py-2 rounded-xl",
                    location.pathname === link.href
                      ? "text-primary bg-primary/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(78,95,168,0.5)]"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center space-x-6">
              {/* Become Host Button - Desktop */}
              <Button
                onClick={handleBecomeHost}
                disabled={loading}
                className="hidden md:inline-flex bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getHostButtonText()}
              </Button>

              {/* User Menu */}
              {loading ? (
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20"
                  >
                    {/* Updated Avatar with actual profile image */}
                    <Avatar className="w-8 h-8">
                      <AvatarImage 
                        src={user?.profile} 
                        alt={`${user?.firstName} ${user?.lastName}`}
                        className="object-cover"
                      />
                      <AvatarFallback className={`${user?.type === 'host' ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} text-white text-xs font-bold`}>
                        {user ? getInitials(user.firstName, user.lastName) : <User className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown
                      className={clsx(
                        "w-4 h-4 text-gray-600 transition-transform duration-200",
                        isProfileDropdownOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 backdrop-blur-md">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          {/* Profile image in dropdown */}
                          <Avatar className="w-12 h-12">
                            <AvatarImage 
                              src={user?.profile} 
                              alt={`${user?.firstName} ${user?.lastName}`}
                              className="object-cover"
                            />
                            <AvatarFallback className={`${user?.type === 'host' ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} text-white font-bold`}>
                              {user ? getInitials(user.firstName, user.lastName) : <User className="w-6 h-6" />}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      {[
                        {
                          icon: UserCircle,
                          label: "Mon profil",
                          path: "/my-profile",
                        },
                        {
                          icon: MessageCircle,
                          label: "Messages",
                          path: "/inbox",
                        },
                        {
                          icon: Heart,
                          label: "Mes favoris",
                          path: "/favorites",
                        },
                        {
                          icon: Calendar,
                          label: "Mes réservations",
                          path: "/client/bookings",
                        },
                      ].map((item) => (
                        <button
                          key={item.path}
                          onClick={() => navigateTo(item.path)}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200"
                        >
                          <item.icon className="w-4 h-4 mr-3 text-gray-400" />
                          {item.label}
                        </button>
                      ))}

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-8">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="text-sm font-semibold text-gray-700 hover:text-primary transition-all duration-300 px-2 py-2"
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={() => openAuthModal("register")}
                    className="bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white px-10 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:scale-[1.03]"
                  >
                    S'inscrire
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-primary/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={clsx(
                      "block px-4 py-3 rounded-xl font-medium transition-all duration-300",
                      location.pathname === link.href
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-gray-700 hover:bg-primary/5 hover:text-primary"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth/User Menu */}
              <div className="mt-4 pt-4 border-t border-primary/10">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                  </div>
                ) : isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-primary/5 rounded-xl border border-primary/10">
                      {/* Mobile profile image */}
                      <Avatar className="w-10 h-10">
                        <AvatarImage 
                          src={user?.profile} 
                          alt={`${user?.firstName} ${user?.lastName}`}
                          className="object-cover"
                        />
                        <AvatarFallback className={`${user?.type === 'host' ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} text-white font-bold`}>
                          {user ? getInitials(user.firstName, user.lastName) : <User className="w-5 h-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    {/* Mon espace / Devenez hôte button for mobile */}
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleBecomeHost();
                      }}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gradient-to-r from-primary-light to-primary text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {getHostButtonText()}
                    </button>

                    {[
                      {
                        icon: UserCircle,
                        label: "Mon profil",
                        path: "/my-profile",
                      },
                      {
                        icon: MessageCircle,
                        label: "Messages",
                        path: "/inbox",
                      },
                      { icon: Heart, label: "Mes favoris", path: "/favorites" },
                      {
                        icon: Calendar,
                        label: "Mes réservations",
                        path: "/client/bookings",
                      },
                    ].map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateTo(item.path);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-300"
                      >
                        <item.icon className="w-5 h-5 mr-3 text-gray-400" />
                        {item.label}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Se déconnecter
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal("login");
                      }}
                      className="w-full px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-300 font-medium"
                    >
                      Se connecter
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal("register");
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-primary-light to-primary text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      S'inscrire
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleBecomeHost();
                      }}
                      disabled={loading}
                      className="w-full px-4 py-3 border-2 border-primary text-primary hover:bg-primary/5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {getHostButtonText()}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;