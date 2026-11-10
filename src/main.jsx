import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// No <StrictMode>: the engine owns the WebGL canvas and global listeners.
createRoot(document.getElementById("root")).render(<App />);
