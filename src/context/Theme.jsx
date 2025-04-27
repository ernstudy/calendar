import React, { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const themeToggle = () => {
    const newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.className =
      theme == "light" ? "light-mode" : "dark-mode";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeToggle, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};

export { ThemeProvider, useThemeContext };
