import styled from 'styled-components';

const GenericHeading = styled.Text`
  font-size: 30px;
  color: #000000;
  font-family: 'Roboto-Light';
  margin: 10px;
  width: 100%;
  text-align: ${(props) => props.align || 'left'};
`;

export default GenericHeading;
