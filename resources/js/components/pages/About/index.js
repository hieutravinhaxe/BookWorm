import React, { Component } from "react";
import Navigation from "../../generals/Nav";
import { BrowserRouter } from "react-router-dom";
import {Container, Row, Col} from "reactstrap";

export default function About({carts, setCarts}) {

    return (
        <div className="about p-5 mt-4">
            <h4>About Us</h4>
            <hr className="w-100" />
            <h2 className="text-center ">Welcome to Bookworm</h2>
            <Container className="mx-4">
                <Row>
                    <Col lg="12" className="m-5">
                        "Bookworm is an independent New York bokkstore and
                        language school with locations in Manhattan and
                        Brooklyn. We specialize in travel books and language
                        classes"
                    </Col>
                </Row>
                <Row>
                    <Col lg="6" className="pl-5">
                        <h3>Our Story</h3>
                        <p>
                            The name Bookworm was taken from the original name
                            for New York Internationnal Airport, which was
                            renamed JFK in Decenber 1963
                        </p>
                        <p>
                            Our Manhattan store has just moved to the West
                            Village. Our new location to 170 7th Avenue South,
                            at the comer of Perry Street.
                        </p>
                        <p>
                            From March 2008 through May 2016, the store was
                            loacted in the Flatiron District
                        </p>
                    </Col>
                    <Col lg="6" className="pl-5 pr-5">
                        <h3>Our Vision</h3>
                        <p>
                            One of the last travel bookstores in the country,
                            our Manhattan store carrles a range of guldebooks
                            (all 10% off) to sult the needs and tastes of every
                            traveler and budget.
                        </p>
                        <p>
                            We believe that a novel or travelogue can be just as
                            valuable a key to place as any guidebook, and our
                            well-read, wel-traveled staff is happy to make
                            reading recommendations for any traveler, book
                            lover, or gift giver.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
