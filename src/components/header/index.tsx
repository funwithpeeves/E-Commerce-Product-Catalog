import wingman1 from "/wingman1.png";
import wingman from "/wingman.png";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../dark mode/DarkModeToggle";

const Header: FC = () => {
  const [activeTab, setActiveTab] = useState<"stores" | "experts">("stores");

  const demoLink = "https://calendly.com/nalingupta";

  const handleClick = () => {
    window.open(demoLink, "_blank"); // Open in a new tab
  };

  return (
    <header className="flex flex-wrap items-center justify-between w-full bg-yellow-50 px-4 py-3 md:px-6 md:py-4">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img className="w-10 h-10 md:w-12 md:h-12" src={wingman} alt="Logo" />
        <img
          className="max-h-8 md:max-h-12 lg:max-h-10 w-auto"
          src={wingman1}
          alt="Wingman Logo"
        />
      </div>

      {/* Navigation Section */}
      <nav className="flex gap-4 bg-orange-100 py-1 px-2 rounded">
        <Link to="/">
          <button
            onClick={() => setActiveTab("stores")}
            className={`px-3 py-2 md:px-4 rounded ${
              activeTab === "stores"
                ? "bg-yellow-100 text-black"
                : "text-gray-500"
            }`}
          >
            For Stores
          </button>
        </Link>
        <Link to="/forexperts">
          <button
            onClick={() => setActiveTab("experts")}
            className={`px-3 py-2 md:px-4 rounded ${
              activeTab === "experts"
                ? "bg-yellow-100 text-black"
                : "text-gray-500"
            }`}
          >
            For Experts
          </button>
        </Link>
      </nav>

      {/* Right Side: Schedule Demo + Dark Mode Toggle */}
      <div className="flex items-center gap-4 mt-2 md:mt-0">
        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {/* Schedule Demo Button */}
        <button
          onClick={handleClick}
          className="bg-green-800 text-white px-4 py-2 md:px-6 rounded whitespace-nowrap"
        >
          Schedule Demo
        </button>
      </div>
    </header>
  );
};

export default Header;
