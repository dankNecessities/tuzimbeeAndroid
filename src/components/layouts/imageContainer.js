import styled from 'styled-components';

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 20}px;
  width: ${(props) => props.size || 20}px;
  margin: ${(props) => props.margin || 15}px;
`;

export default ImageContainer;
