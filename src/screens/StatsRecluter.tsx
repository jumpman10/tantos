import React, {useState} from 'react';
import {Block} from '../components/Text/Block';
import {Container} from '../components/Views/Container';
import {BSecond} from '../components/Buttons/BSecond';
import {StackScreenProps} from '@react-navigation/stack';
import {BOne} from '../components/Buttons/BOne';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Scroll} from '../components/Views/Scroll';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<any, any> {}

export const StatsRecluter = ({navigation, route}: Props) => {
  const {playerInfo} = route.params;
  const [points, setPoints] = useState(0);
  const [assist, setAssist] = useState(0);
  const [rebound, setRebound] = useState(0);
  const [foul, setFoul] = useState(0);
  const [turnover, setTurnover] = useState(0);
  const [triple, setTriple] = useState(0);
  const [tripleIn, setTripleIn] = useState(0);
  const [double, setDouble] = useState(0);
  const [doubleIn, setDoubleIn] = useState(0);
  const [freeT, setFreeT] = useState(0);
  const [freeTIn, setFreeTIn] = useState(0);
  const [fieldGoal, setFieldGoal] = useState(0);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const triples = (e: String) => {
    if (e === 'minus') {
      if (triple > 0 || tripleIn > 0) {
        setPoints(points - 3);
        setFieldGoal(fieldGoal - 1);
        setTriple(triple - 1);
        setTripleIn(tripleIn - 1);
      }
    } else if (e === 'plus') {
      setPoints(points + 3);
      setTripleIn(tripleIn + 1);
      setTriple(triple + 1);
      setFieldGoal(fieldGoal + 1);
    } else if (e === 'failed') {
      setTriple(triple + 1);
      setFieldGoal(fieldGoal + 1);
    } else if (e === 'failedMinus') {
      if (triple > 0 && tripleIn < fieldGoal && triple > tripleIn) {
        setTriple(triple - 1);
        setFieldGoal(fieldGoal - 1);
      }
    }
  };
  const allShoots = (e: String) => {
    if (e === 'minus') {
      if (double > 0 || doubleIn > 0) {
        setPoints(points - 2);
        setDoubleIn(doubleIn - 1);
        setFieldGoal(fieldGoal - 1);
        setDouble(double - 1);
      }
    } else if (e === 'plus') {
      setPoints(points + 2);
      setDoubleIn(doubleIn + 1);
      setFieldGoal(fieldGoal + 1);
      setDouble(double + 1);
    } else if (e === 'failedMinus') {
      if (
        double >= 0 &&
        doubleIn < fieldGoal &&
        fieldGoal > triple &&
        doubleIn + tripleIn < fieldGoal &&
        double + triple < fieldGoal
      ) {
        setFieldGoal(fieldGoal - 1);
      }
    }
  };
  const freeThrows = (e: String) => {
    if (e === 'minus') {
      if (freeT > 0 || freeTIn > 0) {
        setPoints(points - 1);
        setFreeTIn(freeTIn - 1);
        setFreeT(freeT - 1);
      }
    } else if (e === 'plus') {
      setPoints(points + 1);
      setFreeTIn(freeTIn + 1);
      setFreeT(freeT + 1);
    } else if (e === 'failedMinus') {
      if (freeT > 0 && freeTIn < freeT) {
        setFreeT(freeT - 1);
      }
    }
  };
  const data = [
    {
      name: '+2',
      value: '',
      plus: () => allShoots('plus'),
      minus: () => allShoots('minus'),
      failed: () => setFieldGoal(fieldGoal + 1),
      failedMinus: () => allShoots('failedMinus'),
    },
    {
      name: '+3',
      value: '',
      plus: () => triples('plus'),
      minus: () => triples('minus'),
      failed: () => triples('failed'),
      failedMinus: () => triples('failedMinus'),
    },
    {
      name: '+1',
      value: '',
      plus: () => freeThrows('plus'),
      minus: () => freeThrows('minus'),
      failed: () => setFreeT(freeT + 1),
      failedMinus: () => freeThrows('failedMinus'),
    },
    {
      name: 'Ast',
      value: assist,
      plus: () => setAssist(assist + 1),
      minus: () => (assist === 0 ? null : setAssist(assist - 1)),
    },
    {
      name: 'Reb',
      value: rebound,
      plus: () => setRebound(rebound + 1),
      minus: () => (rebound === 0 ? null : setRebound(rebound - 1)),
    },
    {
      name: 'Foul',
      value: foul,
      plus: () => setFoul(foul + 1),
      minus: () => (foul === 0 ? null : setFoul(foul - 1)),
    },
    {
      name: 'Per',
      value: turnover,
      plus: () => setTurnover(turnover + 1),
      minus: () => (turnover === 0 ? null : setTurnover(turnover - 1)),
    },
  ];
  const addNotes = () => {
    setNotes([...notes, note]);
    setNote('');
  };
  return (
    <Scroll>
      <Container height={180} width={'100%'} ai="center">
        <View style={styles.container}>
          <Block size={20} text={'points'} color={'black'} />
          <Block
            size={60}
            text={`${points}`}
            color={'black'}
            weigth="600"
            fs="italic"
          />
        </View>
        <Container width={'100%'} jf="center" ai="center" height={'50%'}>
          <Container
            width={'100%'}
            direction="row"
            jf="space-around"
            ai="center"
            height={'50%'}>
            <Container direction="row" ai="center">
              <Block
                size={25}
                text={`${freeTIn}/${freeT}`}
                color={'black'}
                weigth="600"
                fs="italic"
              />
              <Block size={20} text={' TL'} color={'black'} />
            </Container>
            <Container direction="row" ai="center">
              <Block
                size={25}
                text={`${tripleIn + doubleIn}/${fieldGoal}`}
                color={'black'}
                weigth="600"
                fs="italic"
              />
              <Block size={20} text={' TC'} color={'black'} />
            </Container>
            <Container direction="row" ai="center">
              <Block
                size={25}
                text={`${tripleIn}/${triple}`}
                color={'black'}
                weigth="600"
                fs="italic"
              />
              <Block size={20} text={' 3s'} color={'black'} />
            </Container>
          </Container>
        </Container>
      </Container>
      <Container width={'100%'} height={500} jf="space-around">
        {data.map((e, i) => (
          <Container
            key={i}
            width={'100%'}
            height={'13%'}
            direction="row"
            jf="space-around"
            ai="center">
            <Container width={'40%'} jf="center" ai="center" direction="row">
              <Block
                text={`${e.value}`}
                size={30}
                color={'black'}
                fs="italic"
                weigth="600"
              />
              {e.value === '' ? (
                <Block
                  text={`${e.name}`}
                  size={25}
                  color={'black'}
                  fs="italic"
                  weigth="300"
                />
              ) : (
                <Block text={` ${e.name}`} size={25} color={'black'} />
              )}
            </Container>
            <Container
              width={'60%'}
              jf="space-around"
              ai="center"
              direction="row">
              <BSecond text="+" press={e.plus} />
              <BSecond text="-" press={e.minus} />
              {e.failed && e.failedMinus ? (
                <>
                  <BSecond text="X" press={e.failed} />
                  <BSecond text="-" press={e.failedMinus} />
                </>
              ) : null}
            </Container>
          </Container>
        ))}
      </Container>
      <Block
        text="Toma nota"
        size={17}
        width={'90%'}
        ta="left"
        weigth="100"
        fs="italic"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNote}
        value={note}
        placeholder="Escribre una observación"
        placeholderTextColor={'gray'}
      />
      <TouchableOpacity style={styles.checkButton} onPress={() => addNotes()}>
        <Icon name="checkmark-outline" size={45} color={'#A59D86'} />
      </TouchableOpacity>
      <View style={styles.observations}>
        <Block text="Obsevaciones" size={20} />
        {notes.length !== 0 ? (
          notes.map((e, i) => (
            <Block
              key={i}
              text={`- ${e}`}
              color={'black'}
              size={17}
              fs="italic"
              ta="left"
              weigth="300"
              pv={5}
              ph={15}
              width={'100%'}
            />
          ))
        ) : (
          <Block size={25} text={'No existen notas'} />
        )}
      </View>
      <Container width={'100%'} height={150} jf="center" ai="center">
        <BOne
          text="Detalle ->"
          press={() =>
            navigation.navigate('ResultRecluter', {
              fieldGoal: fieldGoal,
              assist: assist,
              points: points,
              rebound: rebound,
              doubleIn: doubleIn,
              double: double,
              tripleIn: tripleIn,
              triple: triple,
              freeT: freeT,
              freeTIn: freeTIn,
              turnover: turnover,
              foul: foul,
              playerData: playerInfo,
              notes: notes,
            })
          }
        />
      </Container>
    </Scroll>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '50%',
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  input: {
    width: '80%',
    color: 'black',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#A59D86',
  },
  checkButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
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
    marginTop: 18,
  },
  observations: {
    height: 'auto',
    width: '90%',
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
});
