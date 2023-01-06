import React from 'react';
import {Button} from 'react-native-paper';

export const BarTop = () => {
  const handlePress = () => {
    console.log('creat a client');
  };
  return <Button onPress={() => handlePress()}>Client</Button>;
};
