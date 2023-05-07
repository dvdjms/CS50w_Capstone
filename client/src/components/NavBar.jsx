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
                  <H3>WeatherWise</H3>
                  {isAuth ? 
                  <ULOut>
                        <Li><NavLink to="/logout">Logout</NavLink></Li>
                  </ULOut> :
                  <UL>
                        <Li><NavLink to="/login">Login</NavLink></Li>
                        <Li><NavLink to="/register">Register</NavLink></Li>
                  </UL>}
            </NavBarContainer>
            </>
      );
};


const NavBarContainer = styled.div`
      background-color: white;
      height: 60px;
      margin: 0px;
      padding: 0px;
      width: 100%;
      border: solid white;
      box-shadow: 0 0 30px 0 #dddddd;
      position: fixed;
      top: 0;
      z-index: 2;
      @media (max-width: 568px) {
            height: 80px;
      }
`;

const H3 = styled.h3`
      color: #924242;
      font-family: sans-serif;
      font-weight: 600;
      float: left;
      height: 100%;
      padding: 14px 12px 0px 70px;
      margin: 0;
      width: 30vw;
      position: absolute;
      @media (max-width: 768px) {
            padding: 12px 12px 0px 30px;
      }
      @media (max-width: 568px) {
            height: 50%;

            text-align: center;
            width: 100%;
      }
`;

const UL = styled.ul`
      float: right;
      list-style: none;
      display: flex;
      justify-content: space-between;
      padding-right: 30px;
      margin-top: 18px;
      width: 200px;
      @media (max-width: 568px) {
            gap: 10px;
            justify-content: center;
            margin-top: 45px;
            padding-right: 30px;
            width: 100%;
      };
`;

const ULOut = styled(UL)`
       width: 150px;
       @media (max-width: 568px) {
            justify-content: center;
            margin-top: 45px;
            width: 100%;
      };
`;

const Li = styled.li`
      float: left;
`;


const NavLink = styled(Link)`
      color: #924242;
      &:hover {
            color: #e6a84a;
            text-decoration: none;
      }
      &:active {
            color: #424a92;
      }
`;


export default NavBar;
