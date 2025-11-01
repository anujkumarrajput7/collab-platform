import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force dark theme globally
if (!document.documentElement.classList.contains('dark')) {
  document.documentElement.classList.add('dark');
}

// Disable forced hard-reload on back; SPA routing keeps session intact.

createRoot(document.getElementById("root")!).render(<App />);
