import React, { useContext, useEffect, memo, FC } from "react";
import { ThemeContext } from "./ThemeContext"; 

const DarkModeToggle: FC = memo(() => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const root = document.documentElement; 
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="flex flex-col">
      <label className="mt-3 inline-flex items-center cursor-pointer">
        <span className="relative">
          <span className={`block w-10 h-6 ${theme === "dark" ? "bg-black" : "bg-pink-300" } rounded-full shadow-inner`} ></span>
          <span 
            className={`${
              theme === "dark"
                ? "bg-white transform translate-x-full"
                : "bg-red-500"
            } absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out`}
          >
            <input
              type="checkbox"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="absolute opacity-0 w-0 h-0"
            />
          </span>
        </span>
        <span className="ml-3 text-sm">{theme === "dark" ? "🌙" : "☀️"}</span>
      </label>
    </div>
  );
});

export default DarkModeToggle;
