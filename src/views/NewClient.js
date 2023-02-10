import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import {globalStyles} from '../styles/global';
import {useQueryClient} from '@tanstack/react-query';
import {useAddNewClient, useUpdateClient} from '../hooks/queryHooks';

export const NewClient = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [alert, setAlert] = useState(false);
  const queryClient = useQueryClient();
  const client = route.params?.client;
  const updateMutation = useUpdateClient();
  const addMutation = useAddNewClient();

  useEffect(() => {
    if (!client) {
      return;
    }
    setName(client.name);
    setPhone(client.phone);
    setEmail(client.email);
    setCompany(client.company);
  }, [client]);

  const saveClient = async () => {
    //validate
    if (name === '' || phone === '' || email === '' || company === '') {
      setAlert(true);
      return;
    }

    //generate client object
    const _client = {name, phone, email, company};

    //save to API
    if (client) {
      const {id} = client;
      _client.id = id;
      console.log('client to override:', _client);
      updateMutation.mutate(_client);
    } else {
      addMutation.mutate(_client);
    }

    navigation.navigate('Home');

    setName('');
    setPhone('');
    setEmail('');
    setCompany('');
  };

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>
        {client ? 'Edit client' : 'Add a new client'}
      </Headline>
      <TextInput
        label="Name"
        placeholder="Client name"
        onChangeText={value => setName(value)}
        style={styles.input}
        value={name}
      />
      <TextInput
        label="Phone"
        placeholder="Phone number"
        onChangeText={value => setPhone(value)}
        style={styles.input}
        value={phone}
      />
      <TextInput
        label="Email"
        placeholder="email@email.com"
        onChangeText={value => setEmail(value)}
        style={styles.input}
        value={email}
      />
      <TextInput
        label="Company"
        placeholder="Company name"
        onChangeText={value => setCompany(value)}
        style={styles.input}
        value={company}
      />
      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => saveClient()}>
        {client ? 'Save changes' : 'Save new client'}
      </Button>
      <Portal>
        <Dialog visible={alert} onDismiss={() => setAlert(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>All fields are required.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlert(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});
