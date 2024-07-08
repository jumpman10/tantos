import React, {useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container} from '../Views/Container';
import {Block} from '../Text/Block';
interface Props {
  gotoBasketStats: any;
  gotoFolder: any;
  gotoSettings: any;
  gotoTable: any;
  gotoStatsRecluter: any;
}

export const BHome = ({
  gotoTable,
  gotoSettings,
  gotoFolder,
  gotoStatsRecluter,
  gotoBasketStats,
}: Props) => {
  const [sizeAnimation] = useState(new Animated.Value(157.5));
  const [sizeAnimation2] = useState(new Animated.Value(157.5));
  const [active, setActive] = useState(false);
  const toggleSize = () => {
    const newSize = active ? 157.5 : 350;
    const newSize2 = active ? 157.5 : 105;
    setActive(!active); // Invertir el estado

    Animated.parallel([
      Animated.timing(sizeAnimation, {
        toValue: newSize,
        duration: !active ? 500 : 200, // Duración de la animación en milisegundos
        useNativeDriver: false, // Necesario si estás usando propiedades que no son nativas
      }),
      Animated.timing(sizeAnimation2, {
        toValue: newSize2,
        duration: !active ? 200 : 1000, // Duración de la animación en milisegundos
        useNativeDriver: false, // Necesario si estás usando propiedades que no son nativas
      }),
    ]).start();
  };
  return (
    <Container
      mt={10}
      direction={'row'}
      jf="space-around"
      ac="flex-start"
      fWrap="wrap"
      width={350}
      height={'40%'}
      gap={15}>
      <Animated.View
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: sizeAnimation,
            flexDirection: active ? 'row' : 'column',
            justifyContent: active ? 'space-around' : 'center',
          },
        ]}>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: active ? 'row' : 'column',
          }}
          onPress={() => toggleSize()}>
          {active ? (
            <Container
              width={'70%'}
              height={'90%'}
              ai="center"
              jf="space-around"
              direction="row"
              bw={0.5}
              bc="#CEC4A8"
              br={20}>
              <Container
                width={1}
                height={'90%'}
                bc="#CEC4A8"
                bw={0.5}
                position="absolute"
                left={'50%'}
                right={'50%'}
                bg="#CEC4A8"
                transform={[{rotate: '5deg'}]}
              />
              <TouchableOpacity style={styles.sports} onPress={gotoBasketStats}>
                <Icon name="person-outline" size={40} color="#A59D86" />
                <Block text="Personal" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sports}
                onPress={gotoStatsRecluter}>
                <Icon name="eye-outline" size={40} color="#A59D86" />
                <Block text="Observador" />
              </TouchableOpacity>
            </Container>
          ) : (
            <>
              <Icon name="add-circle-outline" size={40} color="#A59D86" />
              <Text style={styles.text}>Anotador</Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.container, {width: sizeAnimation2}]}>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={gotoTable}>
          <Icon name="clipboard-outline" size={40} color="#A59D86" />
          <Text style={styles.text}>Pizarra</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.container, {width: sizeAnimation2}]}>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={gotoFolder}>
          <Icon name="folder-outline" size={40} color="#A59D86" />
          <Text style={styles.text}>Datos</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.container, {width: sizeAnimation2}]}>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={gotoSettings}>
          <Icon name="settings-outline" size={40} color="#A59D86" />
          <Text style={styles.text}>Configuración</Text>
        </TouchableOpacity>
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 157.5,
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
  },
  sports: {
    height: '100%',
    width: '45%',
    backgroundColor: '#FFF5D6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '300',
    color: '#A59D86',
  },
});
