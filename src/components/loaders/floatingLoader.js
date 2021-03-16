import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import styled from 'styled-components';

export default function FloatingLoader() {
  const window = useWindowDimensions();
  const size = 50;
  const depth = 50;

  return (
    <Container left={(window.width - size) / 2 - 10} size={size} depth={depth}>
      <Loader size="large" color="#f2994a" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-color: #ffffff;
  left: ${(props) => props.left}px;
  bottom: ${(props) => props.depth}px;
  elevation: 5;
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const Loader = styled.ActivityIndicator``;
