// import React, { Component } from "react";
// import axios from "axios";
// import ReactDOM from "react-dom";
// import { Container, Row, Col, Button } from "reactstrap";
// import BookCard from "../../generals/BookCard";
// import Carousel from "react-elastic-carousel";

// const breakPoints = [
//     { width: 1, itemsToShow: 1 },
//     { width: 150, itemsToShow: 2 },
//     { width: 400, itemsToShow: 3 },
//     { width: 800, itemsToShow: 4 }
// ];

// export default function Home() {

//     useEffect(() => {
//         initOnSaleData();
//         console.log();
//     }, [input])

//     function initOnSaleData() {
//         axios
//             .get(
//                 `http://127.0.0.1:8000/api/books?limit=10&page=1&orderSPrice=1`
//             )
//             .then(res => {
//                 const bookOnSale = res.data;
//             })
//             .catch(error => console.log(error));
//     }

//     return (
//         <Container className="onSale bg-light">
//             <Row className="onSale-title  m-3">
//                 <Col xs="6" className="mt-2 d-flex">
//                     <h4>On Sale</h4>
//                 </Col>
//                 <Col xs="6" className="mt-2 d-flex flex-row-reverse">
//                     <Button outline color="primary" className="text-right">
//                         View all
//                     </Button>
//                 </Col>
//             </Row>
//             {/* <!-- carousel muti items --> */}
//             <Carousel breakPoints={breakPoints}>
//                 <BookCard />
//             </Carousel>
//         </Container>
//     );
// }

import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Container, Row, Col, Button } from "reactstrap";
import BookCard from "../../generals/BookCard";
import Carousel from "react-elastic-carousel";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 150, itemsToShow: 2 },
    { width: 400, itemsToShow: 3 },
    { width: 800, itemsToShow: 4 }
];

export default class Home extends Component {
    state = {
        onSaleList : [],
    }

    componentDidMount(){
        this.initOnSaleData();
    }

    initOnSaleData(){
        axios
            .get(
                `http://127.0.0.1:8000/api/books?limit=10&page=1&orderSPrice=0`
            )
            .then(res => {
                //const bookOnSale = res.data;
                if(res.status === 200){
                    this.setState({onSaleList:res.data.data})
                }
            })
            .catch(error => console.log(error));
    }

    initReacomData(){

    }

    initPopularData(){
        
    }

    render() {
        return (
            <>
                <Container className="onSale bg-light">
                    <Row className="onSale-title  m-3">
                        <Col xs="6" className="mt-2 d-flex">
                            <h4>On Sale</h4>
                        </Col>
                        <Col xs="6" className="mt-2 d-flex flex-row-reverse">
                            <Button
                                outline
                                color="primary"
                                className="text-right"
                            >
                                View all
                            </Button>
                        </Col>
                    </Row>
                    {/* <!-- carousel muti items --> */}
                    <Carousel breakPoints={breakPoints}>
                        {this.state.onSaleList.map((d) => (
                            <BookCard
                                key={d.id}
                                bookTitle={d.book_title}
                                bookAuthor={d.author_name}
                                finalPrice={d.final_price}
                                bookPrice={d.book_price}
                                bookImage={d.book_cover_photo}
                            >
                            </BookCard>
                        ))}
                    </Carousel>
                </Container>
            </>
        );
    }
}
