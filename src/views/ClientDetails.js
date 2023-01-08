import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';
import {globalStyles} from '../styles/global';
import axios from 'axios';

export const ClientDetails = ({navigation, route}) => {
  const {id, name, phone, email, company} = route.params.item;
  const {setRefreshClientList} = route.params;

  const showConfirm = () => {
    Alert.alert(
      'Do you wish to delete this client?',
      'This action cannot be reversed',
      [
        {text: 'Yes, delete it', onPress: () => deleteClient()},
        {text: 'Cancel', style: 'cancel'},
      ],
    );
  };

  const deleteClient = async () => {
    const url = `http://localhost:3000/clients/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Home');
    setRefreshClientList(true);
  };

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>{name}</Headline>
      <Text style={styles.text}>
        Company:<Subheading>{company}</Subheading>
      </Text>
      <Text style={styles.text}>
        Phone:<Subheading>{phone}</Subheading>
      </Text>
      <Text style={styles.text}>
        Email:<Subheading>{email}</Subheading>
      </Text>
      <Button
        style={styles.btn}
        mode="contained"
        icon="cancel"
        onPress={() => showConfirm()}>
        Delete client
      </Button>
      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate('NewClient', {
            client: route.params.item,
            setRefreshClientList,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
  btn: {
    marginTop: 100,
  },
});
