import React, { useState } from "react";
import logo from "../../../../assets/bookworm_icon.svg";
import "./nav.css";
import { useLocation } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    let location = useLocation();

    const homeClass = location.pathname === "/" ? "activeLink" : "";
    const aboutClass = location.pathname.match(/^\/about/) ? "activeLink" : "";
    const shopClass = location.pathname.match(/^\/shop/) ? "activeLink" : "";
    const cartClass = location.pathname.match(/^\/cart/) ? "activeLink" : "";

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
                            <NavLink className={homeClass} href="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-1">
                            <NavLink className={shopClass} href="/shop">
                                Shop
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-1">
                            <NavLink className={aboutClass} href="/about">
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-1">
                            <NavLink className={cartClass} href="/">
                                Cart<span className="cartItems">(1)</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default Navigation;
