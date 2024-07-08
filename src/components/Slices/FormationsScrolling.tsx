import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
const {width} = Dimensions.get('window');
const itemWidth = (width / 3) * 2;
const gap = (width - itemWidth) / 4;
const FormationsScrolling = () => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      decelerationRate="fast"
      contentContainerStyle={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      snapToInterval={itemWidth + gap}>
      {[1, 2, 3, 4, 5].map(x => (
        <View key={x} style={styles.item} />
      ))}
    </ScrollView>
  );
};

export default FormationsScrolling;
const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: gap * 2,
    paddingRight: gap,
    alignItems: 'center',
    backgroundColor: 'green',
  },
  item: {
    height: itemWidth,
    width: itemWidth,
    backgroundColor: 'red',
    marginRight: gap,
    borderRadius: 10,
  },
});
