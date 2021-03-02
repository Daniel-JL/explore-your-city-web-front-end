import React from 'react';
import renderer from 'react-test-renderer';
import {
  MemoryRouter,
} from 'react-router-dom';
import Vision from './vision';

describe('Contribution page', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(
      <MemoryRouter>
        <Vision />
      </MemoryRouter>,
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
