import styled from 'styled-components';

const IconButton = styled.TouchableHighlight.attrs((props) => {
  onPress: props.onPress;
})`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 2px;
`;

export default IconButton;
