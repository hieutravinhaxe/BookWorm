import React from "react";
import ReactDOM from "react-dom";
import Footer from "./generals/Footer";
import Navigation from "./generals/Nav";
import Home from "./pages/Home/home.js";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import { BrowserRouter,Switch, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navigation />
                <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/product/:bookId">
                    <Product/>
                </Route>
                <Route axact path="/about">
                    <About/>
                </Route>
                <Route exact path="/shop">
                    <Shop/>
                </Route>
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
