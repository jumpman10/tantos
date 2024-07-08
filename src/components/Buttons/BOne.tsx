import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  text: string;
  press: any;
}

export const BOne = ({text, press}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={press}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 230,
    backgroundColor: '#FFF5D6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: '#CEC4A8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.41,
    elevation: 2,
    marginTop: 20,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: '300',
    color: '#A59D86',
  },
});
