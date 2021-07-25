import React, { useEffect } from "react";
import "./cart.css";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

export default function ThankYou() {
    let history = useHistory();
    useEffect(() => {
    }, []);

    function clickToHome() {
        history.push("/");
    }

    let timeleft = 10;
    let downloadTimer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            //document.getElementById("countdown").innerHTML = "Finished";
            history.push("/")
        } else {
            document.getElementById("countdown").innerHTML = "Return Home page after "+
                timeleft + " seconds";
        }
        timeleft -= 1;
    }, 1000);

    return (
        <>
            <div className="jumbotron thank-you text-center">
                <h1 className="display-3">Thank You!</h1>
                <p>Success order</p>
                <hr />
                <div id="countdown"></div>
                <Button outline color="primary" onClick={() => clickToHome()}>
                    Click here to back Home
                </Button>
            </div>
        </>
    );
}
