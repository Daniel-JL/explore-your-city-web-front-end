import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import {
  Router,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Map from './map';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));

describe('Address list', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<Map />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should do something', () => {

  });
});
