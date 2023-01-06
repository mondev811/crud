import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, ClientDetails, NewClient} from './src/views';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ClientDetails"
          component={ClientDetails}
          options={{title: 'Client details'}}
        />
        <Stack.Screen
          name="NewClient"
          component={NewClient}
          options={{title: 'New client'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
