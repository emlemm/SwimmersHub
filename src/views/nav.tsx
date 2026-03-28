import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface NavBarProps{
  isLoggedIn?: boolean;
}

export function NavBar(props: NavBarProps) {

  return(
    <div id="siteNavBar" className="">
      <Navbar collapseOnSelect expand="md" className="bg-medBlue p-1" >
        <Navbar.Brand href="#home" className="navbar-brand fw-bold text-ltBlue2 fs-2">
            <img className="m-1" src="/assets/icons/swimming-man.png" alt="Swimming man icon" width="35" /> Swimmers Hub
        </Navbar.Brand>
        {props.isLoggedIn ? (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='m-2'/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end">
                <Nav.Link className="d-flex justify-content-end" href="#myAccount">My Account</Nav.Link>
                <Nav.Link className="d-flex justify-content-end" href="#swimmers">My Swimmers</Nav.Link>
                <Nav.Link className="d-flex justify-content-end" href="#meets">Swim Meets</Nav.Link>
                <Nav.Link className="d-flex justify-content-end" href="#logout">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item ms-2">
              <a className="nav-link active btn btn-dkBlue btn-lg text-ltBlue2 m-1 p-2" aria-current="page" href="#login">Login</a>
            </li>
          </ul>
        )} 
      </Navbar>
    </div>
  )
};
