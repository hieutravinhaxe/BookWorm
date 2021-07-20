import React, {useState} from "react";
import { useHistory } from 'react-router-dom';

import "./BookCard.css";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardFooter
} from "reactstrap";

export default function BookCard(props) {
    let history = useHistory();

    function getImage($image) {
        if ($image === null) {
            return "/images/book1.jpg";
        } else {
            return "/images/" + $image + ".jpg";
        }
    }

    function changeToProduct($bookId){
        history.push("/product/"+$bookId);
    }

    return (
        <>
            <Card style={{ height: "31rem" }} className="m-2 w-70" onClick={()=>changeToProduct(props.bookId)}>
                <CardImg
                    height="50%"
                    top
                    src={getImage(props.bookImage)}
                    alt="Card image cap"
                    className="w-100"
                />
                <CardBody>
                    <CardTitle className="font-weight-bold">
                        {props.bookTitle}
                    </CardTitle>
                    <CardText>{props.bookAuthor}</CardText>
                </CardBody>
                <CardFooter>
                    <div
                        className="text-center font-weight-bold"
                        id="finalPrice"
                    >
                        <small>
                            {
                                (props.bookPrice!==props.finalPrice) &&
                                    <del
                                        className="mr-3 font-italic"
                                        id="bookPrice"
                                    >${props.bookPrice}</del>
                                
                            }
                        </small>
                        ${props.finalPrice}
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
