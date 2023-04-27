import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const url = "http://127.0.0.1:8000/token/";

const Login = () => {
      const [isAuth, setIsAuth] = useState(false)

      useEffect(() => {
            if (localStorage.getItem('access_token') !== null) {
                  setIsAuth(true)
            }
      },[isAuth]);

      const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = {
                  username: e.target.username.value,
                  password: e.target.password.value,
            };
            try {
                  const response = await fetch(url, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(formData),
                        credentials: 'include',
                  })
                  if (!response.ok) {
                        throw new Error('Login failed');
                  }
                  const data = await response.json();
                  localStorage.clear();
                  localStorage.setItem('access_token', data.access);
                  localStorage.setItem('refresh_token', data.refresh);
                  window.location.href = "/";
            } catch(e){
                  console.log(e.message);
            }
      };

      return (
            <>
            <H1>Login</H1>

            <FormContainer>
                  <form onSubmit={handleSubmit} className="row g-3">
                        <FormChild className="col-md-12">
                              <label className="form-label" hidden htmlFor="username">Username</label>
                              <input name="username" type="text" className="form-control" id="username" placeholder="Username" required></input>
                        </FormChild> 
                        <FormChild className="col-md-12">
                              <label className="form-label" hidden htmlFor="password">Password</label>
                              <input className="form-control" id="password" name="password" placeholder="Password" required type="password"></input>
                        </FormChild>
                        <FormChild className="col-12">
                              <button className="btn btn-primary" type="submit">Login</button>
                        </FormChild>
                  </form>
            </FormContainer>
            
            </>
      );
};

const H1 = styled.h1`
      color: red;
      text-align: center;
      margin-bottom: 5%;
      margin-top: 100px;
`;

const FormContainer = styled.div`
      margin: auto;
      width: 300px;
`;


const FormChild = styled.div`
margin-bottom: 15px;
`;



export default Login;


// const handleSubmit = async (e) => {
//       e.preventDefault();
//       const formData = {
//             username: e.target.username.value,
//             password: e.target.password.value,
//       };

//       await fetch(url, {
//             method: "POST",
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(formData),
//             credentials: 'include',
//       }).then((res) => res.json())
//       .then((res) => {
//             console.log('res', res)
//             localStorage.clear();
//             localStorage.setItem('access_token', res.access);
//             localStorage.setItem('refresh_token', res.refresh);
//       }).catch(err => console.log("err", err))
      
//       console.log("local", localStorage)
     
//       window.location.href = "/";

// } 