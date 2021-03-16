import React from 'react';
import ImageContainer from '../layouts/imageContainer';
import styled from 'styled-components/native';

export default function Input(props) {
  return (
    <Container
      margin={props.margin}
      hidden={props.hidden}
      bgcolor={props.bgcolor}
      borderColor={props.borderColor}>
      <FormInput
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        secureTextEntry={props.secure}
        autoCompleteType={props.autoCompleteType}
        keyboardType={props.keyboardType}
        blurOnSubmit={true}
        clearTextOnFocus={true}
        editable={props.editable}
        width={props.width}
        maxLength={props.maxLength}
        onChangeText={props.onChangeText}
        font={props.font}
      />
      {props.image ? (
        <ImageContainer source={props.image} size={20} margin={10} />
      ) : null}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bgcolor || 'transparent'};
  border-radius: 4px;
  width: ${(props) => props.width || 320}px;
  margin: ${(props) => props.margin || 10}px;
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  border: 1px solid ${(props) => props.borderColor || '#ffd54f'};
`;

const FormInput = styled.TextInput`
  background-color: ${(props) => props.bgcolor || 'transparent'};
  font-size: ${(props) => props.font || 18}px;
  color: #ffd54f;
  text-align: left;
  padding: 12px;
  width: 280px;
`;
