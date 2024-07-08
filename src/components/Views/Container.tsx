import React from 'react';
import {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  FlexAlignType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
interface Props {
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  children?: any;
  bg?: string;
  primary?: boolean;
  secondary?: boolean;
  mh?: number;
  mv?: number;
  mt?: number;
  mb?: number;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  jf?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  ai?: FlexAlignType | undefined;
  ac?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | undefined;
  position?: 'absolute' | 'relative' | undefined;
  top?: DimensionValue | undefined;
  bottom?: DimensionValue | undefined;
  right?: DimensionValue | undefined;
  left?: DimensionValue | undefined;
  flex?: number;
  br?: number;
  bw?: number;
  bbw?: number;
  bbc?: ColorValue | undefined;
  btw?: number;
  btc?: ColorValue | undefined;
  brw?: number;
  brc?: ColorValue | undefined;
  blw?: number;
  blc?: ColorValue | undefined;
  bblr?: AnimatableNumericValue | undefined;
  btlr?: AnimatableNumericValue | undefined;
  btrr?: AnimatableNumericValue | undefined;
  bbrr?: AnimatableNumericValue | undefined;
  bc?: ColorValue | undefined;
  zIndex?: number;
  transform?: string | ViewStyle['transform'];
  fWrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
  gap?: number;
  pt?: number;
  opacity?: number;
}

export const Container = ({
  children,
  height,
  width,
  bg,
  mb,
  mh,
  mt,
  mv,
  direction,
  jf,
  ac,
  ai,
  position,
  top,
  left,
  bottom,
  right,
  flex,
  br,
  bw,
  bbw,
  bbc,
  btw,
  btc,
  brw,
  brc,
  blw,
  blc,
  bblr,
  bbrr,
  btlr,
  btrr,
  bc,
  zIndex,
  transform,
  fWrap,
  gap,
  pt,
  opacity,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: direction,
        height: height,
        width: width,
        backgroundColor: bg,
        justifyContent: jf,
        alignItems: ai,
        alignContent: ac,
        marginHorizontal: mh,
        marginVertical: mv,
        marginTop: mt,
        marginBottom: mb,
        position: position,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        flex: flex,
        borderRadius: br,
        borderWidth: bw,
        borderColor: bc,
        borderBottomWidth: bbw,
        borderBottomColor: bbc,
        borderTopWidth: btw,
        borderTopColor: btc,
        borderRightWidth: brw,
        borderRightColor: brc,
        borderLeftWidth: blw,
        borderLeftColor: blc,
        borderBottomLeftRadius: bblr,
        borderTopLeftRadius: btlr,
        borderTopRightRadius: btrr,
        borderBottomRightRadius: bbrr,
        zIndex: zIndex,
        transform: transform,
        flexWrap: fWrap,
        gap: gap,
        paddingTop: pt,
        opacity: opacity,
      }}>
      {children}
    </View>
  );
};
