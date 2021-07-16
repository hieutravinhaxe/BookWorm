import React from "react";
import ReactDOM from "react-dom";
import Footer from "./generals/Footer";
import Navigation from "./generals/Nav";
import About from "./pages/About";
import { BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <About/>
            </BrowserRouter>
        </div>
    );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
