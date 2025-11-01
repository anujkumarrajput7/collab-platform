import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force dark theme globally
if (!document.documentElement.classList.contains('dark')) {
  document.documentElement.classList.add('dark');
}

// Auto-refresh on browser back/forward navigation
window.addEventListener('popstate', () => {
  // Give router a tick, then hard-reload to fetch fresh data
  setTimeout(() => location.reload(), 0);
});

createRoot(document.getElementById("root")!).render(<App />);
