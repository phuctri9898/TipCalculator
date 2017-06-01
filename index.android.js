/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Easing,
  Animated
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Calculator from "./Apps/calculator.js";

import Setting from './Apps/setting.js';


// export default class test extends Component {
//   render() {
//     return (
//       <Calculator />
//     );
//   }
// }
const test = StackNavigator(
  {
  Calculator: {screen: Calculator},
  Setting: {screen: Setting},
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 250,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateY }] }
      },
    })
  });
AppRegistry.registerComponent('test', () => test);
