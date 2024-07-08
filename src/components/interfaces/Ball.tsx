import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
export const Ball = () => {
  var place = {x: -105, y: -205};
  const pan = useRef(new Animated.ValueXY(place)).current;
  pan.addListener(value => {
    place = value;
  });
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({x: place.x, y: place.y});
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        pan.flattenOffset();
        Animated.decay(pan, {
          velocity: {x: g.vx, y: g.vy},
          deceleration: 0.99,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;
  return (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        transform: pan.getTranslateTransform(),
        zIndex: 2000,
        position: 'absolute',
      }}
      {...panResponder.panHandlers}>
      <View style={styles.container}>
        <View style={styles.semicircle1} />
        <View style={styles.semicircle2} />
        <View style={styles.whiteLine1} />
        <View style={styles.whiteLine2} />
        <View style={styles.whiteLine3} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 70,
    width: 70,
    borderRadius: 70,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CACACA',
    borderWidth: 5,
    borderColor: 'grey',
  },
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF914D',
    borderWidth: 1,
    borderColor: '#FFF5D6',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-45deg'}],
    position: 'absolute',
    zIndex: 1000,
  },
  semicircle1: {
    width: 10,
    height: 22,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#FFF5D6',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF5D6',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderLeftColor: '#FFF5D6',
    borderLeftWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    transform: [{rotate: '90deg'}],
  },
  semicircle2: {
    width: 10,
    height: 22,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#FFF5D6',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF5D6',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderLeftColor: '#FFF5D6',
    borderLeftWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    transform: [{rotate: '-90deg'}],
  },
  whiteLine1: {
    width: 1,
    height: 40,
    borderRadius: 1,
    backgroundColor: '#FFF5D6',
    position: 'absolute',
  },
  whiteLine2: {
    width: 1,
    height: 40,
    borderRadius: 1,
    backgroundColor: '#FFF5D6',
    position: 'absolute',
    transform: [{rotate: '90deg'}],
  },
  whiteLine3: {
    width: 1,
    height: 40,
    borderRadius: 2,
    backgroundColor: '#FFF5D6',
    position: 'absolute',
  },
});
