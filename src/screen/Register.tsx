import { VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if(!patrimony || !description) {
      return Alert.alert('Solicitação', 'Patrimônio e Descrição são obrigatórios.')
    }
    setIsLoading(true);
    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      createdAt: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Chamado aberto com sucesso!');
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      return Alert.alert('Erro', 'Ocorreu um erro ao abrir o chamado, tente novamente');
    })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
        <Header title="Nova Solicitação"/>
        <Input 
            placeholder="Numero do patrimônio"
            onChangeText={setPatrimony}
        />
        <Input 
            placeholder="Descrição do chamado"
            flex={1}
            mt={3}
            multiline
            textAlignVertical="top"
            onChangeText={setDescription}
        />
        <Button 
            mt={3}
            title="Cadastrar"
            isLoading={isLoading}
            onPress={handleNewOrderRegister}
        />
    </VStack>
  );
}