"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileDropdown: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaUserCircle size={32} className="text-primary" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-surface rounded-lg shadow-lg text-sm text-textPrimary"
        >
          <ul className="divide-y divide-border">
            <li className="p-3 hover:bg-primary hover:text-white cursor-pointer">
              Profile
            </li>
            <li className="p-3 hover:bg-primary hover:text-white cursor-pointer">
              Settings
            </li>
            <li
              className="p-3 text-error hover:bg-error hover:text-white cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
