import React, {useState} from 'react';
import {Scroll} from '../components/Views/Scroll';
import {Block} from '../components/Text/Block';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container} from '../components/Views/Container';
import {BOne} from '../components/Buttons/BOne';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const PlayerData = ({navigation}: Props) => {
  const [steps, setSteps] = useState(0);
  const [text, setText] = useState('');
  const [data, setData] = useState(['']);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [place, setPlace] = useState('');
  const [team, setTeam] = useState('');
  const fields = [
    {name: 'Nombre', value: name},
    {name: 'Apellido', value: lastName},
    {name: 'Posición', value: position},
    {name: 'Altura', value: height},
    {name: 'Peso', value: weight},
    {name: 'Lugar', value: place},
    {name: 'Equipo', value: team},
  ];
  const nextStep = () => {
    setSteps(steps + 1);
    if (steps === 0) {
      setName(text);
      setData([...data, text]);
      setText('');
    } else if (steps === 1) {
      setLastName(text);
      setData([...data, text]);
      setText('');
    } else if (steps === 2) {
      setPosition(text);
      setData([...data, text]);
      setText('');
    } else if (steps === 3) {
      setHeight(text);
      setData([...data, text]);
      setText('');
    } else if (steps === 4) {
      setWeight(text);
      setData([...data, text]);
      setText('');
    } else if (steps === 5) {
      setPlace(text);
      setData([...data, text]);
      setText('');
    } else if (steps === 6) {
      setTeam(text);
      setData([...data, text]);
      setText('');
    }
  };
  const positions = ['Base', 'Escolta', 'Alero', 'Ala-Pivot', 'Pivot'];
  const posSelector = (e: string) => {
    setText(e);
  };
  return (
    <Scroll>
      <Block text="Datos del jugador" size={30} weigth="100" />
      <Container mt={10}>
        {steps === 0 && (
          <Block
            text="Nombre"
            size={23}
            width={'90%'}
            ta="center"
            weigth="100"
            fs="italic"
          />
        )}
        {steps === 1 && (
          <Block
            text="Apellido"
            size={23}
            width={'90%'}
            ta="center"
            weigth="100"
            fs="italic"
          />
        )}
        {steps === 2 && (
          <Block
            text="Posición"
            size={23}
            width={'90%'}
            ta="center"
            weigth="100"
            fs="italic"
          />
        )}
        {steps === 3 && (
          <Block
            text="Altura aproximada"
            size={23}
            width={'90%'}
            ta="center"
            weigth="100"
            fs="italic"
          />
        )}
        {steps === 4 && (
          <Block
            text="Peso aproximado"
            size={23}
            width={'90%'}
            ta="center"
            weigth="100"
            fs="italic"
          />
        )}
        {steps === 5 && (
          <Block
            text="Lugar"
            size={23}
            width={'90%'}
            ta="center"
            weigth="100"
            fs="italic"
          />
        )}
        {steps === 6 && (
          <Block
            text="Equipo"
            size={23}
            width={'90%'}
            ta="center"
            weigth="100"
            fs="italic"
          />
        )}
      </Container>
      {(steps === 0 || steps === 1 || steps === 5 || steps === 6) && (
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Escribre..."
          placeholderTextColor={'grey'}
        />
      )}
      {(steps === 3 || steps === 4) && (
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Escribre..."
          placeholderTextColor={'gray'}
          keyboardType="number-pad"
        />
      )}
      {steps === 2 && (
        <Container direction="row" width={'90%'} ai="center" jf="space-around">
          {positions.map((e, i) => (
            <TouchableOpacity
              style={[
                styles.checkButton,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor:
                    text === e ? 'green' : styles.checkButton.backgroundColor,
                },
              ]}
              key={i}
              onPress={() => posSelector(e)}>
              {e !== 'Ala-Pivot' ? (
                <Block
                  text={`${e[0]}`}
                  size={18}
                  color={text === e ? 'white' : ''}
                />
              ) : (
                <Block text="AP" size={18} color={text === e ? 'white' : ''} />
              )}
            </TouchableOpacity>
          ))}
        </Container>
      )}
      {steps !== 7 && (
        <TouchableOpacity style={styles.checkButton} onPress={() => nextStep()}>
          <Icon name="checkmark-outline" size={45} color={'#A59D86'} />
        </TouchableOpacity>
      )}
      <View style={styles.observations}>
        {fields.map((e, i) => (
          <Container key={i} direction="row" width={'90%'}>
            <Block
              text={`${e.name}:`}
              color={'black'}
              size={20}
              fs="italic"
              ta="left"
              weigth="300"
              pv={5}
              ph={15}
            />
            <Block
              text={`${e.value}`}
              color={'black'}
              size={20}
              fs="italic"
              ta="left"
              weigth="500"
              pv={5}
              ph={0}
              width={'45%'}
            />
          </Container>
        ))}
      </View>
      {steps === 7 && (
        <Container mb={20}>
          <BOne
            text="Siguiente"
            press={() =>
              navigation.navigate('StatsRecluter', {playerInfo: fields})
            }
          />
        </Container>
      )}
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
    marginTop: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 5,
    marginBottom: 20,
    flexDirection: 'column',
  },
});
