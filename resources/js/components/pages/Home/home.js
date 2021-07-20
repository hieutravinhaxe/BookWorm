import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../generals/BookCard";
import Carousel from "react-elastic-carousel";
import { Row, Col, Container, Button } from "reactstrap";
import FeaturedBooks from "./FeaturedBooks.js";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 150, itemsToShow: 2 },
    { width: 400, itemsToShow: 3 },
    { width: 800, itemsToShow: 4 }
];

export default function Home() {
    const [onSaleList, setOnSaleList] = useState([]);

    useEffect(() => {
        initOnSaleData();
    }, []);

    function initOnSaleData() {
        axios
            .get(`/api/books?limit=10&page=1&orderSPrice=1`)
            .then(res => {
                //const bookOnSale = res.data;
                if (res.status === 200) {
                    setOnSaleList(res.data.data);
                }
            })
            .catch(error => console.log(error));
    }
    return (
        <>
            <Container className="onSale bg-light mt-5">
                <Row className="onSale-title  m-3">
                    <Col xs="6" className="mt-2 d-flex">
                        <h4>On Sale</h4>
                    </Col>
                    <Col xs="6" className="mt-2 d-flex flex-row-reverse">
                        <Button outline color="primary" className="text-right">
                            View all
                        </Button>
                    </Col>
                </Row>
                {/* <!-- carousel muti items --> */}
                <Carousel breakPoints={breakPoints}>
                    {onSaleList.map(d => (
                        <BookCard
                            bookTitle={d.book_title}
                            bookAuthor={d.author_name}
                            finalPrice={d.final_price}
                            bookPrice={d.book_price}
                            bookImage={d.book_cover_photo}
                            key={d.id}
                            bookId={d.id}
                        ></BookCard>
                    ))}
                </Carousel>
                <FeaturedBooks />
            </Container>
        </>
    );
}
