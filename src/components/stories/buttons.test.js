import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import {
  Router,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { 
  RectButton,
  RoundButton,
  TrashButton,
  RectSubmitButton,
  RoundBackButton,
  RoundAddLocationButton,
  RoundHelpButton,
  TellYourStoryButton,
} from './buttons';

describe('Buttons', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<TellYourStoryButton />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should do something', () => {

  });
});
