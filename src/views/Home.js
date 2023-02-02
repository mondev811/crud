import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {Headline, List, FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useClientsData} from '../hooks/queryHooks';
import {globalStyles} from '../styles/global';

export const Home = () => {
  const {isLoading, isError, data} = useClientsData();
  const clientList = data?.data;

  const navigation = useNavigation();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>List of clients</Headline>
      {isError && (
        <Text style={globalStyles.warning}>
          Error fetching data. Is the API server running?
        </Text>
      )}
      {clientList.length === 0 && (
        <Text style={globalStyles.warning}>
          There are no clients to display.
        </Text>
      )}
      <FlatList
        data={clientList}
        keyExtractor={client => client.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            description={item.company}
            onPress={() =>
              navigation.navigate('ClientDetails', {
                item,
              })
            }
          />
        )}
      />
      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NewClient')}
      />
    </View>
  );
};
