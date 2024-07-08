/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Container} from '../components/Views/Container';
import {
  View,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
  TouchableOpacity,
  PanResponder,
  Modal,
  Text,
} from 'react-native';
import {Circle, Path, Svg, Line} from 'react-native-svg';
import {TableBasquet} from '../components/Tables/TableBasquet';
import {Players} from '../components/interfaces/Players';
import Icon from 'react-native-vector-icons/Ionicons';
import {Block} from '../components/Text/Block';
import {Ball} from '../components/interfaces/Ball';
import {Animated} from 'react-native';

const {width} = Dimensions.get('window');

export const Table = () => {
  const [mode, setMode] = useState('hand');
  const [openColorsPen, setOpenColorsPen] = useState(false);
  const [colorPen, setColorPen] = useState('red');
  const [openColorsCircle, setOpenColorsCircle] = useState(false);
  const [colorCircle, setColorCircle] = useState('red');
  const colors = ['blue', 'green', 'red', 'violet', 'black'];
  const [indexSVG, setIndexSVG] = useState(500);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [playsActive, setPlaysActive] = useState(false);
  const [times, setTimes] = useState([{time: 0, x: 0, y: 0}]);
  const [plays, setPlays] = useState({x: 0, y: 0});
  const [timeSelected, setTimeSelected] = useState(1);
  const [playerSelected, setPlayerSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const onTouchMove = (event: GestureResponderEvent) => {
    const newPath = [...currentPath];
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(
      0,
    )},${locationY.toFixed(0)} `;
    newPath.push(newPoint);
    setCurrentPath(newPath);
  };
  const [paths, setPaths] = useState<{p: string; color: string}[]>([]);
  const onTouchEnd = () => {
    if (currentPath.length > 0) {
      const currentPaths = [...paths];
      const newPath = [...currentPath];
      currentPaths.push({p: newPath.join(''), color: colorPen});
      setPaths(currentPaths);
      setCurrentPath([]);
    }
  };
  const [circles, setCircles] = useState<
    {cx: number; cy: number; r: number; color: string}[]
  >([]);
  const [currentCircle, setCurrentCircle] = useState<{
    cx: number;
    cy: number;
    r: number;
    color: string;
  } | null>(null);

  const handleTouchMove = (event: GestureResponderEvent) => {
    if (currentCircle) {
      // Update the current circle's radius based on touch move
      const deltaX = event.nativeEvent.locationX - currentCircle.cx;
      const deltaY = event.nativeEvent.locationY - currentCircle.cy;
      const newRadius = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      setCurrentCircle({...currentCircle, r: newRadius});
    }
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    // Start drawing a new circle
    setCurrentCircle({cx: locationX, cy: locationY, r: 0, color: colorCircle});
  };

  const handleTouchEnd = () => {
    if (currentCircle) {
      // Save the completed circle to the list of circles
      setCircles([...circles, currentCircle]);
      setCurrentCircle(null);
    }
  };
  const reset = () => {
    setCircles([]);
    setPaths([]);
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const toggleModes = (mode: string) => {
    if (mode === 'pen') {
      setMode('pen');
      setOpenColorsPen(!openColorsPen);
      setOpenColorsCircle(false);
      setIndexSVG(1500);
    } else if (mode === 'circle') {
      setMode('circle');
      setOpenColorsCircle(!openColorsCircle);
      setOpenColorsPen(false);
      setIndexSVG(1500);
    } else if (mode === 'hand') {
      setMode('hand');
      setIndexSVG(500);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const toggleColors = ({color, mode}: any) => {
    if (mode === 'pen') {
      setColorPen(color);
      setOpenColorsPen(!openColorsPen);
    } else if ('circle') {
      setColorCircle(color);
      setOpenColorsCircle(!openColorsCircle);
    }
  };
  const [pg, setPg] = useState({x: 0, y: 0});
  const [sg, setSg] = useState({x: 0, y: 0});
  const [sf, setSf] = useState({x: 0, y: 0});
  const [pf, setPf] = useState({x: 0, y: 0});
  const [ce, setCe] = useState({x: 0, y: 0});
  const [activeForm, setActiveForm] = useState('');
  const formation1 = () => {
    setPg({x: -170, y: 0});
    setSg({x: -60, y: -270});
    setSf({x: -60, y: 270});
    setPf({x: 70, y: -120});
    setCe({x: 70, y: 120});
    setActiveForm('3:2');
  };
  const formation2 = () => {
    setPg({x: -140, y: 150});
    setSg({x: -140, y: -150});
    setSf({x: 70, y: 210});
    setPf({x: 70, y: -210});
    setCe({x: 50, y: 0});
    setActiveForm('2:3');
  };
  const formation3 = () => {
    setPg({x: -140, y: 130});
    setSg({x: -140, y: -130});
    setSf({x: 80, y: 300});
    setPf({x: 80, y: -300});
    setCe({x: 50, y: 0});
    setActiveForm('4:1');
  };
  const [openVsPlayers, setOpenVsPlayers] = useState(false);
  const [pgvs, setPgvs] = useState({x: 80, y: 0});
  const [sgvs, setSgvs] = useState({x: 80, y: 0});
  const [sfvs, setSfvs] = useState({x: 80, y: 0});
  const [pfvs, setPfvs] = useState({x: 80, y: 0});
  const [cevs, setCevs] = useState({x: 80, y: 0});
  const [activeFormVs, setActiveFormVs] = useState('');
  const formation1vs = () => {
    setPgvs({x: -100, y: 0});
    setSgvs({x: -15, y: -200});
    setSfvs({x: -15, y: 200});
    setPfvs({x: 130, y: -80});
    setCevs({x: 130, y: 80});
    setActiveFormVs('3:2');
  };
  const formation2vs = () => {
    setPgvs({x: -65, y: 120});
    setSgvs({x: -65, y: -120});
    setSfvs({x: 110, y: 170});
    setPfvs({x: 110, y: -170});
    setCevs({x: 110, y: 0});
    setActiveFormVs('2:3');
  };
  const formation3vs = () => {
    setPgvs({x: -65, y: 120});
    setSgvs({x: -65, y: -120});
    setSfvs({x: 100, y: 240});
    setPfvs({x: 100, y: -240});
    setCevs({x: 110, y: 0});
    setActiveFormVs('4:1');
  };
  const formationSelectedInPlay = (formation: string) => {
    if (formation === '3:2') {
      formation1();
    } else if (formation === '2:3') {
      formation2();
    } else if (formation === '4:1') {
      formation3();
    }
  };
  const startPlayConf = () => {
    setPlaysActive(true);
    setModalVisible(false);
  };
  const [line, setLine] = useState({x1: 0, y1: 0, x2: 0, y2: 0});
  const animatedX = useRef(new Animated.Value(0)).current;
  const animatedY = useRef(new Animated.Value(0)).current;
  const [activeMove, setActiveMode] = useState(false);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        setLine({
          x1: gestureState.x0,
          y1: gestureState.y0,
          x2: gestureState.x0,
          y2: gestureState.y0,
        });
      },
      onPanResponderMove: (e, gestureState) => {
        setLine(prev => ({
          ...prev,
          x2: gestureState.moveX,
          y2: gestureState.moveY,
        }));
      },
      onPanResponderRelease: (e, gestureState) => {
        Animated.timing(animatedX, {
          toValue: gestureState.moveX - line.x1,
          duration: 1000,
          useNativeDriver: false,
        }).start();

        Animated.timing(animatedY, {
          toValue: gestureState.moveY - line.y1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;
  console.log(animatedX, animatedY);
  return (
    <Container width={'100%'} height={'100%'} ai="center" jf="center">
      {!playsActive && (
        <>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: '3%',
              left: '7%',
              zIndex: 1000,
            }}
            onPress={() => reset()}>
            <Icon name="trash" size={40} color="#A59D86" />
          </TouchableOpacity>
          <Container
            direction="column"
            position="absolute"
            top={'3%'}
            left={'22%'}>
            <TouchableOpacity
              style={{
                zIndex: 1000,
                flexDirection: 'column',
                borderColor: mode === 'pen' ? '#A59D86' : 'transparent',
                borderWidth: 2,
                borderBottomWidth: 0,
                borderRadius: 5,
              }}
              onPress={() => toggleModes('pen')}>
              <Icon name="pencil-outline" size={40} color="#A59D86" />
              <Container width={'100%'} height={6} bg={colorPen} />
            </TouchableOpacity>
            {openColorsPen &&
              colors.map((e, i) => (
                <Container key={i} bg={e} mt={2} zIndex={2500}>
                  <TouchableOpacity
                    onPress={() => toggleColors({color: e, mode: 'pen'})}
                    style={{width: '100%', height: 20}}
                  />
                </Container>
              ))}
          </Container>
          <Container
            direction="column"
            position="absolute"
            top={'3%'}
            left={'37%'}>
            <TouchableOpacity
              style={{
                zIndex: 1000,
                flexDirection: 'column',
                borderColor: mode === 'circle' ? '#A59D86' : 'transparent',
                borderWidth: 2,
                borderBottomWidth: 0,
                borderRadius: 5,
              }}
              onPress={() => toggleModes('circle')}>
              <Icon name="ellipse" size={40} color="#A59D86" />
              <Container width={'100%'} height={6} bg={colorCircle} />
            </TouchableOpacity>
            {openColorsCircle &&
              colors.map((e, i) => (
                <Container key={i} bg={e} mt={2} zIndex={2500}>
                  <TouchableOpacity
                    onPress={() => toggleColors({color: e, mode: 'circle'})}
                    style={{width: '100%', height: 20}}
                  />
                </Container>
              ))}
          </Container>
          <Container
            direction="column"
            position="absolute"
            top={'3%'}
            left={'52%'}>
            <TouchableOpacity
              style={{
                zIndex: 1000,
                flexDirection: 'column',
                borderColor: mode === 'hand' ? '#A59D86' : 'transparent',
                borderWidth: 2,
                borderRadius: 5,
              }}
              onPress={() => toggleModes('hand')}>
              <Icon name="hand-right-outline" size={40} color="#A59D86" />
            </TouchableOpacity>
          </Container>
          <Container position="absolute" top={'3%'} left={'65%'}>
            <TouchableOpacity
              style={{
                zIndex: 1000,
                flexDirection: 'row',
                borderColor: '#A59D86',
                borderWidth: 2,
                borderRadius: 5,
                padding: 2,
                backgroundColor:
                  activeForm === '3:2' ? '#A59D86' : 'transparent',
              }}
              onPress={() => formation1()}>
              <Block
                size={20}
                text="3:2"
                color={activeForm === '3:2' ? '#FFF5D6' : '#A59D86'}
              />
            </TouchableOpacity>
          </Container>
          <Container position="absolute" top={'3%'} left={'75%'}>
            <TouchableOpacity
              style={{
                zIndex: 1000,
                flexDirection: 'row',
                borderColor: '#A59D86',
                borderWidth: 2,
                borderRadius: 5,
                padding: 2,
                backgroundColor:
                  activeForm === '2:3' ? '#A59D86' : 'transparent',
              }}
              onPress={() => formation2()}>
              <Block
                size={20}
                text="2:3"
                color={activeForm === '2:3' ? '#FFF5D6' : '#A59D86'}
              />
            </TouchableOpacity>
          </Container>
          <Container position="absolute" top={'3%'} left={'85%'}>
            <TouchableOpacity
              style={{
                zIndex: 1000,
                flexDirection: 'row',
                borderColor: '#A59D86',
                borderWidth: 2,
                borderRadius: 5,
                padding: 2,
                backgroundColor:
                  activeForm === '4:1' ? '#A59D86' : 'transparent',
              }}
              onPress={() => formation3()}>
              <Block
                size={20}
                text="4:1"
                color={activeForm === '4:1' ? '#FFF5D6' : '#A59D86'}
              />
            </TouchableOpacity>
          </Container>
        </>
      )}
      {playsActive && (
        <Container position="absolute" top={'3%'} direction="row">
          {['B', 'ES', 'AL', 'AP', 'P'].map(x => (
            <TouchableOpacity
              key={x}
              style={{
                width: 40,
                zIndex: 1000,
                flexDirection: 'row',
                borderColor: '#A59D86',
                borderWidth: 2,
                borderRadius: 5,
                padding: 2,
                marginHorizontal: 3,
                justifyContent: 'center',
                backgroundColor:
                  playerSelected === x ? '#A59D86' : 'transparent',
              }}
              onPress={() => setPlayerSelected(x)}>
              <Block
                size={20}
                text={x}
                color={playerSelected === x ? '#FFF5D6' : '#A59D86'}
              />
            </TouchableOpacity>
          ))}
        </Container>
      )}
      <Container position="absolute" bottom={'3%'} left={'5%'}>
        <TouchableOpacity
          style={{
            zIndex: 1000,
            flexDirection: 'row',
            borderColor: '#A59D86',
            borderWidth: 3,
            borderRadius: 5,
            padding: 5,
            backgroundColor: playsActive ? '#A59D86' : 'transparent',
          }}
          onPress={() => setPlaysActive(true)}>
          <Icon
            name="clipboard-outline"
            size={30}
            color={!playsActive ? '#A59D86' : '#FFF5D6'}
          />
        </TouchableOpacity>
      </Container>
      {playsActive && (
        <Container
          position="absolute"
          bottom={'3%'}
          left={'30%'}
          jf="space-evenly"
          ai="center"
          direction="row">
          {[1, 2, 3, 4].map(x => (
            <View
              key={x}
              style={{
                zIndex: 1000,
                flexDirection: 'row',
                borderColor: '#A59D86',
                borderWidth: 3,
                borderRadius: 5,
                padding: 5,
                backgroundColor: timeSelected === x ? '#A59D86' : 'transparent',
                marginHorizontal: 2,
              }}>
              <Block
                size={25}
                text={String(x)}
                color={timeSelected === x ? '#FFF5D6' : '#A59D86'}
                weigth="400"
              />
            </View>
          ))}
        </Container>
      )}
      <Container position="absolute" bottom={'3%'} left={'5%'}>
        <TouchableOpacity
          style={{
            zIndex: 1000,
            flexDirection: 'row',
            borderColor: '#A59D86',
            borderWidth: 3,
            borderRadius: 5,
            padding: 5,
            backgroundColor: playsActive ? '#A59D86' : 'transparent',
          }}
          onPress={() => setModalVisible(true)}>
          <Icon
            name="clipboard-outline"
            size={30}
            color={!playsActive ? '#A59D86' : '#FFF5D6'}
          />
        </TouchableOpacity>
      </Container>
      {!playsActive && (
        <Container position="absolute" bottom={'3%'} left={'45%'}>
          <TouchableOpacity
            style={{
              zIndex: 1000,
              flexDirection: 'row',
              borderColor: '#A59D86',
              borderWidth: 3,
              borderRadius: 5,
              padding: 5,
              backgroundColor: openVsPlayers ? '#A59D86' : 'transparent',
            }}
            onPress={() => setOpenVsPlayers(!openVsPlayers)}>
            <Block
              size={25}
              text="VS"
              color={!openVsPlayers ? '#A59D86' : '#FFF5D6'}
              weigth="400"
            />
          </TouchableOpacity>
        </Container>
      )}
      {openVsPlayers && !playsActive && (
        <>
          <Container position="absolute" bottom={'3%'} left={'65%'}>
            <TouchableOpacity
              style={{
                zIndex: 1000,
                flexDirection: 'row',
                borderColor: '#A59D86',
                borderWidth: 2,
                borderRadius: 5,
                padding: 2,
                backgroundColor:
                  activeFormVs === '3:2' ? '#A59D86' : 'transparent',
              }}
              onPress={() => formation1vs()}>
              <Block
                size={20}
                text="3:2"
                color={activeFormVs === '3:2' ? '#FFF5D6' : '#A59D86'}
              />
            </TouchableOpacity>
          </Container>
          <Container position="absolute" bottom={'3%'} left={'75%'}>
            <TouchableOpacity
              style={{
                zIndex: 1000,
                flexDirection: 'row',
                borderColor: '#A59D86',
                borderWidth: 2,
                borderRadius: 5,
                padding: 2,
                backgroundColor:
                  activeFormVs === '2:3' ? '#A59D86' : 'transparent',
              }}
              onPress={() => formation2vs()}>
              <Block
                size={20}
                text="2:3"
                color={activeFormVs === '2:3' ? '#FFF5D6' : '#A59D86'}
              />
            </TouchableOpacity>
          </Container>
          <Container position="absolute" bottom={'3%'} left={'85%'}>
            <TouchableOpacity
              style={{
                zIndex: 1000,
                flexDirection: 'row',
                borderColor: '#A59D86',
                borderWidth: 2,
                borderRadius: 5,
                padding: 2,
                backgroundColor:
                  activeFormVs === '4:1' ? '#A59D86' : 'transparent',
              }}
              onPress={() => formation3vs()}>
              <Block
                size={20}
                text="4:1"
                color={activeFormVs === '4:1' ? '#FFF5D6' : '#A59D86'}
              />
            </TouchableOpacity>
          </Container>
        </>
      )}
      <TableBasquet />
      <Ball />
      <Players
        pos="B"
        place={pg}
        bg={playerSelected === 'B' ? 'green' : '#CACACA'}
        activated={activeMove}
      />
      <Players
        pos="ES"
        place={sg}
        bg={playerSelected === 'ES' ? 'green' : '#CACACA'}
        zIndex={playerSelected !== '' ? -1 : 1000}
        activated={false}
      />
      <Players
        pos="A"
        place={sf}
        bg={playerSelected === 'AL' ? 'green' : '#CACACA'}
        zIndex={playerSelected !== '' ? -1 : 1000}
        activated={false}
      />
      <Players
        pos="AP"
        place={pf}
        bg={playerSelected === 'AP' ? 'green' : '#CACACA'}
        zIndex={playerSelected !== '' ? -1 : 1000}
        activated={false}
      />
      <Players
        pos="P"
        place={ce}
        bg={playerSelected === 'P' ? 'green' : '#CACACA'}
        zIndex={playerSelected !== '' ? -1 : 1000}
        activated={false}
      />
      {openVsPlayers && (
        <>
          <Players pos="B" place={pgvs} color={'white'} bg={'red'} />
          <Players pos="ES" place={sgvs} color={'white'} bg={'red'} />
          <Players pos="A" place={sfvs} color={'white'} bg={'red'} />
          <Players pos="AP" place={pfvs} color={'white'} bg={'red'} />
          <Players pos="P" place={cevs} color={'white'} bg={'red'} />
        </>
      )}
      <View
        style={[styles.svgContainer, {zIndex: indexSVG}]}
        onTouchMove={mode === 'pen' ? onTouchMove : undefined}
        onTouchEnd={mode === 'pen' ? onTouchEnd : undefined}
        {...PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: mode === 'circle' ? handleTouchMove : undefined,
          onPanResponderStart: mode === 'circle' ? handleTouchStart : undefined,
          onPanResponderEnd: mode === 'circle' ? handleTouchEnd : undefined,
        }).panHandlers}
        {...panResponder.panHandlers}>
        <Svg height={'100%'} width={width}>
          <Line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="black"
            strokeWidth="2"
          />
          <Path
            d={currentPath.join('')}
            stroke={colorPen}
            fill={'transparent'}
            strokeWidth={4}
            strokeLinejoin={'round'}
            strokeLinecap={'round'}
          />
          {paths?.length > 0 &&
            paths?.map((item, index) => (
              <Path
                key={`path-${index}`}
                d={item.p}
                stroke={item.color}
                fill={'transparent'}
                strokeWidth={4}
                strokeLinejoin={'round'}
                strokeLinecap={'square'}
              />
            ))}
          <>
            {circles.map((circle, index) => (
              <Circle
                key={index}
                cx={circle.cx}
                cy={circle.cy}
                r={circle.r}
                stroke={circle.color}
                strokeWidth={2}
                fill={circle.color}
                fillOpacity={0.3}
              />
            ))}
            {currentCircle && (
              <Circle
                cx={currentCircle.cx}
                cy={currentCircle.cy}
                r={currentCircle.r}
                stroke={currentCircle.color}
                strokeWidth={2}
                fill="transparent"
              />
            )}
          </>
        </Svg>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Crea tu jugada</Text>
            <Text style={styles.modalText}>1-Selecciona formación</Text>
            <Container width={'100%'} height={'50%'} direction="column">
              <Container
                width={'100%'}
                height={'50%'}
                direction="row"
                ai="center"
                jf="space-evenly">
                <TouchableOpacity
                  style={[
                    styles.formationBtn,
                    {
                      backgroundColor:
                        activeForm === '3:2' ? '#A59D86' : 'transparent',
                    },
                  ]}
                  onPress={() => formationSelectedInPlay('3:2')}>
                  <Icon
                    name="clipboard-outline"
                    size={25}
                    color={activeForm === '3:2' ? '#FFF5D6' : '#A59D86'}
                  />
                  <Block
                    text="3:2"
                    size={25}
                    color={activeForm === '3:2' ? '#FFF5D6' : '#A59D86'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.formationBtn,
                    {
                      backgroundColor:
                        activeForm === '2:3' ? '#A59D86' : 'transparent',
                    },
                  ]}
                  onPress={() => formationSelectedInPlay('2:3')}>
                  <Icon
                    name="clipboard-outline"
                    size={25}
                    color={activeForm === '2:3' ? '#FFF5D6' : '#A59D86'}
                  />
                  <Block
                    text="2:3"
                    size={25}
                    color={activeForm === '2:3' ? '#FFF5D6' : '#A59D86'}
                  />
                </TouchableOpacity>
              </Container>
              <Container width={'100%'} height={'50%'} ai="center" jf="center">
                <TouchableOpacity
                  style={[
                    styles.formationBtn,
                    {
                      backgroundColor:
                        activeForm === '4:1' ? '#A59D86' : 'transparent',
                    },
                  ]}
                  onPress={() => formationSelectedInPlay('4:1')}>
                  <Icon
                    name="clipboard-outline"
                    size={25}
                    color={activeForm === '4:1' ? '#FFF5D6' : '#A59D86'}
                  />
                  <Block
                    text="4:1"
                    size={25}
                    color={activeForm === '4:1' ? '#FFF5D6' : '#A59D86'}
                  />
                </TouchableOpacity>
              </Container>
            </Container>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => startPlayConf()}>
              <Text style={styles.textStyle}>Seleccionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    height: '80%',
    width,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    position: 'relative',
  },
  container: {
    height: '80%',
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3000,
  },
  button: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: '70%',
    backgroundColor: '#FFF5D6',
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: 'center',
    borderColor: '#A59D86',
    borderWidth: 1,
    elevation: 2,
  },
  button2: {
    color: 'white',
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    borderWidth: 1,
    backgroundColor: '#FFF5D6',
    borderColor: '#A59D86',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#A59D86',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  formationBtn: {
    width: '40%',
    height: '90%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#A59D86',
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
