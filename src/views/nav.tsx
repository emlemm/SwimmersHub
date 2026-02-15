
export function NavBar() {
  return(
    <nav className="navbar navbar-expand-md navbar-light bg-medBlue">
    <div className="container-xxl">
      <a href="#" className="navbar-brand">
        <span className="fw-bold text-ltBlue2">
          <img className="m-1" src="/assets/icons/swimming-man.png" alt="Swimming man icon" width="35" />
          Swimmers Hub
        </span>
      </a>
      <div className="justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item ms-2">
            <a className="nav-link active btn btn-dkBlue btn-lg text-ltBlue2" aria-current="page" href="#login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
};
