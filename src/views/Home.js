import {View, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Headline, List, FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {globalStyles} from '../styles/global';

export const Home = () => {
  const [clientList, setClientList] = useState([]);
  const [refreshClientList, setRefreshClientList] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const getClients = async () => {
    // console.log('fetching...');
    try {
      const result = await axios.get('http://localhost:3000/clients');
      setClientList(result.data);
    } catch (error) {
      // console.log(error);
      setFetchError(true);
    }
  };

  useEffect(() => {
    getClients();
    setRefreshClientList(false);
  }, [refreshClientList]);

  const navigation = useNavigation();
  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>List of clients</Headline>
      {fetchError && (
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
                setRefreshClientList,
              })
            }
          />
        )}
      />
      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate('NewClient', {
            setRefreshClientList,
          })
        }
      />
    </View>
  );
};
