import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>List of clients</Text>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('NewClient')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 30,
  },
});
