import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import {
  Router,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AddressList from './address-list';

describe('Address list', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<AddressList />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should do something', () => {

  });
});
