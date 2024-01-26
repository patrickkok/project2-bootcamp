import logo from "../assets/logo.png";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./Navbar.css"; // Import your custom CSS file here

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <BootstrapNavbar
      expand="lg"
      fixed="top"
      className="bg-primary text-white shadow"
    >
      <Container className="m-0">
        <div className="logo">
          <Col xs={6} md={4}>
            <Image src={logo} roundedCircle fluid width={150} height={150} />
          </Col>
        </div>
        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0"
        />
        <BootstrapNavbar.Collapse id="basic-navbar-nav ">
          <Nav className="container-fluid ">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>{" "}
            <Link className="nav-link text-white" to="/dash">
              Dashboard
            </Link>
            <Link className="nav-link text-white" to="/history">
              History
            </Link>
            <Link className="nav-link text-white" to="/insights">
              Insights
            </Link>
            <Link className="nav-link text-white" to="/settings">
              Settings
            </Link>            <Link className="nav-link text-white" to="/addaccountdata">
              Investment
            </Link>
          </Nav>
          {pathname.includes("/dash") && (
            <button
              className={`border-0  bg-${darkMode ? "primary" : "primary"} text-${
                darkMode ? "white" : "white"
              } shadow`}
              onClick={toggleDarkMode}
            >
              {darkMode ? "🔆" : "🌙"}
            </button>
          )}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
