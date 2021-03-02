import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Register from './register';

describe('Register page', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
