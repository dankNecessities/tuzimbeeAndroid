import React from 'react';
import styled from 'styled-components';

export default function MenuButton(props) {
  return (
    <Container>
      <Image resizeMode="contain" source={props.source} />
      <Text>{props.text}</Text>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f2994a;
  border-radius: 25px;
  padding: 5px 8px 5px 8px;
  margin: 3px;
`;

const Text = styled.Text`
  font-size: 18px;
  font-family: 'Roboto';
  color: ${(props) => props.color || '#000000'};
  margin: 3px;
`;

const Image = styled.Image`
  height: 20px;
  width: 20px;
`;

//  ffd54f
