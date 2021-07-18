import React from "react";
import "./BookCard.css";
import book1 from "../../../../../public/images/book1.jpg";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardFooter
} from "reactstrap";

export default function BookCard(props) {
    return (
        <div>
        <Card style={{height:"500px"}} className="m-2 w-70">
            <CardImg top src={book1} alt="Card image cap" className="w-100"/>
            <CardBody>
                <CardTitle className="font-weight-bold">{props.bookTitle}</CardTitle>
                <CardText>{props.bookAuthor}</CardText>
            </CardBody>
            <CardFooter>
                <div className="text-center font-weight-bold" id="finalPrice">
                    <small>
                        <del className="mr-3 font-italic" id="bookPrice">
                            {props.bookPrice}
                        </del>
                    </small>
                    {props.finalPrice}
                </div>
            </CardFooter>
        </Card>
        </div>
    );
}
