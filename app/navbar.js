"use client"
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";


const navbar = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Navbar bg="secondary" data-bs-theme="secondary" expand="lg">
      <Container>
          <Navbar.Brand href="#home">KaiHeath.com</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="https://github.com/kai-heath">Github</Nav.Link>
              <NavDropdown title="My Projects" id="basic-nav-dropdown">
                <NavDropdown.Item href="wordsOfChrist">WordsOfChrist</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )};

export default navbar;