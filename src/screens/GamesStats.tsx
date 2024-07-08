import React from 'react';
import {Container} from '../components/Views/Container';
import {Block} from '../components/Text/Block';
import {useGetAllStatsQuery} from '../services/api/api';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';

interface Props extends StackScreenProps<any, any> {}

export const GamesStats = ({navigation}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data: result, isSuccess, error, isLoading} = useGetAllStatsQuery();
  return (
    <Container width={'100%'} ai="center" jf="center">
      <FlatList
        data={result}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: '100%'}}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.press}
            onPress={() => navigation.navigate('StatsViewer', {item: item})}>
            <Block text={item.date} size={30} />
            <Container direction="row" jf="space-around" width={'100%'}>
              <Container direction="row">
                <Block text={'Pts ='} size={25} />
                <Block text={item.values[0]} size={25} />
              </Container>
              <Container direction="row">
                <Block text={'Ast ='} size={25} />
                <Block text={item.values[1]} size={25} />
              </Container>
              <Container direction="row">
                <Block text={'Reb ='} size={25} />
                <Block text={item.values[2]} size={25} />
              </Container>
            </Container>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  press: {
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#CEC4A8',
    borderRadius: 30,
    marginTop: 20,
  },
});
