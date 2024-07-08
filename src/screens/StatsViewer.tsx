import React from 'react';
import {Container} from '../components/Views/Container';
import {Block} from '../components/Text/Block';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const StatsViewer = ({navigation, route}: Props) => {
  console.log(route.params);
  return (
    <Container>
      <Block text="hola" />
    </Container>
  );
};
