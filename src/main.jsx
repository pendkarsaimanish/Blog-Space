import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.js";
import { ThemeProvider } from "./contexts/ThemeContext.js";
import { BlogProvider } from "./contexts/BlogContext.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BlogProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BlogProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
