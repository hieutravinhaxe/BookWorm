import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    Row,
    Col,
    Container
} from "reactstrap";
import classnames from "classnames";
import "./home.css";
import BookCard from "../../generals/BookCard";
import { Button } from "react-bootstrap";


export default function FeaturedBooks() {
    const [activeTab, setActiveTab] = useState("1");
    const [recomData, setRecomData] = useState([]);
    const [popularData, setPopularData] = useState([]);

    useEffect(() => {
        initRecomData();
        initPopular();
    }, []);

    function initPopular() {
        axios
            .get(
                "/api/books?limit=8&page=1&orderReviews=1&orderFPrice=0"
            )
            .then(res => {
                if (res.status === 200) {
                    setPopularData(res.data.data);
                }
            })
            .catch(error => console.log(error));
    }

    function initRecomData() {
        axios
            .get(
                "/api/books?limit=8&page=1&orderRate=1&orderFPrice=0"
            )
            .then(res => {
                if (res.status === 200) {
                    setRecomData(res.data.data);
                }
            })
            .catch(error => console.log(error));
    }

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <Container className="featuredBooks mt-5">
            <h3 className="text-center">Featured Books</h3>
            <Nav tabs className="justify-content-center">
                <NavItem className="mb-3 mr-1">
                    <Button
                        variant="outline-primary"
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                            toggle("1");
                        }}
                    >
                    Recommended
                    </Button>
                </NavItem>
                <NavItem>
                    <Button
                        variant="outline-primary"
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                            toggle("2");
                        }}
                    >
                        Popular
                    </Button>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Container>
                        <Row>
                            {recomData.map(d => (
                                <Col lg="3" md="6" sm="12" className="mb-3" key={d.id}>
                                    <BookCard
                                        bookId={d.id}
                                        bookTitle={d.book_title}
                                        bookAuthor={d.author_name}
                                        finalPrice={d.final_price}
                                        bookPrice={d.book_price}
                                        bookImage={d.book_cover_photo}
                                    ></BookCard>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </TabPane>
                <TabPane tabId="2">
                    <Container>
                        <Row>
                            {popularData.map(d => (
                                <Col lg="3" md="6" sm="12" className="mb-3" key={d.id}>
                                    <BookCard
                                        bookId={d.id}
                                        bookTitle={d.book_title}
                                        bookAuthor={d.author_name}
                                        finalPrice={d.final_price}
                                        bookPrice={d.book_price}
                                        bookImage={d.book_cover_photo}
                                    ></BookCard>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </TabPane>
            </TabContent>
        </Container>
    );
}
