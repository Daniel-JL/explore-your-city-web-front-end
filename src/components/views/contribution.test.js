import React, { useState, useEffect, useRef } from 'react';
import {
  render, screen, waitFor, unmountComponentAtNode, act,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
// import { act } from 'react-dom/test-utils';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

import userEvent from '@testing-library/user-event';
import {
  Router,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import fetch from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect';
// import Enzyme, { shallow, mount, render } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import Map from '../stories/map';
// import { removeMapMarkerFromList } from '../stories/map';
import Contribution from './contribution';
import mapboxgl from 'mapbox-gl';
// Enzyme.configure({ adapter: new Adapter() });

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: () => {},
  Marker: () => ({
    addTo: () => {},
    setLngLat: () => {},
    remove: () => {},
  }),
  Map: () => ({
    addControl: () => {},
    on: () => {},
    remove: () => {},
    getZoom: () => {},
  }),
  NavigationControl: () => {},
}));

const mockCallback = jest.fn();

beforeEach(() => {
  mockCallback.mockClear();
  fetch.resetMocks();
});

describe('Contribution page', () => {
  it('should render without throwing an error', () => {
    const ContributionComponent = render(
      <Contribution />
      ,
    );
    expect(ContributionComponent).toMatchSnapshot();
  });

  it('should update story box when new item is added', async () => {
    const { getByRole, rerender } = render(
      <Contribution setModuleCallback={mockCallback} />
      ,
    );

    const addLocationButton = screen.getByRole('button', { name: /add-location-button/i });
    const addressBox = screen.getByRole('textbox', { name: /address-field/i });
    const storyBox = screen.getByRole('textbox', { name: /location-story/i });
    const addressSearchBox = screen.getByRole('textbox', { name: /Search/i });
    const addressListTextArea = screen.getByRole('textbox', { name: /address-list-text-area/i });

    userEvent.type(addressSearchBox, 'Choriner Höfe, Berlin');
    userEvent.type(addressListTextArea, 'A cool story');
    userEvent.click(addLocationButton);

    await waitFor(() => {
      expect(addressBox.value).toBe('Choriner Höfe, Berlin');
      expect(storyBox.value).toBe('A cool story');
    });

    userEvent.clear(addressSearchBox);
    userEvent.type(addressSearchBox, 'Choriner Straße, Berlin');
    userEvent.type(addressListTextArea, 'Another cool story');
    userEvent.click(addLocationButton);

    await waitFor(() => {
      expect(addressBox.value).toBe('Choriner Straße, Berlin');
      expect(storyBox.value).toBe('Another cool story');
    });
    expect(mockCallback).toHaveBeenCalledTimes(2);
    // expect(mapboxgl.Marker.addTo).toHaveBeenCalledTimes(2);
  });

  it('should delete BrowserListItem item when delete button is clicked', async () => {
    const { getByRole, rerender } = render(
      <Contribution setModuleCallback={mockCallback} />
      ,
    );

    const addLocationButton = screen.getByRole('button', { name: /add-location-button/i });
    const trashButton = screen.getByRole('button', { name: /trash-button/i });
    const addressBox = screen.getByRole('textbox', { name: /address-field/i });
    const storyBox = screen.getByRole('textbox', { name: /location-story/i });
    const addressSearchBox = screen.getByRole('textbox', { name: /Search/i });
    const addressListTextArea = screen.getByRole('textbox', { name: /address-list-text-area/i });

    userEvent.type(addressSearchBox, 'Choriner Höfe, Berlin');
    userEvent.type(addressListTextArea, 'A cool story');
    userEvent.click(addLocationButton);

    await waitFor(() => {
      expect(addressBox.value).toBe('Choriner Höfe, Berlin');
      expect(storyBox.value).toBe('A cool story');
    });

    userEvent.clear(addressSearchBox);
    userEvent.type(addressSearchBox, 'Choriner Straße, Berlin');
    userEvent.type(addressListTextArea, 'Another cool story');
    userEvent.click(addLocationButton);

    await waitFor(() => {
      expect(addressBox.value).toBe('Choriner Straße, Berlin');
      expect(storyBox.value).toBe('Another cool story');
    });

    userEvent.click(trashButton);

    await waitFor(() => {
      expect(addressBox.value).toBe('Choriner Höfe, Berlin');
      expect(storyBox.value).toBe('A cool story');
    });

    userEvent.click(trashButton);

    await waitFor(() => {
      expect(addressBox.value).toBe('');
      expect(storyBox.value).toBe('');
    });

    expect(mockCallback).toHaveBeenCalledTimes(4);
  });

  // it('should update map when new item is added', async () => {
  //   const { getByRole, rerender } = render(
  //     <Contribution />
  //     ,
  //   );

  //   const addLocationButton = screen.getByRole('button', { name: /add-location-button/i });
  //   const addressSearchBox = screen.getByRole('textbox', { name: /Search/i });
  //   const addressListTextArea = screen.getByRole('textbox', { name: /address-list-text-area/i });

  //   userEvent.type(addressSearchBox, 'Choriner Höfe, Berlin');
  //   userEvent.type(addressListTextArea, 'A cool story');
  //   userEvent.click(addLocationButton);

  //   const markers = screen.findAllByLabelText('Map marker');

  //   await waitFor(() => {
  //     expect(markers).toHaveLength(1);
  //   });
  //   // userEvent.clear(addressSearchBox);
  //   // userEvent.type(addressSearchBox, 'Choriner Straße, Berlin');
  //   // userEvent.type(addressListTextArea, 'Another cool story');
  //   // userEvent.click(addLocationButton);

  //   // await waitFor(() => {
  //   //   expect(addressBox.value).toBe('Choriner Straße, Berlin');
  //   //   expect(storyBox.value).toBe('Another cool story');
  //   // });
  // });
});
