import * as React from "react";
import { createRoot } from 'react-dom/client';
import { HomePage } from "./views/home";
import { NavBar } from "./views/nav";
import { Footer } from "./views/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginPage } from "./views/login";
import { CreateAccount } from "./views/createAccount";
import { MyAccount } from "./views/myAccount";
import { ProfileContext } from "./views/profileContext";
import { AddEvents } from "./views/addEvents";

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const [Page, setPage] = React.useState(()=>HomePage);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect( () => {
    function handleNav() {
      const hash = window.location.hash;
      const slashIndex = hash.indexOf("/") 
      switch(hash.substring(1, slashIndex === -1 ? undefined : slashIndex)) {
        case "login":
          setPage(()=>LoginPage);
          break;
        case "logout":
          const resp = fetch("/user/logout");
          setPage(()=>HomePage);
          break;
        case "createAccount":
          setPage(()=>CreateAccount);
          break;
        case "myAccount":
          setPage(()=>MyAccount);
          break;
        case "addEvents": 
          setPage(()=>AddEvents);
          break;
        default:
          setPage(()=>HomePage);
      }
    };
    function onCookieChange() {
      const loggedIn = !!document.cookie.match(new RegExp(`(^| )jwt=([^;]+)`));
      setIsLoggedIn(loggedIn);
      if (!loggedIn && (window.location.hash === "#myAccount" || window.location.hash.startsWith("#addEvents"))){
        window.location.hash ='#login';
      }
    };

    handleNav();
    onCookieChange()
    window.addEventListener("hashchange", handleNav);
    cookieStore.addEventListener("change", onCookieChange);

    return () => {
      window.removeEventListener("hashchange", handleNav);
      cookieStore.removeEventListener("change", onCookieChange);
    }
  })

  const [accountData, setAccountData] = React.useState<any>(null);
    React.useEffect(() => {
      async function fetchAccountData(){
        const userInfo = await fetch("/user");
        setAccountData(await userInfo.json());
      }
      fetchAccountData()
    },[isLoggedIn]);

  return(
    <div>
      <ProfileContext value={accountData}>
        <NavBar isLoggedIn={isLoggedIn} />
        <Page />
        <Footer />
      </ProfileContext>
    </div>
  )
}