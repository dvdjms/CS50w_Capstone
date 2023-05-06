import styled from 'styled-components';
import React, { useState }  from 'react';

const url = "http://127.0.0.1:8000/api/users";

const Register = () => {
      const [usernameExists, setUsernameExists] = useState('');

      const handleSubmit = (e) => {
            e.preventDefault();
             const formData = {
                  username: e.target.username.value,
                  first_name: e.target.firstname.value,
                  last_name: e.target.lastname.value,
                  email: e.target.email.value,
                  password: e.target.password.value,
            };
            try {
                  fetch(url, {
                        method: "POST",
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                  })
                  .then(response => response.json())
                  .then(data => {
                        if (data.username[0] === 'A user with that username already exists.') {
                              setUsernameExists(data.username[0]);
                        }
                        else {
                              window.location.href = '/login';
                        };
                   });
                  
            } catch(e){
                  console.log(e.message);
            };

      };


      return (
            <>
            <H1>Register</H1>
            <FormContainer>
                  <form onSubmit={handleSubmit} className="row g-3">
                        <FormChild className="col-md-6">
                              <label className="form-label" hidden htmlFor="firstname">First name</label>
                              <input className="form-control" id="firstname" name="firstname" placeholder="First name" required type="text"></input>
                        </FormChild>
                        <FormChild className="col-md-6">
                              <label className="form-label" hidden htmlFor="lastname">Last name</label>
                              <input className="form-control" id="lastname" name="lastname" placeholder="Last name" required type="text"></input>
                        </FormChild>
                        <FormChild className="col-md-12">
                              <label className="form-label" hidden htmlFor="username">Username</label>
                              <input className="form-control" id="username" name="username" placeholder="Username" required type="text"></input>
                        </FormChild> 
                        <FormChild className="col-md-12">
                              <label className="form-label" hidden htmlFor="email">Email</label>
                              <input className="form-control" id="email" name="email" placeholder="Email" required type="email"></input>
                        </FormChild>
                        <FormChild className="col-md-6">
                              <label className="form-label" hidden htmlFor="password">Password</label>
                              <input className="form-control" id="password"  name="password" placeholder="Password" required type="password" ></input>
                        </FormChild>
                        <FormChild className="col-md-6">
                              <label hidden htmlFor="confirmpassword" className="form-label">Confirm password</label>
                              <input className="form-control" id="confirmpassword" name="confirmpassword" placeholder="Confirm password" required type="password"></input>
                        </FormChild> 
                        <FormChild className="col-12">
                              <Button className="btn btn-primary" type="submit">Register</Button>
                              <Paragraph>{usernameExists}</Paragraph>
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
      width: 600px;
      @media (max-width: 678px) {
            width: 500px;
      }
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
      width: 90px;
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
      padding: 6px 0 0 60px;
      @media (max-width: 568px) {
            padding: 10px 0 0 6px;
      }
`;

export default Register;