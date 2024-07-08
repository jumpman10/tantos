import React from 'react';
import {ColorValue, DimensionValue, Text} from 'react-native';

interface Props {
  color?: ColorValue | undefined;
  size?: number | undefined;
  fs?: 'italic' | 'normal' | undefined;
  text: string;
  ta?: 'justify' | 'auto' | 'left' | 'right' | 'center' | undefined;
  weigth?:
    | 'normal'
    | '200'
    | 'bold'
    | '100'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  ph?: number;
  pv?: number;
  width?: DimensionValue | undefined;
}

export const Block = ({
  color,
  size,
  fs,
  text,
  ta,
  weigth,
  pv,
  ph,
  width,
}: Props) => {
  return (
    <Text
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        color: color ? color : '#A59D86',
        fontSize: size,
        fontStyle: fs,
        fontWeight: weigth ? weigth : '200',
        textAlign: ta,
        paddingHorizontal: ph,
        paddingVertical: pv,
        width: width,
      }}>
      {text}
    </Text>
  );
};
