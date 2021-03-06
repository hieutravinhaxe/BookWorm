import React, { useState, useEffect } from "react";
import "./shop.css";
import axios from "axios";
import Pagi from "../../generals/Pagi";
import {
    Breadcrumb,
    BreadcrumbItem,
    Row,
    Col,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

import { Accordion, Button, ButtonGroup } from "react-bootstrap";
import BookCard from "../../generals/BookCard";

export default function Shop({ onSale }) {
    const [dropdownOpenOrder, setOpenOrder] = useState(false);
    const toggleOrder = () => setOpenOrder(!dropdownOpenOrder);

    const [dropdownOpenShow, setOpenShow] = useState(false);
    const toggleShow = () => setOpenShow(!dropdownOpenShow);

    //state for authors, categories (filter)
    const [authorList, setAuthorList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    //state for filter, order, show
    const [authorBy, setAuthorBy] = useState(0);
    const [categoryBy, setCategoryBy] = useState(0);
    const [rateBy, setRateBy] = useState(0);
    const [showBy, setShowBy] = useState(20);
    const [sortBy, setSortBy] = useState(onSale);

    // books list
    const [bookList, setBookList] = useState([]);

    //breadcrumb
    const [breadcrumbStar, setBreadStar] = useState(null);
    const [breadcrumbAuthor, setBreadAuthor] = useState(null);
    const [breadcrumbCate, setBreadCate] = useState(null);

    //from -to -total
    const [stateFrom, setStateFrom] = useState(0);
    const [stateTo, setStateTo] = useState(0);
    const [stateTotal, setStateTotal] = useState(0);
    const [statePages, setPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        initAuthorList();
        initCategotyList();
        initBookList();
    }, [rateBy, categoryBy, authorBy, showBy, sortBy, currentPage]);

    function initBookList() {
        let url = "/api/books";
        url = url + "?limit=" + showBy + "&page=" + currentPage;
        if (rateBy != 0 && rateBy != null) {
            url = url + "&rate=" + rateBy;
        }
        if (authorBy != 0 && authorBy != null) {
            url = url + "&author=" + authorBy;
        }
        if (categoryBy != 0 && categoryBy != null) {
            url = url + "&category=" + categoryBy;
        }
        if (sortBy == 1) {
            url = url + "&orderSPrice=1$orderFPrice=0";
        } else if (sortBy == 2) {
            url = url + "&orderReviews=1&orderFPrice=0";
        } else if (sortBy == 3) {
            url = url + "&orderFPrice=0";
        } else if (sortBy == 4) {
            url = url + "&orderFPrice=1";
        }
        axios
            .get(url)
            .then(res => {
                if (res.status === 200) {
                    setStateFrom(res.data.from);
                    setStateTo(res.data.to);
                    setStateTotal(res.data.total);
                    setPages(res.data.totalPages);
                    setBookList(res.data.data);
                }
            })
            .catch(error => console.log(error));
    }

    function initAuthorList() {
        axios
            .get("/api/authors")
            .then(res => {
                if (res.status === 200) {
                    setAuthorList(res.data);
                }
            })
            .catch(error => console.error(error));
    }

    function initCategotyList() {
        axios
            .get("/api/categories")
            .then(res => {
                if (res.status === 200) {
                    setCategoryList(res.data);
                }
            })
            .catch(error => console.log(error));
    }

    function setFilterRate(rate) {
        setRateBy(rate);
        if (rate !== null) {
            setBreadStar("rating : " + rate + " Star");
        } else {
            setBreadStar(null);
        }
        setPages(null);
    }

    function setFilterAuthor(author, authorName) {
        setAuthorBy(author);
        if (authorName !== null) {
            setBreadAuthor("author: " + authorName);
        } else {
            setBreadAuthor(null);
        }
        setPages(null);
    }

    function setFilterCate(cate, cateName) {
        setCategoryBy(cate);
        if (cateName !== null) {
            setBreadCate("category: " + cateName);
        } else {
            setBreadCate(null);
        }
        setPages(null);
    }

    function setItemPerPage(num) {
        setShowBy(num);
        setCurrentPage(1);
        setPages(null);
    }

    function setSort(s) {
        setSortBy(s);
        setPages(null);
    }

    function getStringSortBy() {
        switch (sortBy) {
            case 0:
                return " A_Z";
            case 1:
                return " on sale";
            case 2:
                return " popularity";
            case 3:
                return " price: low-high";
            case 4:
                return " price: high-low";
        }
    }

    return (
        <>
            <div className="shopzen pt-5 px-5 mt-3">
                <Breadcrumb>
                    {/* <BreadcrumbItem active> */}
                        <h3>Books </h3>
                    {/* </BreadcrumbItem> */}
                    {((breadcrumbAuthor !== null)||(breadcrumbCate !== null)||(breadcrumbStar !== null))?<p className="pt-2 mx-2">(Filtered by</p>:null}
                    {breadcrumbAuthor !== null && (
                        <BreadcrumbItem active className="pt-2">
                            {breadcrumbAuthor}
                        </BreadcrumbItem>
                    )}
                    {breadcrumbCate !== null && (
                        <BreadcrumbItem active className="pt-2">
                            {breadcrumbCate}
                        </BreadcrumbItem>
                    )}
                    {breadcrumbStar !== null && (
                        <BreadcrumbItem active className="pt-2">
                            {breadcrumbStar}
                        </BreadcrumbItem>
                    )}
                    {((breadcrumbAuthor !== null)||(breadcrumbCate !== null)||(breadcrumbStar !== null))?<p className="pt-2 ml-2">)</p>:null}
                    
                </Breadcrumb>

                <hr className="w-100" />
            </div>
            <div className="bookStore container-fluid pl-2 mt-3">
                <Row>
                    <Col md="3">
                        <h4 className="ml-4">Filter by</h4>
                        <Accordion>
                            <Accordion.Toggle
                                as={Button}
                                variant="outline-primary"
                                eventKey="1"
                                className="w-100 mb-3"
                            >
                                Category
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1" className=" mb-2">
                                <ButtonGroup vertical className="w-100">
                                    <Button
                                        className={
                                            categoryBy == 0
                                                ? "active cate-name"
                                                : "cate-name"
                                        }
                                        onClick={() =>
                                            setFilterCate(null, null)
                                        }
                                    >
                                        All
                                    </Button>
                                    {categoryList.map(c => (
                                        <Button
                                            className={
                                                categoryBy == c.id
                                                    ? "active cate-name"
                                                    : "cate-name"
                                            }
                                            onClick={() =>
                                                setFilterCate(
                                                    c.id,
                                                    c.category_name
                                                )
                                            }
                                            key={c.id}
                                        >
                                            {c.category_name}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Accordion.Collapse>
                            <Accordion.Toggle
                                as={Button}
                                variant="outline-primary"
                                eventKey="0"
                                className="w-100 mb-3"
                            >
                                Author
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0" className="mb-2">
                                <ButtonGroup vertical className="w-100">
                                    <Button
                                        className={
                                            authorBy == 0
                                                ? "active cate-name"
                                                : "cate-name"
                                        }
                                        onClick={() =>
                                            setFilterAuthor(null, null)
                                        }
                                    >
                                        All
                                    </Button>
                                    {authorList.map(d => (
                                        <Button
                                            className="author-name"
                                            className={
                                                authorBy == d.id
                                                    ? "active"
                                                    : null
                                            }
                                            onClick={() =>
                                                setFilterAuthor(
                                                    d.id,
                                                    d.author_name
                                                )
                                            }
                                            key={d.id}
                                        >
                                            {d.author_name}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Accordion.Collapse>

                            <Accordion.Toggle
                                as={Button}
                                variant="outline-primary"
                                eventKey="2"
                                className="w-100 mb-3 "
                            >
                                Rating Review
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2" className="mb-2">
                                <ButtonGroup vertical className="w-100">
                                    <Button
                                        className={
                                            rateBy == 0
                                                ? "active cate-name"
                                                : "cate-name"
                                        }
                                        onClick={() => setFilterRate(null)}
                                    >
                                        All
                                    </Button>
                                    <Button
                                        className={
                                            rateBy == 1
                                                ? "active cate-name"
                                                : "cate-name"
                                        }
                                        onClick={() => setFilterRate(1)}
                                    >
                                        1 star
                                    </Button>
                                    <Button
                                        className={
                                            rateBy == 2
                                                ? "active cate-name"
                                                : "cate-name"
                                        }
                                        onClick={() => setFilterRate(2)}
                                    >
                                        2 star
                                    </Button>
                                    <Button
                                        className={
                                            rateBy == 3
                                                ? "active cate-name"
                                                : "cate-name"
                                        }
                                        onClick={() => setFilterRate(3)}
                                    >
                                        3 star
                                    </Button>
                                    <Button
                                        className={
                                            rateBy == 4
                                                ? "active cate-name"
                                                : "cate-name"
                                        }
                                        onClick={() => setFilterRate(4)}
                                    >
                                        4 star
                                    </Button>
                                    <Button
                                        className={
                                            rateBy == 5
                                                ? "active cate-name"
                                                : "cate-name"
                                        }
                                        onClick={() => setFilterRate(5)}
                                    >
                                        5 star
                                    </Button>
                                </ButtonGroup>
                            </Accordion.Collapse>
                        </Accordion>
                    </Col>
                    <Col md="9">
                        <div className="container-fluid">
                            <Row className="mb-4">
                                <Col md="7" className="d-flex">
                                    {stateTotal != 0 ? (
                                        <p>
                                            Showing{" "}
                                            {stateTotal > 0 ? stateFrom : 0}-
                                            {stateTo} of {stateTotal} books
                                        </p>
                                    ) : null}
                                </Col>
                                <Col className="d-flex flex-row-reverse">
                                    <ButtonDropdown
                                        isOpen={dropdownOpenShow}
                                        toggle={toggleShow}
                                        className="w-50 mr-4"
                                    >
                                        <DropdownToggle
                                            caret
                                            color="primary"
                                            outline
                                        >
                                            Show {showBy}
                                        </DropdownToggle>
                                        <DropdownMenu className="w-50 mr-4">
                                            <DropdownItem
                                                onClick={() =>
                                                    setItemPerPage(5)
                                                }
                                            >
                                                Show 5
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setItemPerPage(15)
                                                }
                                            >
                                                Show 15
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setItemPerPage(20)
                                                }
                                            >
                                                Show 20
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setItemPerPage(25)
                                                }
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
                                            Sort by {getStringSortBy()}
                                        </DropdownToggle>
                                        <DropdownMenu className="w-100">
                                            <DropdownItem
                                                onClick={() => setSort(0)}
                                            >
                                                A-Z
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => setSort(1)}
                                            >
                                                Sort by on sale
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => setSort(2)}
                                            >
                                                Sort by popularity
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => setSort(3)}
                                            >
                                                Sort by price: low to high
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => setSort(4)}
                                            >
                                                Sort by price: high to low
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </Col>
                            </Row>
                            <Row>
                                {bookList.map(d => (
                                    <Col
                                        lg="3"
                                        md="6"
                                        sm="12"
                                        className="mb-3"
                                        key={d.id}
                                    >
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
                            <Row className="justify-content-center">
                                {statePages !== null && statePages !== 0 ? (
                                    <Pagi
                                        pages={statePages}
                                        setCurrentPage={setCurrentPage}
                                    />
                                ) : null}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
