import React from 'react';
import styled from 'styled-components';
import {
  NavLink,
} from 'react-router-dom';
import BeaverIcon from '../../assets/icons/beaver.png';
import { RectButton, RoundHelpButton } from '../stories/buttons';

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;

  border-bottom: 1px solid black;
  height: 12vh;
  background-color: white;
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20vw;
  height: 12vh;
`;

const NavRight = styled.div`
  display: flex;
  justify-content: space-around;
  width: 35vw;

`;

const HeaderIcon = styled.div`
  background: url(${BeaverIcon}) no-repeat;
  background-size: cover;
  // border: 1px solid black;
  // width: 10vw;
  width: 7vw;
  // height: 10vh;
`;

const Header = () => (
  <Nav>
    <NavLeft>
      <HeaderIcon />
      {/* <img src={BeaverIcon} /> */}
    </NavLeft>
    <NavRight>
      <NavLink to="/vision">
        <RectButton>Vision</RectButton>
      </NavLink>
      <NavLink to="/contribute">
        <RectButton>Contribute</RectButton>
      </NavLink>
      <NavLink to="/help">
        <RoundHelpButton>?</RoundHelpButton>
      </NavLink>
    </NavRight>
  </Nav>
);

export default Header;
