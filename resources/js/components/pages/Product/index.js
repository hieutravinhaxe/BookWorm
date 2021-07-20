import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
    Container,
    Col,
    Row,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardHeader,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import axios from "axios";

export default function Product(props) {
    //quality of books
    const [stateQuanlity, setStateQuanlity] = useState(1);

    //toggle button
    const [dropdownOpenShow, setOpenShow] = useState(false);
    const toggleShow = () => setOpenShow(!dropdownOpenShow);

    const [dropdownOpenOrder, setOpenOrder] = useState(false);
    const toggleOrder = () => setOpenOrder(!dropdownOpenOrder);

    //get params from url
    const { bookId } = useParams();

    //data
    const [bookData, setBookData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [authorData, setAuthorData] = useState(null);
    const [stateFrom, setStateFrom] = useState(0);
    const [stateTo, setStateTo] = useState(0);
    const [stateTotal, setStateTotal] = useState(0);

    //star
    const [star1, setStar1] = useState(0);
    const [star2, setStar2] = useState(0);
    const [star3, setStar3] = useState(0);
    const [star4, setStar4] = useState(0);
    const [star5, setStar5] = useState(0);


    useEffect(() => {
        initBookData();
        initReviewData();
    }, []);

    function initBookData() {
        axios
            .get("/api/books/" + bookId)
            .then(res => {
                if (res.status === 200) {
                    setBookData(res.data.book);
                    setAuthorData(res.data.author);
                }
            })
            .catch(error => console.log(error));
    }

    function initReviewData() {
        axios
            .get(`/api/books/${bookId}/reviews`)
            .then(res => {
                if (res.status === 200) {
                    setReviewData(res.data.data);
                    setStateFrom(res.data.from);
                    setStateTo(res.data.to);
                    setStateTotal(res.data.total);
                    setStar1(res.data.star1);
                    setStar2(res.data.star2);
                    setStar3(res.data.star3);
                    setStar4(res.data.star4);
                    setStar5(res.data.star5);
                }
            })
            .catch(error => console.log(eror));
    }

    function downQuanlity() {
        if (stateQuanlity == 1) {
            alert("Quanlity must from 1 to 8");
        } else {
            setStateQuanlity(stateQuanlity - 1);
        }
    }

    function upQuanlity() {
        if (stateQuanlity == 8) {
            alert("Quanlity must from 1 to 8");
        } else {
            setStateQuanlity(stateQuanlity + 1);
        }
    }

    function setItemPerPage($i) {}

    function setSort($s) {
        
    }

    return (
        <div className="container-fluid mt-5">
            <h4 className="m-3">Category Name</h4>
            <hr className="w-100" />
            <Row className="m-3">
                <Col md="8">
                    <Container className="boder">
                        <Row>
                            <Col md="5">
                                <Card className="mb-2 h-100">
                                    <CardImg
                                        top
                                        width="100%"
                                        src="/images/book1.jpg"
                                        alt="Card image cap"
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            Card title
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="7">
                                <h5 id="bookTitle">Book's title</h5>
                                <div className="bookDesc">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do elusmod tempor
                                        incldidunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Excepteur sint occaecat.
                                    </p>
                                    <p>"the multi-milion copy bestseller"</p>
                                    <p>Soon to be a major film</p>
                                    <p>
                                        A Number One New York Times Bestseller
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col md="4">
                    <Card className="text-center">
                        <CardHeader>
                            <h5>
                                <small>
                                    <del>$234 </del>
                                </small>
                                $100
                            </h5>
                        </CardHeader>
                        <CardBody>
                            <p>Quanlity:</p>
                            <Col className="mt-4">
                                <div className="input-group number-spinner">
                                    <span className="input-group-btn">
                                        <Button
                                            outline
                                            color="secondary"
                                            onClick={() => downQuanlity()}
                                        >
                                            <i className="fas fa-minus"></i>-
                                        </Button>
                                    </span>
                                    <input
                                        required
                                        readOnly
                                        type="number"
                                        className="form-control text-center"
                                        value={stateQuanlity}
                                    />
                                    <span className="input-group-btn">
                                        <Button
                                            outline
                                            color="secondary"
                                            onClick={() => upQuanlity()}
                                        >
                                            <i className="fas fa-plus"></i>+
                                        </Button>
                                    </span>
                                </div>
                            </Col>
                            <Col className="mt-4">
                                <Button
                                    outline
                                    color="primary"
                                    className="w-100"
                                >
                                    {" "}
                                    Add to carts
                                </Button>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="m-3">
                <Col md="8" className="p-4 border">
                    <h5>Customer Reviews</h5>
                    <h4 id="avgStar">{bookData.avg_rate}</h4>
                    <div className="reviewByStar mb-2">
                        <span className="mr-2">({stateTotal})</span>
                        <span className="mr-2" id="5star">
                            <a href="">5 star</a> ({star5})
                        </span>
                        |
                        <span className="mr-2" id="4star">
                            <a href="">4 star</a> ({star4})
                        </span>
                        |
                        <span className="mr-2" id="3star">
                            <a href="">3 star</a> ({star3})
                        </span>
                        |
                        <span className="mr-2" id="2star">
                            <a href="">2 star</a> ({star2})
                        </span>
                        |
                        <span className="mr-2" id="1star">
                            <a href="">1 star</a> ({star1})
                        </span>
                        |
                    </div>
                    <Container>
                        <Row className="mb-4">
                            <Col md="4" className="d-flex">
                                <p>Show {stateFrom}-{stateTo} of {stateTotal} reviews</p>
                            </Col>
                            <Col md="8" className="d-flex flex-row-reverse">
                                <ButtonDropdown
                                    isOpen={dropdownOpenShow}
                                    toggle={toggleShow}
                                    className="w-100 mr-4"
                                >
                                    <DropdownToggle
                                        caret
                                        color="primary"
                                        outline
                                    >
                                        Show
                                    </DropdownToggle>
                                    <DropdownMenu className="w-100">
                                        <DropdownItem
                                            onClick={() => setItemPerPage(5)}
                                        >
                                            Show 5
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => setItemPerPage(15)}
                                        >
                                            Show 15
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => setItemPerPage(20)}
                                        >
                                            Show 20
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => setItemPerPage(25)}
                                        >
                                            Show 25
                                        </DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <ButtonDropdown
                                    isOpen={dropdownOpenOrder}
                                    toggle={toggleOrder}
                                    className="w-100 mr-4"
                                >
                                    <DropdownToggle
                                        caret
                                        color="primary"
                                        outline
                                    >
                                        Sort by
                                    </DropdownToggle>
                                    <DropdownMenu className="w-100">
                                        <DropdownItem
                                            onClick={() => setSort(0)}
                                        >
                                            Sort by date: newlest to oldest
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => setSort(1)}
                                        >
                                            Sort by date: oldest to newlest
                                        </DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <hr className="w-100" />
                                <div className="reviewTitle">
                                    <h5 id="reviewTitle">
                                        Review Title
                                        <small>
                                            |
                                            <span id="starOfReview">
                                                5 stars
                                            </span>
                                        </small>
                                    </h5>
                                </div>
                                <div className="reviewContent">
                                    <p>
                                        Such an incredivly complex story! I had
                                        to buy it because there was a waiting
                                        list of 30+ at the local library for
                                        this book, Thrilled that I made the
                                        purchase
                                    </p>
                                </div>
                                <div className="reviewTime">
                                    <p>april 12, 2021</p>
                                </div>
                            </Col>
                            <Col md="12">
                                <hr className="w-100" />
                                <div className="reviewTitle">
                                    <h5 id="reviewTitle">
                                        Review Title
                                        <small>
                                            |
                                            <span id="starOfReview">
                                                5 stars
                                            </span>
                                        </small>
                                    </h5>
                                </div>
                                <div className="reviewContent">
                                    <p>
                                        Such an incredivly complex story! I had
                                        to buy it because there was a waiting
                                        list of 30+ at the local library for
                                        this book, Thrilled that I made the
                                        purchase
                                    </p>
                                </div>
                                <div className="reviewTime">
                                    <p>april 12, 2021</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div className="confShowReview"></div>
                </Col>
                <Col md="4">
                    <Card>
                        <CardHeader className="text-center">
                            <h5>Write a review</h5>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="inputTitle">Add a title</Label>
                                    <Input
                                        type="text"
                                        name="inputTitle"
                                        id="inputTitle"
                                        placeholder="Enter title"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="inputDetails">
                                        Details please! Your review helps orther
                                        shoppers
                                    </Label>
                                    <Input
                                        type="textarea"
                                        name="inputDetails"
                                        id="inputDetails"
                                        placeholder="Enter detail"
                                    />
                                </FormGroup>
                            </Form>
                            <Button
                                outline
                                color="primary"
                                type="submit"
                                className="w-100 md-3 mx-2"
                            >
                                Submit Review
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
