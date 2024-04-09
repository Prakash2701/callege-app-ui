import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import Head from "next/head";
import secureLocalStorage from "react-secure-storage";
import Stack from "react-bootstrap/Stack";
import {useRouter} from "next/router";
import Dropdown from "react-bootstrap/Dropdown";

export default function header() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [darkmode , setDarkmode]=useState(false);
  const [username, setUsername] = useState();
  const [role, setRole] = useState();
  const [adminRols, setAdminRols] = useState(true);
  const [pickup, setPickup] = useState(true);
  const [userRole, setUserRole] = useState(true);
  const [loggedin, setLoggedin] = useState(false);
  
    
  
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setUsername(secureLocalStorage.getItem("username"));
      setRole(secureLocalStorage.getItem("role"));
      //console.log(secureLocalStorage.getItem("mode"));
      setDarkmode(secureLocalStorage.getItem("mode"));
      if (secureLocalStorage.getItem("token") !== null &&  secureLocalStorage.getItem("token") != undefined ) {
        setLoggedin(true);
        setToken(secureLocalStorage.getItem("token"));
        
      } else {
        router.push("/login");
        setLoggedin(false);
      }
    }
   
    
  }, []);
 
  const handleLogout = () => {
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("username");
    secureLocalStorage.removeItem("id");
    secureLocalStorage.removeItem("roles");
    secureLocalStorage.removeItem("number");
    
    router.push("/login");
  };
  
  
  return (
    <Navbar
    data-bs-theme="info"
      expand="lg"
      className="bg-info"
      fixed="top"
    >
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Container fluid>
      <style type="text/css">
        {`
    .dropdown-toggle::after {
      content: none;
  }
    `}
      </style>
        <Navbar.Brand href={""}>
          <Dropdown className="d-inline mx-2 " >
            <Dropdown.Toggle variant="" className="rounded-5" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="blue"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item >
      </Dropdown.Item>
              <Dropdown.Item as={Link} href="/Profile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout} >Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: "100px"}}
            navbarScroll
          >
            {/* <Link className="nav-link" href="/"> Home</Link>  */}
            <Nav.Link as={Link} id="home" href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} id="brand" href="/Add">
              Add
            </Nav.Link>

            {/* {userRole && loggedin && (<NavDropdown title="our services" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} href="/components/img">
                {" "}
                img
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/phones/Brand">
                phones brand
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Something else here</NavDropdown.Item>
            </NavDropdown>)} */}
            {adminRols && loggedin && (
              <Nav.Link as={Link} id="admin" href="/admin">
                Admin
              </Nav.Link>
            )}
             
          </Nav>
          <Stack direction="horizontal" gap={3}>
            
            <div className="vr" />
            <Nav>
              {!loggedin && (
                <Nav.Link as={Link} className="me-2" href={"/signup"}>
                  signup
                </Nav.Link>
              )}
            </Nav>
            
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

