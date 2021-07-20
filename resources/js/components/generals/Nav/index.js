import React, { useState } from "react";
import logo from "../../../../assets/bookworm_icon.svg";
import "./nav.css";
import { Link } from "react-router-dom";
import {Button} from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";

function Navigation (pros) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="light" light expand="md" className="fixed-top">
                <NavbarBrand href="/">
                    <img src={logo} />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto w-100 justify-content-end" navbar>
                        <NavItem className="mr-1">
                            <Link to="/">
                                <Button className="btn-light bg-light">Home</Button>
                            </Link>
                        </NavItem>
                        <NavItem className="mr-1">
                            <Link to="/shop">
                            <Button className="btn-light bg-light">Shop</Button>
                            </Link>
                        </NavItem>
                        <NavItem className="mr-1">
                            <Link to="/about">
                            <Button className="btn-light bg-light">About</Button>
                            </Link>
                        </NavItem>
                        <NavItem className="mr-1">
                            <Link to="/">
                            <Button className="btn-light bg-light">Cart<span className="cartItems">(1)</span></Button>
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
};

export default Navigation;
