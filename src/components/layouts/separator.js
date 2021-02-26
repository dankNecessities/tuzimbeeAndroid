import React from 'react';
import styled from 'styled-components';

export default function Separator(props) {
  return <Container />;
}

const Container = styled.View`
  flex-direction: row;
  height: 1px;
  background-color: #e0e0e0;
  width: 100%;
`;
