import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  text: string;
  press: any;
}

export const BSecond = ({text, press}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={press}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: '#FFF5D6',
    borderColor: '#CEC4A8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.41,
    elevation: 2,
  },
  text: {
    fontSize: 35,
    fontWeight: '400',
    textAlignVertical: 'bottom',
    color: '#A59D86',
  },
});
