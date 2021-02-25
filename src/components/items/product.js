import React from 'react';
import styled from 'styled-components';

export default function Product(props) {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Image source={props.source} resizeMode="contain" />
      <Text>Ushs {props.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  elevation: 5;
  border-radius: 5px;
  padding: 0px;
  width: 150px;
  margin: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Medium';
  color: ${(props) => props.color || '#000000'};
  margin: 3px;
`;

const Text = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Light';
  color: ${(props) => props.color || '#000000'};
  margin: 3px;
`;

const Image = styled.Image`
  width: 150px;
  height: 100px;
`;
