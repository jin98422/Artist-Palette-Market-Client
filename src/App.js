import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import decode from 'jwt-decode';
import routes from "./routes";
import "./App.css";

window.$host = 'http://localhost:8000/api';

function App() {
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token === null || token === "") {
        if(window.location.pathname === "/login" || window.location.href.includes('forgot') || window.location.pathname === "/register" || window.location.href.includes('thanks')) {
          setLoad(true)
        } else {
          window.location.href="/login";
        }        
    } else {
        const decodedToken = decode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          if(window.location.pathname === "/login" || window.location.href.includes('thanks') || window.location.pathname === "/register" || window.location.href.includes('thanks')) {
            setLoad(true)
          } else {
            window.location.href="/login";
          }   
        } else {
          axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
          setLoad(true)
        }
    }    
  }, [])
  return(
    load && <Router basename="/">
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        })}
      </div>
    </Router>
  )  
}

export default App;
