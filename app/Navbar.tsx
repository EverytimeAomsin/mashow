"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFilter } from "./FilterContext";
import { Modal, Box, Typography, IconButton, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { setSelectedTag, selectedTag } = useFilter();
  const isHomePage = pathname === "/";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tag: string | null
  ) => {
    if (isHomePage) {
      e.preventDefault();
      setSelectedTag(tag);
      // Scroll to gallery section
      setTimeout(() => {
        const galleryElement = document.getElementById("gallery");
        if (galleryElement) {
          galleryElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
    // If not home page, let the default navigation happen
  };

  const isActive = (href: string, filterTag: string | null = null) => {
    if (isHomePage && filterTag !== null) {
      // On home page, check if filter tag matches
      return selectedTag === filterTag;
    }
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href: string, filterTag: string | null = null) => {
    const active = isActive(href, filterTag);
    const base =
      "block py-2 px-3 rounded-sm md:p-0 transition-colors duration-200";
    const inactive =
      "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
    const activeCls =
      "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500";
    // Use same base classes to prevent layout shift
    return `${base} ${active ? activeCls : inactive}`;
  };

  // Reset filter when navigating away from home page
  useEffect(() => {
    if (!isHomePage) {
      setSelectedTag(null);
    }
  }, [isHomePage, setSelectedTag]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-white border-gray-200 dark:bg-gray-900 shadow"
      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex flex-col items-center text-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setAboutModalOpen(true);
          }}
        >
          <span className="text-xl font-semibold text-gray-900 uppercase">
            Imp Manuschanok
          </span>
          <span className="text-sm text-gray-500 uppercase">
            Professional Stylist
          </span>
        </Link>

        {/* Hamburger toggle button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors duration-200"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              menuOpen ? "rotate-90" : "rotate-0"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu list */}
        <div
          className={`${
            menuOpen
              ? "max-h-screen opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          } w-full md:max-h-none md:opacity-100 md:translate-y-0 md:block md:w-auto transition-all duration-300 ease-in-out overflow-hidden`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="transform transition-all duration-300 ease-in-out">
              <Link
                href="/"
                className={linkClass("/", isHomePage ? "Hightlight" : null)}
                aria-current={
                  isActive("/", isHomePage ? "Hightlight" : null)
                    ? "page"
                    : undefined
                }
                onClick={(e) => handleNavClick(e, "Hightlight")}
                style={{ display: "inline-block", minWidth: "fit-content" }}
              >
                Signature Works
              </Link>
            </li>
            <li className="transform transition-all duration-300 ease-in-out">
              <Link
                href="/"
                className={linkClass("/", isHomePage ? "Recent_Work" : null)}
                aria-current={
                  isActive("/", isHomePage ? "Recent_Work" : null)
                    ? "page"
                    : undefined
                }
                onClick={(e) => handleNavClick(e, "Recent_Work")}
                style={{ display: "inline-block", minWidth: "fit-content" }}
              >
                Recent Work
              </Link>
            </li>
            <li className="transform transition-all duration-300 ease-in-out">
              <Link
                href="/"
                className={linkClass("/", isHomePage ? "Commercials" : null)}
                aria-current={
                  isActive("/", isHomePage ? "Commercials" : null)
                    ? "page"
                    : undefined
                }
                onClick={(e) => handleNavClick(e, "Commercials")}
                style={{ display: "inline-block", minWidth: "fit-content" }}
              >
                Commercials
              </Link>
            </li>
            <li className="transform transition-all duration-300 ease-in-out">
              <Link
                href="/"
                className={linkClass("/", isHomePage ? "Beauty" : null)}
                aria-current={
                  isActive("/", isHomePage ? "Beauty" : null)
                    ? "page"
                    : undefined
                }
                onClick={(e) => handleNavClick(e, "Beauty")}
                style={{ display: "inline-block", minWidth: "fit-content" }}
              >
                Beauty
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* About Modal */}
      <Modal
        open={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={aboutModalOpen}>
          <Box
            sx={{
              position: "relative",
              width: "90vw",
              maxWidth: 800,
              maxHeight: "90vh",
              bgcolor: "white",
              boxShadow: 24,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header with Close Button - Fixed */}
            <Box
              sx={{
                position: "relative",
                padding: 3,
                paddingBottom: 0,
                flexShrink: 0,
              }}
            >
              <IconButton
                onClick={() => setAboutModalOpen(false)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "gray",
                  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Scrollable Content */}
            <Box
              sx={{
                padding: 4,
                paddingTop: 0,
                overflow: "auto",
                flex: 1,
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                  marginBottom: 3,
                  color: "#1a1a1a",
                }}
              >
                Imp Manuschanok
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  lineHeight: 1.8,
                  color: "#4a4a4a",
                  fontSize: "1.1rem",
                }}
              >
                With over a decade of hands on experience, Imp Manuschanok is a
                Bangkok based wardrobe stylist known for her thoughtful, detail
                oriented approach and adaptability across a wide range of creative
                projects. She has collaborated with respected advertising
                agencies, directors, and photographers from around the world,
                bringing a practical yet creative perspective to every production.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  lineHeight: 1.8,
                  color: "#4a4a4a",
                  fontSize: "1.1rem",
                  marginTop: 2,
                }}
              >
                Now working as a freelancer, Imp continues to bring her styling
                expertise to diverse projects from TV commercials and photo shoots
                to viral content and beyond, always with a strong sense of
                collaboration and a commitment to quality.
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </nav>
  );
}
