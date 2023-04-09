import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import navCss from "./Navb.module.css";
import axios from "axios";
import { authActions } from "./store";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

axios.defaults.withCredentials = true;

function Navb() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  let pPicture = localStorage.getItem('profilePicture')

  return (
    <Navbar collapseOnSelect expand="md" sticky="top" className={navCss.nav}>
      <Container className={navCss.containernav}>
        <Navbar.Brand href="http://localhost:3000">
          <img className={navCss.icon} src={require("./imges/icon.png")} alt="icon"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="games">
            <Nav.Link className={navCss.navLink} href={`/Mathematics`}>
              Mathematics
            </Nav.Link>
            <Nav.Link className={navCss.navLink} href="/MemoryMatch">
              Memory Match
            </Nav.Link>
            <Nav.Link className={navCss.navLink} href="/QuickReflexes">
              Quick Reflexes
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {!isLoggedIn && (
              <>
                <Nav.Link className={navCss.navLink} href="/LogIn">
                  {" "}
                  Login
                </Nav.Link>
                <Nav.Link className={navCss.navLink} href="/SignUp">
                  {" "}
                  Sign up
                </Nav.Link>

              </>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link className={navCss.navLink} href="/profile"> <Avatar  size={32} src={pPicture} icon={<UserOutlined />}/> </Nav.Link>
                <Nav.Link onClick={() => dispatch(authActions.logout())} className={navCss.navLink} href="/">
                  {" "}
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
