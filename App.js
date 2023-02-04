import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {Home, ClientDetails, NewClient} from './src/views';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#1774F2',
    // accent: '#0655BF',
  },
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="ClientDetails"
              component={ClientDetails}
              options={{title: 'Client details'}}
            />
            <Stack.Screen
              name="NewClient"
              component={NewClient}
              options={({route}) => ({
                title: route.params?.client ? 'Update client' : 'New client',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;
