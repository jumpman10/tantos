import React from 'react';
import {Container} from '../components/Views/Container';
import {Block} from '../components/Text/Block';
import {BOne} from '../components/Buttons/BOne';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, TouchableOpacity} from 'react-native';
interface Props extends StackScreenProps<any, any> {}

export const Sport = ({navigation}: Props) => {
  return (
    <Container width={'100%'} height={'100%'} ai="center" jf="center">
      <Container position="absolute" top={5} left={20}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Block text="<-" size={35} color={'black'} />
        </TouchableOpacity>
      </Container>
      <Container width={'100%'} height={'70%'} ai="center" jf="space-around">
        <Block text="Selecciona el deporte" />
        <TouchableOpacity>
          <Container>
            <Container></Container>
            <Block text='Basquet'/>
          </Container>
        </TouchableOpacity>
        <Container>
          <Icon name="basketball-outline" size={40} color="#A59D86" />
          <BOne text="Basquet" press={() => navigation.navigate('Table')} />
        </Container>
      </Container>
    </Container>
  );
};
