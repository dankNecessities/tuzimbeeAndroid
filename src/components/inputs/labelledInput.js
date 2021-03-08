import React, {useEffect, useRef} from 'react';
import ImageContainer from '../layouts/imageContainer';
import styled from 'styled-components/native';

export default function LabelledInput(props) {
  const inputRef = useRef();

  useEffect(() => {
    console.log(inputRef.current);
    inputRef.current.focus();
  }, [props.editable]);

  return (
    <Container borderColor={props.borderColor}>
      <Label>{props.label}</Label>
      <InputContainer width={props.width}>
        <FormInput
          ref={inputRef}
          selection={{start: 1, end: 1}}
          margin={props.margin}
          hidden={props.hidden}
          bgcolor={props.bgcolor}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          autoCompleteType={props.autoCompleteType}
          keyboardType={props.keyboardType}
          blurOnSubmit={true}
          clearTextOnFocus={true}
          editable={props.editable}
          maxLength={props.maxLength}
          onChangeText={props.onChangeText}
          width={props.width ? props.width - 50 : 270}
        />
        <Button onPress={props.onPress}>
          <ImageContainer source={props.source} size={20} margin={10} />
        </Button>
      </InputContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.borderColor || '#9e9e9e'};
  margin: 5px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #9e9e9e;
  font-family: 'Roboto-Bold';
`;

const FormInput = styled.TextInput`
  background-color: ${(props) => props.bgcolor || 'transparent'};
  font-size: ${(props) => props.font || 18}px;
  color: #212121;
  text-align: left;
  padding: 0px;
  width: ${(props) => props.width}px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => props.width || 320}px;
`;

const Button = styled.TouchableOpacity``;
