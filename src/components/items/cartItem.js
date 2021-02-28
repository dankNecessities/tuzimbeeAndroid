import React, {useState} from 'react';
import styled from 'styled-components';
import IconButton from '../buttons/iconButton';
import ImageContainer from '../layouts/imageContainer';

// TODO Add like button for pushing to favorites stack -> appears on favs screen
export default function CartItem(props) {
  const [total, setTotal] = useState(props.sum);

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

  const updateParent = () => {
    props.update(total);
  };

  return (
    <Container>
      <Image source={props.source} resizeMode="contain" />
      <ColumnContainer>
        <Title>{props.title}</Title>
        <Text>{props.manufacturer}</Text>
        <Text size={16}>
          Ushs {props.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
        <RowContainer>
          <IconButton onPress={onDecrease} underlayColor="#eeeeee">
            <ImageContainer
              source={require('../../assets/minus.png')}
              resizeMode="contain"
              margin={5}
            />
          </IconButton>
          <Title size={18}>{total}</Title>
          <IconButton onPress={onIncrease} underlayColor="#eeeeee">
            <ImageContainer
              source={require('../../assets/plus.png')}
              resizeMode="contain"
              margin={5}
            />
          </IconButton>
        </RowContainer>
      </ColumnContainer>
      <IconButton onPress={props.remove} underlayColor="#eeeeee">
        <ImageContainer
          source={require('../../assets/close.png')}
          resizeMode="contain"
          margin={5}
        />
      </IconButton>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #ffffff;
  elevation: 5;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
`;

const ColumnContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 5px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100px;
`;

const Title = styled.Text`
  font-size: ${(props) => props.size || 18}px;
  font-family: 'Roboto-Medium';
  color: ${(props) => props.color || '#000000'};
  margin: 3px;
`;

const Text = styled.Text`
  font-size: ${(props) => props.size || 14}px;
  font-family: 'Roboto-Light';
  color: ${(props) => props.color || '#000000'};
  margin: 3px;
  width: 140px;
`;

const Image = styled.Image`
  width: 150px;
  height: 100px;
`;
