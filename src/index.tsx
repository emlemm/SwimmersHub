import * as React from "react";
import { createRoot } from 'react-dom/client';
import HomePage from "./views/home";
import NavBar from "./views/nav"
import 'bootstrap/dist/css/bootstrap.min.css';

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(
  <React.StrictMode>
    <NavBar />
    <HomePage />
  </React.StrictMode>
);