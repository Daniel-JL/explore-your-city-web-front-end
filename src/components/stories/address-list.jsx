import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import getAddressCoordinates from '../../helpers/getAddressCoordinates';
import addressListContainsAddress from '../../helpers/addressListContainsAddress';
import addressInputIsNotEmpty from '../../helpers/addressInputIsNotEmpty';
import isAddressValid from '../../helpers/isAddressValid';
import convertAddrToUrlForm from '../../helpers/convertAddrToUrlForm';
import getAddressListTextAreaText from '../../helpers/getAddressListTextAreaText';
import { RoundAddLocationButton } from './buttons';
import AddressListBrowser from './address-list-browser';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  border-radius: 25px;
  height: 53vh;
  padding: 20px;
  margin-top: 2vh;
  overflow-y: auto;
`;

const AddressStoryInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const GeocoderContainer = styled.div`
    display: flex;
    min-width: 90%;
`;

const TextArea = styled.textarea`
    display: block;
    margin-top: 1vh;
    margin-bottom: 4vh;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid grey;
    min-width: 90%;
    max-width: 90%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

const AddressListTextArea = styled(TextArea)`
  min-height: 10vh;
`;

const addressListIsEmpty = (index) => index === 0;

const AddressList = ({
  handleNewAddress,
  handleDeleteAddress,
  passUpRef,
  handleLeftRightButtonClick,
}) => {
  const [addressList, setAddressList] = useState([{ address: '', locationStory: '' }]);
  const geocoderContainerRef = useRef();
  const addressListTextAreaRef = useRef();

  const handleAddAddressButtonClick = async () => {
    const parent = geocoderContainerRef.current;
    const descendants = parent.getElementsByTagName('input');
    const addressInput = descendants[0];
    const urlAddr = convertAddrToUrlForm(addressInput.value);
    const coords = await getAddressCoordinates(urlAddr);

    if (addressInputIsNotEmpty(addressInput.value)
        && !addressListContainsAddress(addressList, addressInput.value)
        && isAddressValid(coords)
    ) {
      handleNewAddress(
        {
          longitude: coords[0],
          latitude: coords[1],
        },
      );
      const geocoderAddressValue = addressInput.value;
      setAddressList((addressList) => [...addressList, {
        address: geocoderAddressValue,
        locationStory: getAddressListTextAreaText(addressListTextAreaRef),
      }]);

      addressListTextAreaRef.current.value = '';
    }
  };

  const handleDeleteAddressListItem = (index) => {
    if (!addressListIsEmpty(index)) {
      const addressListCopy = addressList;
      addressListCopy.splice(index, 1);
      setAddressList(addressListCopy);
      handleDeleteAddress(index - 1);
    }
  };

  useEffect(() => {
    passUpRef(geocoderContainerRef);
  }, []);

  return (
    <ListContainer id="address-list-container">
      <AddressStoryInputContainer>
        <GeocoderContainer
          id="geocoder-container"
          ref={geocoderContainerRef}
        />
        <br />
        <AddressListTextArea
          id="address-list-text-area"
          aria-label="address-list-text-area"
          ref={addressListTextAreaRef}
          placeholder="Enter location story here"
        />
        <RoundAddLocationButton
          id="add-location-button"
          aria-label="add-location-button"
          onClick={() => handleAddAddressButtonClick()}
        >
          +
        </RoundAddLocationButton>
      </AddressStoryInputContainer>
      <AddressListBrowser
        addressList={addressList}
        handleDeleteAddressListItem={handleDeleteAddressListItem}
        handleLeftRightButtonClick={handleLeftRightButtonClick}
      />
    </ListContainer>
  );
};

export default AddressList;
