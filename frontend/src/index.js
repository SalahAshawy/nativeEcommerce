import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import'./App.css';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router >
    <Routes>
   < Route path="/" element = {<Products/> }/>
   { < Route path="add-product" element = {<AddProduct/> }/> }
   </Routes>
  </Router>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
