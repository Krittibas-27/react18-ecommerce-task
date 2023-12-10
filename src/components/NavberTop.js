import React from "react";
import { Navbar, Container, Nav, Badge, Button } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import Avatar from 'react-avatar';
import { useNavigate } from "react-router-dom";

const NavberTop = ({ allSelectedProduct, ViewCartList }) => {
  const navigate = useNavigate()
  const storageData = JSON.parse(localStorage.getItem("userData"));
  const logOutUser = () => {
    //console.log('click')
    localStorage.removeItem("userData");
    window.location.reload();
  };
  const userProfile=()=>{
    navigate('/userprofile')
  }
  console.log("storageData", storageData.username);
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
        <Button className="cart_icon cursor-pointer" onClick={()=>ViewCartList()} disabled={allSelectedProduct?.length===0}>
        <FiShoppingCart className="text-white" size={30} />
              <Badge pill bg="light" text="dark" className="budge_menubar">
               
                {allSelectedProduct?.length ? allSelectedProduct?.length : 0}
              </Badge>
        </Button>
        <Avatar size="35" round={true} color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={storageData.username} textSizeRatio={1.8}  className="cursor-pointer"
        onClick={()=>userProfile()}/>
      </Container>
    </Navbar>
  );
};

export default NavberTop;
