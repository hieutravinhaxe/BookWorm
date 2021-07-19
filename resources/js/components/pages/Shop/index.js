import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function Shop() {
    // handle click drop down
    const [dropdownOpenAuthor, setOpenAuthor] = useState(false);
    const toggleAuthor = () => setOpenAuthor(!dropdownOpenAuthor);

    const [dropdownOpenCate, setOpenCate] = useState(false);
    const toggleCate = () => setOpenCate(!dropdownOpenCate);

    const [dropdownOpenStar, setOpenStar] = useState(false);
    const toggleStar = () => setOpenStar(!dropdownOpenStar);

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
    const [showBy, setShowBy] = useState(15);
    const [sortBySale, setSortBySale] = useState(null);
    const [sortByPopu, setSortByPopu] = useState(null);
    const [sortByPrice, setSortByPrice] = useState(null);

    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        initAuthorList();
        initCategotyList();
        initBookList();
    }, []);

    function initBookList(){
        
    }

    function initAuthorList() {
        axios
            .get("http://127.0.0.1:8000/api/authors")
            .then(res => {
                if (res.status === 200) {
                    setAuthorList(res.data);
                }
            })
            .catch(error => console.error(error));
    }

    function initCategotyList() {
        axios
            .get("http://127.0.0.1:8000/api/categories")
            .then(res => {
                if (res.status === 200) {
                    setCategoryList(res.data);
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <div className="shopzen pt-5 px-5">
                <Breadcrumb>
                    <BreadcrumbItem active>
                        <h3>Books</h3>
                    </BreadcrumbItem>
                    <BreadcrumbItem active className="pt-2">
                        author
                    </BreadcrumbItem>
                </Breadcrumb>

                <hr className="w-100" />
            </div>
            <div className="bookStore container-fluid pl-2 mt-3">
                <Row>
                    <Col md="3">
                        <h4 className="ml-4">Filter by</h4>
                        <ButtonDropdown
                            isOpen={dropdownOpenAuthor}
                            toggle={toggleAuthor}
                            className="w-100 mb-4"
                        >
                            <DropdownToggle caret color="primary" outline>
                                Authors
                            </DropdownToggle>
                            <DropdownMenu className="w-100">
                                <DropdownItem>All</DropdownItem>
                                {authorList.map(d => (
                                    <DropdownItem key={d.id}>
                                        {d.author_name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </ButtonDropdown>
                        <ButtonDropdown
                            isOpen={dropdownOpenCate}
                            toggle={toggleCate}
                            className="w-100 mb-4"
                        >
                            <DropdownToggle caret color="primary" outline>
                                Categories
                            </DropdownToggle>
                            <DropdownMenu className="w-100">
                                <DropdownItem>All</DropdownItem>
                                {categoryList.map(c => (
                                    <DropdownItem key={c.id}>
                                        {c.category_name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </ButtonDropdown>
                        <ButtonDropdown
                            isOpen={dropdownOpenStar}
                            toggle={toggleStar}
                            className="w-100 mb-4"
                        >
                            <DropdownToggle caret color="primary" outline>
                                Stars
                            </DropdownToggle>
                            <DropdownMenu className="w-100">
                                <DropdownItem>All</DropdownItem>
                                <DropdownItem>1 Star</DropdownItem>
                                <DropdownItem>2 Stars</DropdownItem>
                                <DropdownItem>3 Stars</DropdownItem>
                                <DropdownItem>4 Stars</DropdownItem>
                                <DropdownItem>5 Stars</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </Col>
                    <Col md="9">
                        <div className="container-fluid">
                            <Row className="mb-4">
                                <Col md="6" className="d-flex">
                                    <p>Show 1-12 of 126 books</p>
                                </Col>
                                <Col className="d-flex flex-row-reverse">
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
                                            <DropdownItem>Show 5</DropdownItem>
                                            <DropdownItem>Show 15</DropdownItem>
                                            <DropdownItem>Show 20</DropdownItem>
                                            <DropdownItem>Show 25</DropdownItem>
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
                                            <DropdownItem>
                                                Sort by on sale
                                            </DropdownItem>
                                            <DropdownItem>
                                                Sort by popularity
                                            </DropdownItem>
                                            <DropdownItem>
                                                Sort by price: low to high
                                            </DropdownItem>
                                            <DropdownItem>
                                                Sort by price: high to low
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
