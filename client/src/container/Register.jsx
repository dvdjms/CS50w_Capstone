import styled from 'styled-components';
import React from 'react';

const url = "http://127.0.0.1:8000/api/users";

const Register = () => {
      // const [isAuth, setIsAuth] = useState(false)

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
            } catch(e){
                  console.log(e.message);
            }
            window.location.href = '/login';
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
                              <button className="btn btn-primary" type="submit">Register</button>
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
      width: 600px;
`;

const FormChild = styled.div`
      margin-bottom: 15px;
`;


export default Register;