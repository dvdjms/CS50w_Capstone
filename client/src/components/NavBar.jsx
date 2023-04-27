import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
      const [isAuth, setIsAuth] = useState(false);

      useEffect(() => {
            if (localStorage.getItem('access_token') !== null) {
                  setIsAuth(true);
            }
      },[isAuth]);


      return (
            <>
            <NavBarContainer>
                  <H1>Weatherby</H1>
                  {isAuth ? 
                  <Ul>
                        <Li><NavLink to="/">Home</NavLink></Li>
                        <Li><NavLink to="/learn">Learn</NavLink></Li> 
                        <Li><NavLink to="/about">About</NavLink></Li> 
                        <Li><NavLink to="/logout">Logout</NavLink></Li>
                  </Ul> :
                  <Ulend>
                        <Li><NavLink to="/login">Login</NavLink></Li>
                        <Li><NavLink to="/register">Register</NavLink></Li>
                  </Ulend>}
            </NavBarContainer>
            </>
      )
}



const NavBarContainer = styled.div`
      background-color: white;
      height: 9vh;
      margin: 0px;
      padding: 0px;
      width: 100vw;
      border: solid white;
      box-shadow: 0 0 30px 0 #dddddd;
      position: fixed;
      top: 0;
      z-index: 2;
`;

const H1 = styled.h3`
      color: #e7bb70;
      font-family: sans-serif;
      font-weight: 600;
      float: left;
      padding: 12px 12px 0px 30px;
      margin: 0;
      width: 30vw;
      position: absolute;
`;


const Ul = styled.ul`
      list-style: none;
      display: flex;
      justify-content: center;
      gap: 3vw;
      padding: 16px;
      text-align: center;
      width: 100vw;
`;

const Ulend = styled.ul`
      float: right;
      list-style: none;
      display: flex;
      justify-content: space-between;
      padding-right: 30px;
      margin-top: 25px;
      width: 200px;
`;

const Li = styled.li`
      float: left;
`;


const NavLink = styled(Link)`
      &:hover {
            color: #639242;
            text-decoration: none;
      }
      &:active {
            color: #924242;
      }
`;

export default NavBar;