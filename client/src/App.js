import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect} from 'react';
import Home from "./container/Home";
import Login from "./container/Login";
import Register from "./container/Register";
import NavBar from "./components/NavBar";
import Logout from "./container/Logout";
// import './interceptors/intercept';


function App() {

  useEffect(() => {

    const accessToken = localStorage.getItem('access_token');
    const tokenExpired = isTokenExpired(accessToken);

    if (tokenExpired === true || localStorage.getItem('refresh_token') === null) {
          localStorage.clear();
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
    }
    else {
          (async () => {
                try {
                      const data = await fetch('http://localhost:8000/home/', {
                            headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${accessToken}`
                            }
                      });
                      const message = await data.json();
                      console.log(message);

                      } catch (e) {
                            console.log('not auth');
                      };
          })()};
    },[]);

    function isTokenExpired(token) {
          if(token === null){
                return;
          }
          const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
          // eslint-disable-next-line
          return Math.floor((new Date).getTime()) / 1000 >= expiry;
    };


  return (
    <div className="App">

      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

    </div>
  );
};


export default App;