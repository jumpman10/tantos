/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';

interface Props {
  children: any;
}
export const Scroll = ({children}: Props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
      }}
      style={{flex: 1}}>
      {children}
    </ScrollView>
  );
};
