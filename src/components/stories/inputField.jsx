import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    margin-top: 1vh;
    margin-bottom: 4vh;
    padding: 8px;
    background-color: rgb(230, 230, 230);
    border-radius: 5px;
    border: 1px solid grey;
    width: 90%;
`;

const InputField = (props) => (
  <Input
    type={props.type}
    id={props.id}
    name={props.name}
    placeholder={props.placeholder}
  />
);

export default InputField;
