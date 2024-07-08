import React from 'react';
import {Container} from '../components/Views/Container';
import {Block} from '../components/Text/Block';
import {StackScreenProps} from '@react-navigation/stack';
import {BOne} from '../components/Buttons/BOne';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {usePostStatsMutation} from '../services/api/api';
import {Scroll} from '../components/Views/Scroll';
interface Props extends StackScreenProps<any, any> {}

export const Result = ({navigation, route}: Props) => {
  const {
    points,
    assist,
    rebound,
    foul,
    doubleIn,
    triple,
    tripleIn,
    freeT,
    freeTIn,
    turnover,
    fieldGoal,
  } = route.params;
  const [postStats, {isSuccess: suceso, error: error2}] =
    usePostStatsMutation();
  const date = new Date().toLocaleDateString();
  const block1 = [
    {name: 'Astistencias', value: assist},
    {name: 'Rebotes', value: rebound},
    {name: 'Perdidas', value: turnover},
    {name: 'Fouls', value: foul},
  ];
  const block2 = [
    {name: 'Tiros de campo', value: doubleIn + tripleIn, value2: fieldGoal},
    {name: 'Tiros de 3', value: tripleIn, value2: triple},
    {name: 'Tiros libres', value: freeTIn, value2: freeT},
  ];
  const block3 = [
    {name: 'TC%', value: Math.round(((doubleIn + tripleIn) / fieldGoal) * 100)},
    {name: 'T3%', value: Math.round((tripleIn / triple) * 100)},
    {name: 'TL%', value: Math.round((freeTIn / freeT) * 100)},
  ];
  const fieldGoalPer = Math.round(((doubleIn + tripleIn) / fieldGoal) * 100);
  const triplePer = Math.round((tripleIn / triple) * 100);
  const freeTPer = Math.round((freeTIn / freeT) * 100);
  const saveData = () => {
    postStats({
      values: [
        points,
        assist,
        rebound,
        foul,
        doubleIn,
        triple,
        tripleIn,
        freeT,
        freeTIn,
        turnover,
        fieldGoal,
      ],
      date: date,
    });
    navigation.navigate('Home');
  };
  return (
    <Scroll>
      <Container position="absolute" top={5} left={20}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Block text="<-" size={35} color={'black'} />
        </TouchableOpacity>
      </Container>
      <Container
        width={'100%'}
        height={170}
        ai="center"
        jf="center"
        direction="column">
        <Block text={'puntos'} size={20} color={'black'} />
        <Block
          text={points}
          size={65}
          color={'black'}
          fs="italic"
          weigth="600"
        />
      </Container>
      <Container
        width={'100%'}
        height={110}
        ai="center"
        jf="space-around"
        direction="row">
        {block1.map((e, i) => (
          <Container
            width={'25%'}
            height={'100%'}
            ai="center"
            jf="center"
            direction="column"
            key={i}>
            <Block text={e.name} size={13} color={'black'} />
            <Block
              text={e.value}
              size={40}
              color={'black'}
              fs="italic"
              weigth="600"
            />
          </Container>
        ))}
      </Container>
      <Container
        width={'100%'}
        height={100}
        ai="center"
        jf="space-around"
        direction="row">
        {block2.map((e, i) => (
          <Container
            width={'25%'}
            height={'100%'}
            ai="center"
            jf="center"
            direction="column"
            key={i}>
            <Block text={e.name} size={13} color={'black'} />
            <Container ai="center" jf="center" direction="row">
              <Block
                text={e.value}
                size={35}
                color={'black'}
                fs="italic"
                weigth="600"
              />
              <Block text={'/'} size={35} color={'black'} />
              <Block
                text={e.value2}
                size={35}
                color={'black'}
                fs="italic"
                weigth="600"
              />
            </Container>
          </Container>
        ))}
      </Container>
      <Container
        width={'100%'}
        height={100}
        ai="center"
        jf="space-around"
        direction="row">
        {block3.map((e, i) => (
          <Container
            width={'25%'}
            height={'100%'}
            ai="center"
            jf="center"
            direction="column"
            key={i}>
            <Block text={e.name} size={13} color={'black'} />
            <Container ai="center" jf="center" direction="row">
              <Block
                text={Number.isNaN(e.value) ? '-' : `${e.value}`}
                size={35}
                color={'black'}
                fs="italic"
                weigth="600"
              />
              <Block text={' %'} size={20} color={'black'} />
            </Container>
          </Container>
        ))}
      </Container>
      <View style={styles.container}>
        <Block text="Obsevaciones" size={20} />
        {fieldGoalPer >= 0 && fieldGoalPer < 11 && (
          <Block
            text="- Bajo porcentaje de tiro(TC), practica e insite"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'red'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {fieldGoalPer >= 11 && fieldGoalPer < 30 && (
          <Block
            text="- Bajo porcentaje de tiro(TC), puedes hacerlo mejor"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'red'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {fieldGoalPer >= 30 && fieldGoalPer < 36 && (
          <Block
            text="- Buen porcentaje de tiro(TC) pero puedes mejorar"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {fieldGoalPer >= 36 && fieldGoalPer < 47 && (
          <Block
            text="- Buen porcentaje de tiro(TC), sigue así"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {fieldGoalPer >= 47 && fieldGoalPer < 70 && (
          <Block
            text="- Excelente porcentaje de tiro(TC), superate"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {fieldGoalPer >= 70 && fieldGoalPer < 100 && (
          <Block
            text="- Excelente porcentaje de tiro(TC), mantén el nivel"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'green'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {fieldGoalPer === 100 && (
          <Block
            text="- Porcentaje de tiro(TC) perfecto, sigue así que no sea casualidad"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'green'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {freeTPer >= 0 && freeTPer < 11 && (
          <Block
            text="- Mal porcentaje de tiros libres(TL), los libres deciden partidos, mejora urgentemente"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'red'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {freeTPer >= 11 && freeTPer < 29 && (
          <Block
            text="- Bajo porcentaje de tiros libres(TL), debes hacerlo mejor"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'red'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {freeTPer >= 30 && freeTPer < 36 && (
          <Block
            text="- Bajo porcentaje de tiros libres(TL) pero debes mejorar"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {freeTPer >= 36 && freeTPer < 47 && (
          <Block
            text="- Porcentaje de tiros libres(TL) que debes mejorar"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {freeTPer >= 47 && freeTPer < 70 && (
          <Block
            text="- Porcentaje de tiros libres(TL) que debes mejorar"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {freeTPer >= 70 && freeTPer < 100 && (
          <Block
            text="- Buen porcentaje de tiros libres(TL), mantén el nivel y superalo"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'green'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {freeTPer === 100 && (
          <Block
            text="- Porcentaje de tiros libres(TL) perfecto, sigue así que no sea casualidad"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'green'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {triplePer >= 0 && triplePer < 11 && (
          <Block
            text="- Bajo porcentaje de triple(T3), practica e insite"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'red'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {triplePer >= 11 && triplePer < 30 && (
          <Block
            text="- Bajo porcentaje de triple(T3), puedes hacerlo mejor"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'red'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {triplePer >= 30 && triplePer < 36 && (
          <Block
            text="- Buen porcentaje de triple(T3) pero puedes mejorar"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {triplePer >= 36 && triplePer < 46 && (
          <Block
            text="- Buen porcentaje de triple(T3), sigue así"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {triplePer >= 47 && triplePer < 70 && (
          <Block
            text="- Excelente porcentaje de triple(T3), superate"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {triplePer >= 70 && triplePer < 99 && (
          <Block
            text="- Excelente porcentaje de triple(T3), mantén el nivel"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {triplePer === 100 && (
          <Block
            text="- Porcentaje de triple(T3) perfecto, sigue así que no sea casualidad"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'green'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {(foul === 4 || foul === 5) && (
          <Block
            text="- Controla tus faltas"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'red'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {assist > 5 && (
          <Block
            text="- Buena cantidad de asistencias"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {rebound > 4 && (
          <Block
            text="- Buena cantidad de rebotes"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'black'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
        {turnover > 4 && (
          <Block
            text="- Ten cuidado con las perdidas"
            size={17}
            fs="italic"
            ta="left"
            weigth="300"
            color={'red'}
            pv={5}
            ph={15}
            width={'100%'}
          />
        )}
      </View>
      <Block
        text="Toma una captura de los resultados. Estamos trabajando en una base de datos para guardar tu progreso"
        ph={40}
        pv={20}
      />
      {/* <Container width={'100%'} height={130} ai="center" jf="center">
        <BOne text="Terminar" press={() => saveData()} />
      </Container> */}
    </Scroll>
  );
};

const styles = StyleSheet.create({
  container: {
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
