import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event'
import {
  Router,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import AddressListBrowser from './address-list-browser';

const mockHandleLeftRightButtonClick = jest.fn();

describe('Address list browser', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<AddressListBrowser addressList={[]}/>).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should display items as they are added to address list', () => {
    const history = createMemoryHistory();
    const { getByRole, rerender } = render(
      <Router history={history}>
        <AddressListBrowser
          addressList={[
            {
              address: 'first-item',
              locationStory: 'first-story',
            },
          ]}
        />
      </Router>,
    );

    const addressBox = screen.getByRole('textbox', { name: /address-field/i });
    const storyBox = screen.getByRole('textbox', { name: /location-story/i });

    expect(addressBox.value).toBe('first-item');
    expect(storyBox.value).toBe('first-story');

    rerender(
      <AddressListBrowser
        addressList={[
          {
            address: 'first-item',
            locationStory: 'first-story',
          },
          {
            address: 'second-item',
            locationStory: 'second-story',
          },
        ]}
      />,
    );

    const addressBoxRerender = screen.getByRole('textbox', { name: /address-field/i });
    const storyBoxRerender = screen.getByRole('textbox', { name: /location-story/i });

    expect(addressBoxRerender.value).toBe('second-item');
    expect(storyBoxRerender.value).toBe('second-story');
  });

  it('should not change the display data if the max or min of the array is reached', () => {
    const history = createMemoryHistory();
    const { getByRole, rerender } = render(
      <Router history={history}>
        <AddressListBrowser
          addressList={[
            {
              address: '',
              locationStory: '',
            },
            {
              address: 'first-item',
              locationStory: 'first-story',
            },
            {
              address: 'second-item',
              locationStory: 'second-story',
            },
            {
              address: 'third-item',
              locationStory: 'third-story',
            },
          ]}
          handleLeftRightButtonClick={mockHandleLeftRightButtonClick}
        />
      </Router>,
    );

    const addressBox = screen.getByRole('textbox', { name: /address-field/i });
    const storyBox = screen.getByRole('textbox', { name: /location-story/i });
    const leftArrowButton = screen.getByRole('button', { name: /left-arrow/i });
    const rightArrowButton = screen.getByRole('button', { name: /right-arrow/i });

    expect(addressBox.value).toBe('third-item');
    expect(storyBox.value).toBe('third-story');

    userEvent.click(rightArrowButton);

    expect(addressBox.value).toBe('third-item');
    expect(storyBox.value).toBe('third-story');

    userEvent.click(leftArrowButton);

    expect(addressBox.value).toBe('second-item');
    expect(storyBox.value).toBe('second-story');

    userEvent.click(leftArrowButton);

    expect(addressBox.value).toBe('first-item');
    expect(storyBox.value).toBe('first-story');

    userEvent.click(leftArrowButton);

    expect(addressBox.value).toBe('first-item');
    expect(storyBox.value).toBe('first-story');

    userEvent.click(rightArrowButton);

    expect(addressBox.value).toBe('second-item');
    expect(storyBox.value).toBe('second-story');
  });

  // it('should remove an item from the address list when the delete button is pressed', () => {
  //   //  TODO
  //   //  This should be a part of integration tests as the address list value
  //   //  changes based on interactions with the contribution page
  //   const history = createMemoryHistory();
  //   const { getByRole, rerender } = render(
  //     <Router history={history}>
  //       <AddressListBrowser
  //         addressList={[
  //           {
  //             address: '',
  //             locationStory: '',
  //           },
  //           {
  //             address: 'first-item',
  //             locationStory: 'first-story',
  //           },
  //           {
  //             address: 'second-item',
  //             locationStory: 'second-story',
  //           },
  //         ]}
  //       />
  //     </Router>,
  //   );

  //   const addressBox = screen.getByRole('textbox', { name: /address-field/i });
  //   const storyBox = screen.getByRole('textbox', { name: /location-story/i });
  //   const trashButton = screen.getByRole('button', { name: /trash-button/i });

  //   expect(addressBox.value).toBe('second-item');
  //   expect(storyBox.value).toBe('second-story');

  //   // userEvent.click(trashButton);

  //   // console.log('before rerender');
  //   // rerender(
  //   //   <AddressListBrowser
  //   //     addressList={[
  //   //       {
  //   //         address: '',
  //   //         locationStory: '',
  //   //       },
  //   //       {
  //   //         address: 'first-item',
  //   //         locationStory: 'first-story',
  //   //       },
  //   //     ]}
  //   //   />,
  //   // );

  //   // expect(addressBox.value).toBe('first-item');
  //   // expect(storyBox.value).toBe('first-story');




  // });

  it('should hide the story description box when the hide/show button is pressed', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <AddressListBrowser
          addressList={[
            {
              address: '',
              locationStory: '',
            },
            {
              address: 'first-item',
              locationStory: 'first-story',
            },
          ]}
        />
      </Router>,
    );

    const addressBox = screen.getByRole('textbox', { name: /address-field/i });
    const storyBox = screen.getByRole('textbox', { name: /location-story/i });
    const hideTextButton = screen.getByRole('button', { name: /hide-text-button/i });

    expect(addressBox.value).toBe('first-item');
    expect(storyBox.value).toBe('first-story');
    expect(storyBox).toHaveStyle('display: block');

    userEvent.click(hideTextButton);

    expect(storyBox).toHaveStyle('display: none');
  });
});
