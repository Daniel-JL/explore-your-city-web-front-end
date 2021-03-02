import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Map from '../stories/map';
import AddressList from '../stories/address-list';

const PageContainer = styled.div`

`;

const AddressListAndMapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  padding-top: 2%;
  padding-right: 5%;
  padding-left: 5%;
`;

const AddressListContainer = styled.div`
  width: 29vw;
  height: 60vh;
`;

const MapContainer = styled.div`
    height: 43vh;
    width: 64.5vh;
    border: 1px solid black;
    margin-left: 2.5vw;
`;

const Contribution = ({setModuleCallback}) => {
  const [coordsList, setCoordsList] = useState([]);
  const [coordsListReady, setCoordsListReady] = useState(false);
  const [geocoderRef, setGeocoderRef] = useState();
  const [indexToSplice, setIndexToSplice] = useState();
  const [addressListCurrentIndex, setAddressListCurrentIndex] = useState(0);

  const handleNewAddress = (coords) => {
    setCoordsList((coordsList) => [...coordsList, coords]);
  };

  const handleDeleteAddress = (addrElementNum) => {
    let coordsListCopy = coordsList;
    coordsListCopy.splice(addrElementNum, 1);
    setCoordsList((coordsList) => coordsListCopy);
    setCoordsListReady(true);
    setIndexToSplice(addrElementNum);
  };

  const clearCoordsListReady = () => {
    setCoordsListReady(false);
  };

  const passUpRef = (geocoderNewRef) => {
    setGeocoderRef((geocoderRef) => geocoderNewRef);
  };

  const handleLeftRightButtonClick = (index) => {
    setAddressListCurrentIndex((addressListCurrentIndex) => index);
  };

  return (
    <PageContainer>
      <AddressListAndMapContainer>
        <AddressListContainer id="addressListContainer">
          <AddressList
            handleNewAddress={handleNewAddress}
            handleDeleteAddress={handleDeleteAddress}
            passUpRef={passUpRef}
            handleLeftRightButtonClick={handleLeftRightButtonClick}
          />
        </AddressListContainer>

        <MapContainer id="map-container" aria-label="map-container">
          <Map
            id="map"
            mapPointList={coordsList}
            coordsListReady={coordsListReady}
            clearCoordsListReady={clearCoordsListReady}
            geocoderRef={geocoderRef}
            indexToSplice={indexToSplice}
            addressListCurrentIndex={addressListCurrentIndex}
            setModuleCallback={setModuleCallback}
          />
        </MapContainer>
      </AddressListAndMapContainer>
    </PageContainer>
  );
};

export default Contribution;
