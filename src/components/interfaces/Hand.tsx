import React, {useEffect, useRef} from 'react';
import {Container} from '../Views/Container';
import {Animated} from 'react-native';

export const Hand = () => {
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceValue, {
          toValue: 1,
          friction: 25, // Change this value to adjust the bounciness of the animation
          useNativeDriver: true,
        }),
        Animated.spring(bounceValue, {
          toValue: 0,
          friction: 20, // Change this value to adjust the bounciness of the animation
          delay: 2,
          useNativeDriver: true,
        }),
      ]),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bounceInterpolation = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -10],
  });
  return (
    <Animated.View
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        },
        {
          transform: [{translateY: bounceInterpolation}],
        },
      ]}>
      <Container
        width={70}
        height={18}
        bg="#FFF5D6"
        br={10}
        bc="#A59D86"
        bw={2}
        brw={0}
        position="absolute"
        top={33}
        zIndex={100}
        transform={[{rotate: '-4deg'}]}>
        <Container
          width={20}
          height={7}
          bg="#FFF5D6"
          position="absolute"
          bc="#A59D86"
          bw={2}
          btw={0}
          br={6}
        />
      </Container>
      <Container
        width={110}
        height={23}
        bg="#FFF5D6"
        br={10}
        bc="#A59D86"
        bw={2}
        position="absolute"
        top={33}
        right={80}
        zIndex={50}
        transform={[{rotate: '8deg'}]}
      />
      <Container
        width={100}
        height={19}
        bg="#FFF5D6"
        br={10}
        bc="#A59D86"
        bw={2}
        position="absolute"
        top={33}
        left={138}
        zIndex={50}
        transform={[{rotate: '-6deg'}]}>
        <Container
          width={20}
          height={7}
          bg="#FFF5D6"
          position="absolute"
          bc="#A59D86"
          bw={2}
          btw={0}
          br={6}
        />
      </Container>
      <Container
        width={120}
        height={19}
        bg="#FFF5D6"
        br={10}
        bc="#A59D86"
        bw={2}
        position="absolute"
        top={33}
        left={118}
        zIndex={25}
        transform={[{rotate: '-7deg'}]}>
        <Container
          width={20}
          height={7}
          bg="#FFF5D6"
          position="absolute"
          bc="#A59D86"
          bw={2}
          btw={0}
          br={6}
        />
      </Container>
    </Animated.View>
  );
};
