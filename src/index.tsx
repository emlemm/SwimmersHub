import * as React from "react";
import { createRoot } from 'react-dom/client';
import { HomePage } from "./views/home";
import { NavBar } from "./views/nav";
import { Footer } from "./views/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginPage } from "./views/login";
import { CreateAccount } from "./views/createAccount";
import { MyAccount } from "./views/myAccount";

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const [Page, setPage] = React.useState(()=>HomePage);
  React.useEffect( () => {
    function handleNav() {
      switch(window.location.hash.substring(1)) {
        case "login":
          setPage(()=>LoginPage);
          break;
        case "createAccount":
          setPage(()=>CreateAccount);
          break;
        case "myAccount":
          setPage(()=>MyAccount);
          break;
        default:
          setPage(()=>HomePage);
      }
    }
    handleNav();
    window.addEventListener("hashchange", handleNav);

    return () => {
      window.removeEventListener("hashchange", handleNav)
    }
  })

  return(
    <div>
      <NavBar />
      <Page />
      <Footer />
    </div>
  )
}