import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContextType } from '../types';
import { updateUserPrefs, getAppwriteUser } from "../lib/auth"

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const initTheme = async () => {
      try {
        const user = await getAppwriteUser();
        const prefTheme = user?.prefs?.theme || "light";
        setIsDark(prefTheme === "dark");

        // Apply theme immediately
        if (prefTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (err) {
        console.error("Error fetching user theme preference:", err);
      }
    };

    initTheme();
  }, []);

  // Toggle and update Appwrite preference
  const toggleTheme = async () => {
    try {
      const newTheme = !isDark ? "dark" : "light";
      setIsDark(!isDark);

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      await updateUserPrefs({ theme: newTheme });
    } catch (err) {
      console.error("Error updating theme preference:", err);
    }
  };


  // const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};