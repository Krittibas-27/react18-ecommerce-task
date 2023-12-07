import React from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";

const NavberTop = ({ allSelectedProduct, ViewCartList }) => {
  const storageData = JSON.parse(localStorage.getItem("userData"));
  const logOutUser = () => {
    //console.log('click')
    localStorage.removeItem("userData");
    window.location.reload();
  };
  console.log("allSelectedProduct", allSelectedProduct?.length);
  return (
    <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href="/product/category">Old Product Category</Nav.Link>
            <Nav.Link href="/">Platzi Products </Nav.Link>

            {storageData ? (
              <Nav.Link onClick={() => logOutUser()} className="text-white">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link className="text-white" href="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <div className="cart_icon" onClick={()=>ViewCartList()}>
        <FiShoppingCart className="text-white" size={30} />
              <Badge pill bg="light" text="dark" className="budge_menubar">
                {" "}
                {allSelectedProduct?.length}
              </Badge>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavberTop;
