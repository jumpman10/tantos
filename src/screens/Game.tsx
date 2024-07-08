import React from 'react';
import {Container} from '../components/Views/Container';
import {Players} from '../components/interfaces/Players';

export const Game = () => {
  return (
    <Container
      width={'100%'}
      height={'100%'}
      ai="center"
      jf="center"
      bg="black">
      <Players pos="B" />
    </Container>
  );
};
