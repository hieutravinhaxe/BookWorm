import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ThankYou from "./ThankYou.js";
import swal from "sweetalert";
import "./cart.css";
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    CardHeader,
    CardBody,
    Card
} from "reactstrap";
import axios from "axios";

export default function Cart({ carts, setCarts }) {
    let history = useHistory();

    //let carts = JSON.parse(localStorage.getItem("carts")) || [];

    const [completeOrder, setCompleteOrder] = useState(false);

    const [cartsTemp, setCartsTemp] = useState(carts);

    let tempt = [...cartsTemp]

    useEffect(() => {}, [cartsTemp]);

    function getImage(image) {
        if (image === null) {
            return "/images/book1.jpg";
        } else {
            return "/images/" + image + ".jpg";
        }
    }

    function upQuanlity(index) {
        if (cartsTemp[index].quanlity === 8) {
            swal({
                title: "WARNING!",
                text: "Amount from 1 - 8",
                icon: "warning",
                button: "OK",
              });
        } else {
            cartsTemp[index].quanlity += 1;
            localStorage.setItem("carts", JSON.stringify(cartsTemp));
            document.getElementById(index).value = cartsTemp[index].quanlity;
            document.getElementById("totalItem" + index).innerHTML =
                cartsTemp[index].quanlity * cartsTemp[index].bookFPrice;
            document.getElementById("totalPrice").innerHTML =
                "$" + getTotalPrice();
        }
    }

    function downQuanlity(index, bookId) {
        if (cartsTemp[index].quanlity === 1) {
            swal({
                title: "Are you sure?",
                text:
                    "Once deleted, you will not be able to recover this product!",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(willDelete => {
                if (willDelete) {
                    // console.log(tempt.slice(index,1))
                    let tempt = []
                    // tempt = tempt.slice(index)
                    //console.log(bookId, tempt)
                    cartsTemp.forEach(d=>{
                        if(d.bookId!==bookId){
                            tempt=[...tempt,d]
                        }
                    })
                    setCartsTemp(tempt)
                    localStorage.setItem("carts", JSON.stringify(tempt));
                    setCarts(tempt)
                } else {
                    swal("Your product is safe!");
                }
            });
        } else {
            cartsTemp[index].quanlity -= 1;
            localStorage.setItem("carts", JSON.stringify(cartsTemp));
            document.getElementById(index).value = cartsTemp[index].quanlity;
            document.getElementById("totalItem" + index).innerHTML =
                cartsTemp[index].quanlity * cartsTemp[index].bookFPrice;
            document.getElementById("totalPrice").innerHTML =
                "$" + getTotalPrice();
        }
    }

    function setIdFPrice(index) {
        return "totalItem" + index;
    }

    function getTotalPrice() {
        let total = 0;
        for (let i = 0; i < cartsTemp.length; i++) {
            total += cartsTemp[i].bookFPrice * cartsTemp[i].quanlity;
        }
        return total;
    }

    async function checkExist(id) {
        await axios
            .get(`/api/books?exist=` + id)
            .then(res => {
                if (res.data.checkExist === 1) {
                    return true;
                } else if (res.status.checkExist === 0) {
                    return false;
                }
            })
            .catch(error => console.log(error));
    }

    async function addItemToOrder(orderId, item) {
        let success = false;
        let data = {
            orderId: orderId,
            bookId: item.bookId,
            quanlity: item.quanlity,
            price: item.quanlity * item.bookFPrice
        };
        await axios({
            method: "post",
            url: `/api/orders/${orderId}/items`,
            data: data
        })
            .then(res => {
                if (res.status === 200) {
                    success = true;
                }
            })
            .catch(error => {
                console.log(error);
            });
        return success;
    }

    async function handleOrder() {
        let successBook = [];
        let errorBook = [];

        await cartsTemp.forEach(d => {
            if (checkExist(d.bookId)) {
                successBook.push(d);
            } else {
                errorBook.push(d);
            }
        });

        if (successBook.length > 0) {
            let data = {
                amount: successBook.length
            };
            let tempBook = [...successBook];
            await axios({
                method: "post",
                url: `/api/orders`,
                data: data
            })
                .then(res => {
                    if (res.status === 200) {
                        successBook.forEach((d, index) => {
                            if (addItemToOrder(res.data.order.id, d)) {
                                tempBook = tempBook.slice(index, 1);
                                localStorage.setItem(
                                    "carts",
                                    JSON.stringify(tempBook)
                                );
                                setCartsTemp(tempBook);
                            }
                        });
                        setCarts([]);
                        setCompleteOrder(true);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            //setCompleteOrder(true)
        }
        if (errorBook.length > 0) {
        }
    }

    function getIndexForProduct(index) {
        return "product" + index.bookId;
    }

    return completeOrder === false ? (
        <div className="cart p-5">
            <h4>Your carts: {carts.length} items</h4>
            <hr className="w-100" />
            {cartsTemp.length!=0?
            <Container className="container-fluid">
                <Row>
                    <Col md="9">
                        <Table className="table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quanlity</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartsTemp.map((d, index) => (
                                    <tr id={getIndexForProduct(d)} key={index}>
                                        <td>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <img
                                                            className="card-img-top"
                                                            src={getImage(
                                                                d.bookImage
                                                            )}
                                                            alt="Card image cap"
                                                        />
                                                    </Col>
                                                    <Col className="mt-4">
                                                        <h4 className="bookTitle">
                                                            {d.bookTitle}
                                                        </h4>
                                                        <p className="bookAuthor">
                                                            {d.author}
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </td>
                                        <td>
                                            <h4 className="priceDiscount mt-4">
                                                ${d.bookFPrice}
                                            </h4>
                                            {d.bookPrice!=d.bookFPrice?<del className="price">
                                                ${d.bookPrice}
                                            </del>:null}
                                            
                                        </td>
                                        <td>
                                            <Row>
                                                <Col className="col-xs-3 col-xs-offset-3 mt-4">
                                                    <div className="input-group number-spinner">
                                                        <span className="input-group-btn">
                                                            <Button
                                                                outline
                                                                color="secondary"
                                                                onClick={() =>
                                                                    downQuanlity(
                                                                        index, d.bookId
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-minus"></i>
                                                                -
                                                            </Button>
                                                        </span>
                                                        <input
                                                            id={index}
                                                            readOnly
                                                            type="number"
                                                            className="form-control text-center"
                                                            value={d.quanlity}
                                                        />
                                                        <span className="input-group-btn">
                                                            <Button
                                                                outline
                                                                color="secondary"
                                                                onClick={() =>
                                                                    upQuanlity(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </Button>
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                            <h4
                                                id={setIdFPrice(index)}
                                                className="priceItemsTotal mt-4"
                                            >
                                                {d.quanlity * d.bookFPrice}
                                            </h4>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="3">
                        <Card className="text-center">
                            <CardHeader>Carts Total</CardHeader>
                            <CardBody>
                                <h5 id="totalPrice" className="card-title">
                                    ${getTotalPrice()}
                                </h5>
                                <Button
                                    outline
                                    color="primary"
                                    className="w-100"
                                    onClick={() => handleOrder()}
                                >
                                    Place order
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            :<div className="none-items" ></div>}
        </div>
    ) : (
        <ThankYou />
    );
}
