import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const url = "http://127.0.0.1:8000/api/token/";

const Login = () => {
      const [isAuth, setIsAuth] = useState(false);
      const [loginFailed, setLoginFailed] = useState('');

      useEffect(() => {
            if (localStorage.getItem('access_token') !== null) {
                  setIsAuth(true);
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
                        setLoginFailed('Check username and password!');
                        throw new Error('Login failed');
                  }
                  const data = await response.json();
                  localStorage.clear();
                  localStorage.setItem('access_token', data.access);
                  localStorage.setItem('refresh_token', data.refresh);
                  window.location.href = "/";
            } catch(e){
                  console.log(e.message);
            };
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
                              <Button className="btn btn-primary" type="submit">Login</Button>
                              <Paragraph>{loginFailed}</Paragraph>
                        </FormChild>
                  </form>
            </FormContainer>
            
            </>
      );
};

const H1 = styled.h1`
      color: #924242;
      text-align: center;
      margin-bottom: 5%;
      margin-top: 100px;
`;

const FormContainer = styled.div`
      margin: auto;
      width: 300px;
      @media (max-width: 568px) {
            width: 240px;
      }
`;

const FormChild = styled.div`
      margin-bottom: 15px;
`;

const Button = styled.button`
      float:left;
      background-color:#ffffff;
      border: solid #8e0a0a;
      border-radius: 5px;
      color: #8e0a0a;
      font-size: 14px;
      font-weight: 600;
      height: 35px;
      width: 70px;
      &:hover {
            background-color: #8e0a0a;
            border: solid 1px #8e0a0a;
            color: #ffffff;
            cursor: pointer;
      }
      &:focus {
            box-shadow: 1px 1px #ba4c4c;
            outline: #8e0a0a;
            border: solid 2px #8e0a0a;
      }
`;

const Paragraph = styled.p`
      color: red;
      float:left;
      padding: 25px 0 0 0px;
      text-align: center;
      width: 300px;
      @media (max-width: 568px) {
            width: 240px;
      }
`;


export default Login;