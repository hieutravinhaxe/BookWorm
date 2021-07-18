import React from "react";
import ReactDOM from "react-dom";
import Footer from "./generals/Footer";
import Navigation from "./generals/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import BookCard from "./generals/BookCard";
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
                <Route axact path="/about">
                    <About/>
                </Route>
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
