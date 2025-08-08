import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContextType } from '../types';
import { useAuth } from './AuthContext';
import { updateUserPrefs } from "../lib/auth"

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const initTheme = async () => {
      try {
        if (user?.prefs?.theme) {
          setIsDark(user.prefs.theme === "dark");
        } else {
          // If user has no pref yet, fall back to localStorage
          const saved = localStorage.getItem("theme");
          setIsDark(saved ? JSON.parse(saved) : false);
        }
      } catch {
        // Not logged in, use localStorage
        const saved = localStorage.getItem("theme");
        setIsDark(saved ? JSON.parse(saved) : false);
      }
    };
    initTheme();
  }, []);


  useEffect(() => {
    const applyTheme = async () => {
      localStorage.setItem("theme", JSON.stringify(isDark));

      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      try {
        await updateUserPrefs({ theme: isDark ? "dark" : "light" });
      } catch {
        // not logged in, skip
      }
    };
    applyTheme();
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

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