import React from 'react';
import styled from 'styled-components/native';

export default function GenericButton(props) {
  return (
    <Container
      onPress={props.onPress}
      margin={props.margin}
      width={props.width}
      bgcolor={props.bgcolor}>
      <Title color={props.color}>{props.title}</Title>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 12px;
  width: ${(props) => props.width || 180}px;
  margin: ${(props) => props.margin || 10}px;
  background-color: ${(props) => props.bgcolor || '#333333'};
  elevation: 5;
`;

const Title = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Medium';
  color: ${(props) => props.color || '#f2994a'};
`;
