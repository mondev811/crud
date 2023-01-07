import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Headline, Button} from 'react-native-paper';
import {globalStyles} from '../styles/global';

export const NewClient = () => {
  const readName = () => {
    console.log('read name');
  };
  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>Add a new client</Headline>
      <TextInput
        label="Name"
        placeholder="Client name"
        onChangeText={() => readName()}
        style={styles.input}
      />
      <TextInput
        label="Phone"
        placeholder="Phone number"
        onChangeText={() => readName()}
        style={styles.input}
      />
      <TextInput
        label="Email"
        placeholder="email@email.com"
        onChangeText={() => readName()}
        style={styles.input}
      />
      <TextInput
        label="Company"
        placeholder="Company name"
        onChangeText={() => readName()}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});
