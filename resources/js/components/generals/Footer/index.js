import React, { Component } from "react";
import logo from '../../../../assets/bookworm_icon.svg';
import './footer.css';
import {footer} from "reactstrap";

export default class Footer extends Component {
    render() {
        return (
            <footer className="bg-light p-3">
                <img
                    src={logo}
                />
                <div className="address">152, Nguyen Thi Tan, P2, Q8, TP.HCM</div>
                <div className="numberphone">0132456789</div>
            </footer>
        );
    }
}
