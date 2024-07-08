import React from 'react';
import {View} from 'react-native';

interface Props {
  children: any;
  height: number;
}
export const Card = ({children, height}: Props) => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: '#F1F1F1',
        borderRadius: 10,
        width: '90%',
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        marginVertical: 50,
      }}>
      {children}
    </View>
  );
};
