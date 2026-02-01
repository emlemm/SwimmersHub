import Login from "./login";

function NavBar() {
  return(
    <nav className="navbar navbar-expand-md navbar-light">
    <div className="container-xxl">
      <a href="#" className="navbar-brand">
        <span className="fw-bold text-secondary">
          <img className="m-1" src="/assets/icons/swimming-man.png" alt="Swimming man icon" width="35" />
          Swimmers Hub
        </span>
      </a>
      <div className="justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item ms-2">
            <a className="nav-link active btn btn-secondary" aria-current="page" href="#">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
};

export default NavBar;