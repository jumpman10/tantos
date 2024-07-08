import React, {useEffect, useRef} from 'react';
import {Animated, ColorValue, PanResponder, StyleSheet} from 'react-native';
import {Block} from '../Text/Block';
interface Props {
  pos: string;
  place?: any;
  color?: ColorValue | undefined;
  bg?: ColorValue | undefined;
  zIndex?: number;
  tx?: any;
  ty?: any;
  activated?: boolean;
}
export const Players = ({
  pos,
  place,
  color,
  bg,
  zIndex,
  tx,
  ty,
  activated,
}: Props) => {
  useEffect(() => {
    pan.setValue(place);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);
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
      onPanResponderMove: (e, gestureState) => {
        // Update the pan position
        Animated.event([null, {dx: pan.x, dy: pan.y}], {
          useNativeDriver: false,
        })(e, gestureState);
      },
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
    <>
      <Animated.View
        style={[
          styles.box,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            transform: activated
              ? pan.getTranslateTransform()
              : [{translateX: tx}, {translateY: ty}],
            backgroundColor: bg ? bg : '#CACACA',
            zIndex: zIndex ? zIndex : styles.box.zIndex,
          },
        ]}
        {...panResponder.panHandlers}>
        <Block text={pos} size={25} color={color ? color : 'black'} />
      </Animated.View>
      {/* <View style={styles.reset}>
        <Button title="reset" onPress={() => pan.setValue({x: 0, y: 0})} />
      </View> */}
    </>
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
    zIndex: 1000,
    backgroundColor: '#CACACA',
    borderWidth: 5,
    borderColor: 'grey',
  },
});
