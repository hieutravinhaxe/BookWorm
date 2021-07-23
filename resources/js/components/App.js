import React ,{useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Footer from "./generals/Footer";
import Navigation from "./generals/Nav";
import Home from "./pages/Home/home.js";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ThankYou from "./pages/Cart/ThankYou.js"
import { BrowserRouter,Switch, Route} from "react-router-dom";

const cartsFromLocal = JSON.parse(localStorage.getItem('carts')) || []

function App() {

    const [carts, setCarts] = useState(cartsFromLocal)

    return (
        <BrowserRouter>
            <div className="app">
                <Navigation carts={carts.length} />
                <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/product/:bookId">
                    <Product carts={carts} setCarts={setCarts}/>
                </Route>
                <Route axact path="/about">
                    <About />
                </Route>
                <Route exact path="/shop/sale">
                    <Shop onSale={1}></Shop>
                </Route>
                <Route exact path="/shop">
                    <Shop onSale={0}/>
                </Route>
                <Route exact path="/cart">
                    <Cart carts={carts} setCarts={setCarts}/>
                </Route>
                <Route exact path="/thank">
                    <ThankYou/>
                </Route>
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
