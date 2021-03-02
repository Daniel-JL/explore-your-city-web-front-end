import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import isAtLeftBoundary from '../../helpers/isAtLeftBoundary';
import isAtRightBoundary from '../../helpers/isAtRightBoundary';
import addressListIsNotEmpty from '../../helpers/addressListIsNotEmpty';
import addressIndexIsAtMax from '../../helpers/addressIndexIsAtMax';
import textAreaIsVisible from '../../helpers/textAreaIsVisible';
import addressListHasNewItems from '../../helpers/addressListHasNewItems';
import addressListHasLessItems from '../../helpers/addressListHasLessItems';
import addressListIsInitialised from '../../helpers/addressListIsInitialised';
import { RectButton, TrashButton } from './buttons';

const AddressListBrowserContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

`;

const ButtonContainer = styled.div`
    display: flex;
    
`;

const Input = styled.input`
    margin-top: 1vh;
    margin-bottom: 4vh;
    padding: 8px;
    background-color: rgb(230, 230, 230);
    border-radius: 5px;
    border: 1px solid grey;
    width: 90%;
`;

const TextArea = styled.textarea`
    display: block;
    margin-top: 1vh;
    margin-bottom: 4vh;
    padding: 8px;
    // background-color: rgb(230, 230, 230);
    border-radius: 5px;
    border: 1px solid grey;
    min-width: 90%;
    max-width: 90%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

const AddressListBrowser = ({ 
  addressList,
  handleDeleteAddressListItem,
  handleLeftRightButtonClick,
}) => {
  const [numOfAddresses, setNumOfAddresses] = useState(0);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
  const locationStoryRef = useRef();

  const handleLeftArrowClick = () => {
    if (isAtLeftBoundary(currentAddressIndex)) {
      setCurrentAddressIndex((currentAddressIndex) => currentAddressIndex - 1);
      handleLeftRightButtonClick(currentAddressIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (isAtRightBoundary(currentAddressIndex, numOfAddresses)) {
      setCurrentAddressIndex((currentAddressIndex) => currentAddressIndex + 1);
      handleLeftRightButtonClick(currentAddressIndex + 1);
    }
  };

  const handleTrashButtonClick = () => {
    if (addressListIsNotEmpty(addressList)) {
      if (addressIndexIsAtMax(addressList, currentAddressIndex)) {
        setCurrentAddressIndex((currentAddressIndex) => currentAddressIndex - 1);
      }
      handleDeleteAddressListItem(currentAddressIndex);
    }
  };

  const handleHideTextButtonClick = () => {
    const textArea = locationStoryRef.current;
    if (textAreaIsVisible(textArea)) {
      textArea.style.display = 'none';
    } else {
      textArea.style.display = 'block';
    }
  };

  useEffect(() => {
    if (addressListHasNewItems(addressList, numOfAddresses)) {
      setNumOfAddresses((numOfAddresses) => addressList.length);
      setCurrentAddressIndex((currentAddressIndex) => addressList.length - 1);
    } else if (addressListHasLessItems(addressList, numOfAddresses)) {
      setNumOfAddresses((numOfAddresses) => numOfAddresses - 1);
      setCurrentAddressIndex((currentAddressIndex) => addressList.length - 1);
    }
  }, [JSON.stringify(addressList)]);

  return (
    <AddressListBrowserContainer>
      <ButtonContainer>
        <RectButton
          aria-label="left-arrow"
          onClick={handleLeftArrowClick}
        >
          Left
        </RectButton>
        <RectButton
          aria-label="right-arrow"
          onClick={handleRightArrowClick}
        >
          Right
        </RectButton>
        <TrashButton
          id="trash-button"
          aria-label="trash-button"
          onClick={handleTrashButtonClick}
        >
          Trash
        </TrashButton>
        <RectButton
          id="hide-text-button"
          aria-label="hide-text-button"
          onClick={handleHideTextButtonClick}
        >
          Hide/Show Text
        </RectButton>
      </ButtonContainer>
      <Input
        type="text"
        aria-label="address-field"
        id="address-field"
        name="address-field"
        value={
          addressListIsInitialised(addressList) ? addressList[currentAddressIndex].address : ''
        }
        readOnly
      />
      <TextArea
        style={{ display: 'block' }}
        aria-label="location-story"
        id="location-story"
        ref={locationStoryRef}
        value={
          addressListIsInitialised(addressList) ? addressList[currentAddressIndex].locationStory : ''
        }
        readOnly
      />
    </AddressListBrowserContainer>
  );
};

export default AddressListBrowser;
