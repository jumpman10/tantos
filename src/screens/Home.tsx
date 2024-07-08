import React, {useEffect, useRef} from 'react';
import {Animated, Image, StatusBar, StyleSheet, View} from 'react-native';
import {Container} from '../components/Views/Container';
import {StackScreenProps} from '@react-navigation/stack';
import {Hand} from '../components/interfaces/Hand';
import {BHome} from '../components/Buttons/BHome';

interface Props extends StackScreenProps<any, any> {}

export const Home = ({navigation}: Props) => {
  const bounceValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceValue, {
          toValue: 1,
          friction: 25,
          useNativeDriver: true,
        }),
        Animated.spring(bounceValue, {
          toValue: 0,
          friction: 20,
          delay: 2,
          useNativeDriver: true,
        }),
      ]),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bounceInterpolation = bounceValue.interpolate({
    inputRange: [0.2, 0.6],
    outputRange: [10, -10],
  });
  return (
    <Container width={'100%'} height={'100%'} ai="center">
      <StatusBar backgroundColor={'#FFF5D6'} />
      <Hand />
      <Container mt={50} ai="center" jf="center">
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {translateY: bounceInterpolation},
                {rotate: '-45deg'},
              ],
            },
          ]}>
          <View style={styles.semicircle1} />
          <View style={styles.semicircle2} />
          <View style={styles.whiteLine1} />
          <View style={styles.whiteLine2} />
          <View style={styles.whiteLine3} />
        </Animated.View>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 250, height: 100}}
          source={require('../assets/Tantos.png')}
          resizeMode="contain"
        />
      </Container>
      <BHome
        gotoBasketStats={() => navigation.navigate('Stats')}
        gotoFolder={() => null}
        gotoStatsRecluter={() => navigation.navigate('PlayerData')}
        gotoSettings={() => null}
        gotoTable={() => navigation.navigate('Table')}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FF914D',
    borderWidth: 3,
    borderColor: '#FFF5D6',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-45deg'}],
    marginBottom: 30,
  },
  semicircle1: {
    width: 217,
    height: 217,
    borderRadius: 108.5,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#FFF5D6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 140,
  },
  semicircle2: {
    width: 217,
    height: 217,
    borderRadius: 108.5,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#FFF5D6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 140,
  },
  whiteLine1: {
    width: 3,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#FFF5D6',
    position: 'absolute',
  },
  whiteLine2: {
    width: 3,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#FFF5D6',
    position: 'absolute',
    transform: [{rotate: '90deg'}],
  },
  whiteLine3: {
    width: 1,
    height: 200,
    borderRadius: 2,
    backgroundColor: '#FFF5D6',
    position: 'absolute',
  },
});
