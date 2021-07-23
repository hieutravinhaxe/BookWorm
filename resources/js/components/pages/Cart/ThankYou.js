import React, { useEffect } from "react";
import "./cart.css";
import {Button} from "reactstrap"
import {useHistory} from "react-router-dom"

export default function ThankYou() {
    let history = useHistory()
    useEffect(()=>{
        setTimeout(()=>{
            history.push('/')
        },10000)
    },[])

    function clickToHome(){
        history.push('/')
    }
    return (
        <>
            <div className="jumbotron thank-you text-center">
                <h1 className="display-3">Thank You!</h1>
                <hr/>
                <Button
                    outline
                    color="primary"
                    onClick={()=>clickToHome()}
                >
                    Click here to back Home
                </Button>
            </div>
        </>
    );
}
