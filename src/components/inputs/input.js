import React from 'react';
import styled from 'styled-components/native';

export default function Input(props) {
  return (
    <FormInput
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      secureTextEntry={props.hidden}
      autoCompleteType={props.autoCompleteType}
      keyboardType={props.keyboardType}
      blurOnSubmit={true}
      clearTextOnFocus={true}
      editable={props.editable}
      width={props.width}
      margin={props.margin}
      maxLength={props.maxLength}
      onChangeText={props.onChangeText}
      font={props.font}
      bgcolor={props.bgcolor}
    />
  );
}

const FormInput = styled.TextInput`
  background-color: ${(props) => props.bgcolor || 'transparent'};
  font-size: ${(props) => props.font || 18}px;
  color: #333333;
  border-radius: 4px;
  width: ${(props) => props.width || 260}px;
  text-align: left;
  padding: 12px;
  margin: ${(props) => props.margin || 10}px;
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  border: 1px solid #333333;
`;
