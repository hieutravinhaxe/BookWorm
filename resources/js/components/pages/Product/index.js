import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import Pagi from "../../generals/Pagi";
import swal from "sweetalert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

toast.configure();
export default function Product({ carts, setCarts }) {
    function notiReviews() {
        toast.info("Send reviews success!!!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    function notiAddToCart() {
        toast.info("Complete push items to cart!!!", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

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
    const [authorData, setAuthorData] = useState([]);
    const [cateData, setCateData] = useState([]);
    const [stateFrom, setStateFrom] = useState(0);
    const [stateTo, setStateTo] = useState(0);
    const [stateTotal, setStateTotal] = useState(0);

    //star
    const [star1, setStar1] = useState(0);
    const [star2, setStar2] = useState(0);
    const [star3, setStar3] = useState(0);
    const [star4, setStar4] = useState(0);
    const [star5, setStar5] = useState(0);

    //show and sort
    const [showBy, setShowBy] = useState(20);
    const [orderBy, setOrderBy] = useState(1);
    const [rateBy, setRateBy] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);

    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        initBookData();
        initReviewData();
        checkInCart();
    }, [showBy, rateBy, orderBy, currentPage, inCart]);

    function initBookData() {
        axios
            .get("/api/books/" + bookId)
            .then(res => {
                if (res.status == 200) {
                    setAuthorData(res.data.author);
                    setBookData(res.data.book);
                    setCateData(res.data.category);
                }
            })
            .catch(error => console.log(error));
    }

    function initReviewData() {
        let url =
            "/api/books/" +
            bookId +
            "/reviews?limit=" +
            showBy +
            "&page=" +
            currentPage;
        if (orderBy === 0) {
            url = url + "&orderDate=0";
        } else if (orderBy === 1) {
            url = url + "&orderDate=1";
        }
        if (rateBy !== 0) {
            url = url + "&rate=" + rateBy;
        }
        axios
            .get(url)
            .then(res => {
                if (res.status === 200) {
                    setReviewData(res.data.data);
                    setStateFrom(res.data.from);
                    setStateTo(res.data.to);
                    setStateTotal(res.data.total);
                    setTotalPage(res.data.totalPages);
                    setStar1(res.data.star1);
                    setStar2(res.data.star2);
                    setStar3(res.data.star3);
                    setStar4(res.data.star4);
                    setStar5(res.data.star5);
                }
            })
            .catch(error => console.log(error));
    }

    function downQuanlity() {
        if (stateQuanlity == 1) {
            swal({
                title: "WARNING!",
                text: "Amount from 1 - 8",
                icon: "warning",
                button: "OK"
            });
        } else {
            setStateQuanlity(stateQuanlity - 1);
        }
    }

    function upQuanlity() {
        if (inCart) {
            carts.forEach(d => {
                if (d.bookId === bookId) {
                    if (d.quanlity + stateQuanlity >= 8) {
                        swal({
                            title: "WARNING!",
                            text: "Amount from 1 - 8",
                            icon: "warning",
                            button: "OK"
                        });
                    } else {
                        setStateQuanlity(stateQuanlity + 1);
                    }
                }
            });
        } else {
            if (stateQuanlity == 8) {
                swal({
                    title: "WARNING!",
                    text: "Amount from 1 - 8",
                    icon: "warning",
                    button: "OK"
                });
            } else {
                setStateQuanlity(stateQuanlity + 1);
            }
        }
    }

    function getImage(image) {
        if (image === null) {
            return "/images/default.jpg";
        } else {
            return "/images/" + image + ".jpg";
        }
    }

    //show
    function setItemPerPage(i) {
        setShowBy(i);
        setTotalPage(null);
    }

    //sort by
    function setSort(s) {
        setOrderBy(s);
        setTotalPage(null);
    }

    //rate
    function setRate(e, r) {
        e.preventDefault();
        setRateBy(r);
        setTotalPage(null);
    }

    //submit review
    function handleSubmitForm(e) {
        e.preventDefault();

        let data = {
            bookId: bookId,
            title: e.target.inputTitle.value,
            details: e.target.inputDetails.value,
            rate: e.target.selectStar.value
        };

        axios({
            method: "post",
            url: `/api/books/${bookId}/reviews`,
            data: data
        })
            .then(res => {
                if (res.status === 200) {
                    if (orderBy == 0) {
                        setReviewData([...reviewData, res.data.data]);
                    } else {
                        setReviewData([res.data.data, ...reviewData]);
                    }
                    e.target.inputTitle.value = "";
                    e.target.inputDetails.value = "";
                    e.target.selectStar.value = 1;
                    initReviewData();
                    initBookData();
                    notiReviews();
                }
            })
            .catch(error => {
                console.log(error);
            });

        setTotalPage(null);
    }

    function checkInCart() {
        carts.forEach(d => {
            if (d.bookId === bookId) {
                setInCart(true);
            }
        });
    }

    function hanleAddToCart() {
        if (inCart) {
            carts.forEach(d => {
                if (d.bookId === bookId) {
                    if (d.quanlity + stateQuanlity > 8) {
                        swal({
                            title: "WARNING!",
                            text:
                                "Are you sure amount in here and in carts less 8",
                            icon: "warning",
                            button: "OK"
                        });
                    } else {
                        d.quanlity += stateQuanlity;
                        notiAddToCart();
                    }
                }
            });
            localStorage.setItem("carts", JSON.stringify(carts));
            setCarts(carts);
        } else {
            let data = {
                bookId: bookId,
                quanlity: stateQuanlity,
                bookTitle: bookData.book_title,
                bookPrice: bookData.book_price,
                author: authorData.author_name,
                bookFPrice: bookData.final_price,
                bookImage: bookData.book_cover_photo
            };
            setInCart(true);
            let addCart = [...carts, data];
            localStorage.setItem("carts", JSON.stringify(addCart));
            setCarts([...carts, data]);
            notiAddToCart();
        }
    }

    function getAvgStar(avg) {
        return parseFloat(avg).toFixed(2);
    }

    function displayDate(date) {
        let d = new Date(date);
        let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
        let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
        let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
        return `${mo} ${da} ,${ye}`;
    }

    return (
        <div className="container-fluid product">
            <h4 className="m-3 cate-name">{cateData.category_name}</h4>
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
                                        src={getImage(
                                            bookData.book_cover_photo
                                        )}
                                        alt="Card image cap"
                                    />
                                    <CardBody>
                                        <p className="float-left mr-1">
                                            By (author){" "}
                                        </p>
                                        <CardTitle tag="h5">
                                            {authorData.author_name}
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="7">
                                <h5 id="bookTitle">{bookData.book_title}</h5>
                                <div className="bookDesc">
                                    <p>{bookData.book_summary}</p>
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
                                    {bookData.book_price !==
                                        bookData.final_price && (
                                        <del
                                            className="mr-3 font-italic"
                                            id="bookPrice"
                                        >
                                            $
                                            {bookData.book_price *
                                                stateQuanlity}
                                        </del>
                                    )}
                                </small>
                                $
                                {getAvgStar(
                                    bookData.final_price * stateQuanlity
                                )}
                            </h5>
                        </CardHeader>
                        <CardBody>
                            <p>Quantity:</p>
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
                                    onClick={() => hanleAddToCart()}
                                >
                                    Add to cart
                                </Button>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="m-3">
                <Col md="8" className="p-4 border">
                    <Row className="header-customer-reviews">
                        <h5 className="mr-2">Customer Reviews</h5>

                        {rateBy !== 0 && <p>(Filtered by {rateBy} star)</p>}
                    </Row>

                    <h4 id="avgStar">{getAvgStar(bookData.avg_rate)} Star</h4>
                    <div className="reviewByStar mb-2">
                        <span className="mr-2">
                            <a href="" onClick={e => setRate(e, 0)}>
                                ({bookData.num_reviews})
                            </a>
                        </span>
                        <span className="mr-2" id="5star">
                            <a href="" onClick={e => setRate(e, 5)}>
                                5 star
                            </a>{" "}
                            ({star5})
                        </span>
                        |
                        <span className="mr-2" id="4star">
                            <a href="" onClick={e => setRate(e, 4)}>
                                4 star
                            </a>{" "}
                            ({star4})
                        </span>
                        |
                        <span className="mr-2" id="3star">
                            <a href="" onClick={e => setRate(e, 3)}>
                                3 star
                            </a>{" "}
                            ({star3})
                        </span>
                        |
                        <span className="mr-2" id="2star">
                            <a href="" onClick={e => setRate(e, 2)}>
                                2 star
                            </a>{" "}
                            ({star2})
                        </span>
                        |
                        <span className="mr-2" id="1star">
                            <a href="" onClick={e => setRate(e, 1)}>
                                1 star
                            </a>{" "}
                            ({star1})
                        </span>
                        |
                    </div>
                    <Container>
                        <Row className="mb-4">
                            <Col md="4" className="d-flex">
                                {totalPage !== 0 ? (
                                    <p>
                                        Showing {stateFrom}-{stateTo} of{" "}
                                        {stateTotal} reviews
                                    </p>
                                ) : null}
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
                                        Show {showBy}
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
                                        Sort by {orderBy == 0 ? "O-N" : "N-O"}
                                    </DropdownToggle>
                                    <DropdownMenu className="w-100">
                                        <DropdownItem
                                            onClick={() => setSort(1)}
                                        >
                                            Sort by date: newest to oldest
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => setSort(0)}
                                        >
                                            Sort by date: oldest to newest
                                        </DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </Col>
                        </Row>
                        <Row>
                            {reviewData.map(d => (
                                <Col md="12" key={d.id}>
                                    <hr className="w-100" />
                                    <div className="reviewTitle">
                                        <h5 id="reviewTitle">
                                            {d.review_title}
                                            <small>
                                                |
                                                <span id="starOfReview">
                                                    {d.rating_start} stars
                                                </span>
                                            </small>
                                        </h5>
                                    </div>
                                    <div className="reviewContent">
                                        <p>{d.review_details}</p>
                                    </div>
                                    <div className="reviewTime">
                                        <p>{displayDate(d.review_date)}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            {totalPage !== null && totalPage !== 0 ? (
                                <Pagi
                                    pages={totalPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            ) : null}
                        </Row>
                    </Container>
                    <div className="confShowReview"></div>
                </Col>
                <Col md="4">
                    <Card>
                        <CardHeader className="text-center">
                            <h5>Write a Review</h5>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={e => handleSubmitForm(e)}>
                                <FormGroup>
                                    <Label for="inputTitle">
                                        Add a title *
                                    </Label>
                                    <Input
                                        required
                                        type="text"
                                        maxLength="120"
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
                                <FormGroup>
                                    <Label for="selectStar">
                                        Select a rating star
                                    </Label>
                                    <Input
                                        type="select"
                                        name="select"
                                        id="selectStar"
                                    >
                                        <option value="1">1 star</option>
                                        <option value="2">2 star</option>
                                        <option value="3">3 star</option>
                                        <option value="4">4 star</option>
                                        <option value="5">5 star</option>
                                    </Input>
                                </FormGroup>
                                <Button
                                    outline
                                    color="primary"
                                    type="submit"
                                    className="w-100 md-3 mx-2"
                                >
                                    Submit Review
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
