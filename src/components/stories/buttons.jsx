import React from 'react';
import styled from 'styled-components';
import TrashIcon from '../../assets/icons/delete.png';

export const RectButton = styled.button`
  font-family: "Roboto", sans-serif;
  color: black;
  font-weight: 100;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 50px;
  width: 65px;
  font-size: 11px;
  border: 1px solid black;
`;

export const RoundButton = styled.button`
  font-family: "Roboto", sans-serif;
  font-color: black;
  font-weight: normal;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 4vw;
  width: 4vw;
  font-size: 15px;
  border-radius: 50%;
  border: 1px solid white;
  text-align: center; 
`;

export const TrashButton = styled(RectButton)`
  backgroundImage: url(${TrashIcon});

`;

export const RectSubmitButton = styled(RectButton)`
  width: 8vw;
  height: 5vh;
  border-radius: 0.5vw;
  font-size: 130%;
`;

export const RoundBackButton = styled(RoundButton)`
  float: left;
`;

export const RoundAddLocationButton = styled(RoundButton)`
  min-height: 3vw;
  min-width: 3vw;
  height: 3vw;
  width: 3vw;
`;

export const RoundHelpButton = styled(RoundButton)`

`;

export const TellYourStoryButton = styled(RectButton)`
  width: 32vw;
  height: 10vh;
  border-radius: 2vw;
  font-size: 190%;
`;
