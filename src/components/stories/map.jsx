import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import 'regenerator-runtime/runtime.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import isBeingTested from '../../helpers/isBeingTested';
import noHighlightedMarkerExists from '../../helpers/noHighlightedMarkerExists';
import listIsEmpty from '../../helpers/listIsEmpty';
import itemAddedToMapPointList from '../../helpers/itemAddedToMapPointList';
import itemRemovedFromMapPointList from '../../helpers/itemRemovedFromMapPointList';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuamwiLCJhIjoiY2toMzkxZXBwMDhpdDJzb2V4Mnh6ZXhzdiJ9.YNxQn_XBag2z8ZZUXTKAmQ';

const MapAndDivContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Map = ({
  mapPointList,
  coordsListReady,
  clearCoordsListReady,
  geocoderRef,
  indexToSplice,
  addressListCurrentIndex,
  setModuleCallback,
}) => {
  const mapContainerRef = useRef('mapContainer');
  const mapPointListRef = useRef(mapPointList);
  const mapMarkerList = useRef([]);
  const highlightedMarker = useRef('');
  const [geocoderNodeLoaded, setGeocoderNodeLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const highlightedColour = '#A20000';
  const notHighlightedColour = '#F0BBBB';

  const addMapMarker = () => {
    const marker = new mapboxgl.Marker({
      color: notHighlightedColour,
    });
    marker.setLngLat(
      [
        mapPointListRef.current[mapPointListRef.current.length - 1].longitude,
        mapPointListRef.current[mapPointListRef.current.length - 1].latitude,
      ],
    );
    marker.addTo(map);

    mapMarkerList.current.push(
      marker,
    );
    setHighlightedMarker(mapPointListRef.current.length);

    if (isBeingTested(setModuleCallback)) {
      setModuleCallback();
    }
  };

  const removeMapMarker = () => {
    mapMarkerList.current[indexToSplice].remove();
    mapMarkerList.current.splice(indexToSplice, 1);
    setHighlightedMarker(mapPointListRef.current.length);
    if (isBeingTested(setModuleCallback)) {
      setModuleCallback();
    }
  };

  const setHighlightedMarker = (index) => {
    if (noHighlightedMarkerExists(highlightedMarker.current)) {
      removeHighlightedMarker();
    }

    if (!listIsEmpty(index)) {
      highlightedMarker.current = new mapboxgl.Marker({
        color: highlightedColour,
      });
      highlightedMarker.current.setLngLat(
        [
          mapPointListRef.current[index - 1].longitude,
          mapPointListRef.current[index - 1].latitude,
        ],
      );
      highlightedMarker.current.addTo(map);
    }
  };

  const removeHighlightedMarker = () => {
    highlightedMarker.current.remove();
  };

  const handleAddressListChange = () => {
    // Adds or removes map markers when AdressList is updated
    mapPointListRef.current = mapPointList;
    const newMapPointListLength = mapPointListRef.current.length;
    const oldMapPointListLength = mapMarkerList.current.length;
    if (map) {
      if (itemAddedToMapPointList(newMapPointListLength, oldMapPointListLength)) {
        addMapMarker();
      } else if (itemRemovedFromMapPointList(newMapPointListLength, oldMapPointListLength)) {
        removeMapMarker();
      }
      clearCoordsListReady();
    }
  };

  const handleLeftRightButtonPress = () => {
    // Updates highlightedMarker on left/right button press
    if (!listIsEmpty(mapMarkerList.current.length)) {
      setHighlightedMarker(addressListCurrentIndex);
    }
  };

  const handleGeocoderNodeLoaded = () => {
    // Waits for geocoder node ref to be received before loading map
    if (geocoderRef !== undefined) {
      setGeocoderNodeLoaded((geocoderNodeLoaded) => true);
    }
  };

  useEffect(() => {
    handleAddressListChange();
  }, [mapPointList, coordsListReady]);

  useEffect(() => {
    handleLeftRightButtonPress();
  }, [addressListCurrentIndex]);

  useEffect(() => {
    handleGeocoderNodeLoaded();
  }, [geocoderRef]);

  useEffect(() => {
  // initialize map
    if (geocoderNodeLoaded !== false) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        // See style options here: https://docs.mapbox.com/api/maps/#styles
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [13.4559315, 52.5263309],
        zoom: 12.5,
        logoPosition: 'bottom-left',
        maxBounds: [
          [13.0883590415111, 52.3382670008426],
          [13.761131997363, 52.6755029827484],
        ],
      });

      map.on('load', () => {
        map.resize();
      });

      // add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

      // add geocoder control
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
        bbox: [13.0883590415111, 52.3382670008426, 13.761131997363, 52.6755029827484],
      });

      const geoContainerNode = geocoderRef.current;
      geoContainerNode.appendChild(geocoder.onAdd(map));

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
      );

      setMap(map);
      // clean up on unmount
      return () => map.remove();
    }
  }, [geocoderNodeLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MapAndDivContainer>
      <MapContainer ref={mapContainerRef} />
    </MapAndDivContainer>
  );
};

export default Map;
