import React, { useState } from 'react';
import styled from 'styled-components';
import {
  NavLink,
} from 'react-router-dom';
import InputField from '../stories/inputField';
import { RectSubmitButton } from '../stories/buttons';

const PageContainer = styled.div`
  // margin-top: 17vh;
  margin-bottom: 12vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputFieldDoubleColumn = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5vh;
  padding-bottom: 5vh;
`;

const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20vw;
  height: 20vh;
  padding: 5vw;
  
`;

const InputFieldContainerLeft = styled(InputFieldContainer)`
  border-right: 1px solid gray;

`;

const Title = styled.h1`
    text-align: center;
    padding-top: 7vh;
    // padding-bottom: 5vh;
`;

const Register = () => (
  <PageContainer>
    <Title>Register</Title>
    <InputFieldDoubleColumn>
      <InputFieldContainerLeft>
        <InputField type="first_name" id="first_name" name="first_name" placeholder="First Name" />
        <InputField type="last_name" id="last_name" name="last_name" placeholder="Last Name" />
      </InputFieldContainerLeft>
      <InputFieldContainer>
        <InputField type="e-mail" id="e-mail" name="e-mail" placeholder="Enter E-Mail" />
        <InputField type="password" id="password" name="password" placeholder="Enter Password" />
        <InputField type="confirm_password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" />
      </InputFieldContainer>
    </InputFieldDoubleColumn>
    <NavLink to="/contribute">
      <RectSubmitButton>Submit</RectSubmitButton>
    </NavLink>
  </PageContainer>
);

export default Register;
