import React, {useState} from 'react';
import ImageContainer from '../layouts/imageContainer';
import styled from 'styled-components/native';

export default function ItemButton(props) {
  const [total, setTotal] = useState(1);

  const onIncrease = () => {
    setTotal(total + 1);
    props.update(total + 1);
  };

  const onDecrease = () => {
    if (total > 1) {
      setTotal(total - 1);
      props.update(total - 1);
    }
  };
  return (
    <Container onPress={props.onPress}>
      <ImageButton onPress={onDecrease}>
        <ImageContainer
          source={require('../../assets/minus.png')}
          resizeMode="contain"
          size={24}
          margin={1}
        />
      </ImageButton>
      <Title>
        {total}&nbsp;
        {props.text}
      </Title>
      <ImageButton onPress={onIncrease}>
        <ImageContainer
          source={require('../../assets/plus.png')}
          resizeMode="contain"
          size={24}
          margin={1}
        />
      </ImageButton>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  width: 180px;
  margin: 5px;
  background-color: transparent;
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: 'Roboto-Medium';
  color: #000000;
  margin: 10px;
`;

const ImageButton = styled.TouchableOpacity`
  padding: 10px;
`;
