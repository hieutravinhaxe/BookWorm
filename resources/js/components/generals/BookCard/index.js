import React from "react";
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

    function getImage($image){
        if($image===null){
            return "/images/book1.jpg";
        }else{
            return "/images/"+$image+".jpg";
        }
    }

    return (
        <>
        <Card style={{height:"31rem"}} className="m-2 w-70">
            <CardImg height="50%" top src={getImage(props.bookImage)} alt="Card image cap" className="w-100"/>
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
        </>
    );
}
