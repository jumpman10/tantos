import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {Stats} from '../screens/Stats';
import {Result} from '../screens/Result';
import {Table} from '../screens/Table';
import {Game} from '../screens/Game';
import {Sport} from '../screens/Sport';
import {GamesStats} from '../screens/GamesStats';
import {StatsViewer} from '../screens/StatsViewer';
import {StatsRecluter} from '../screens/StatsRecluter';
import {PlayerData} from '../screens/PlayerData';
import {ResultRecluter} from '../screens/ResultRecluter';

type ResultsValues = {
  points?: any;
  assist?: number;
  rebound?: number;
  foul?: number;
  doubleIn?: number;
  triple?: number;
  tripleIn?: number;
  freeT?: number;
  freeTIn?: number;
  turnover?: number;
  skewY?: number;
  fieldGoal?: number;
};

export type RootStackParams = {
  Home: undefined;
  Stats: undefined;
  Result: ResultsValues;
  ResultRecluer: undefined;
  Table: undefined;
  Game: undefined;
  Sport: undefined;
  GamesStats: undefined;
  StatsViewer: undefined;
  StatsRecluter: undefined;
  PlayerData: undefined;
};
const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: '#FFF5D6'}}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Stats"
        component={Stats}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResultRecluter"
        component={ResultRecluter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Table"
        component={Table}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Game"
        component={Game}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sport"
        component={Sport}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GamesStats"
        component={GamesStats}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsViewer"
        component={StatsViewer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsRecluter"
        component={StatsRecluter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlayerData"
        component={PlayerData}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
