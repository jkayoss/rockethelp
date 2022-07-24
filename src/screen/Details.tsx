import { useEffect, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { VStack, Text, HStack, useTheme, ScrollView } from 'native-base';
import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native';

import firestore from '@react-native-firebase/firestore';
import { OrderFirestoreDTO } from '../DTOs/orderDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Alert } from 'react-native';
import { Button } from '../components/Button';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const route = useRoute();
  const { orderId } = route.params as RouteParams;
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleOrderClose() {
    if(!solution) {
      return Alert.alert('Informe a solução para encerrar o chamado.');
    }

    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closedAt: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Chamado', 'chamado encerrado.');
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Erro', 'Algo deu errado, tente novamente.');
    })
  }

  useEffect(() => {
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .get()
    .then((doc) => {
      const { patrimony, description, status, createdAt, closedAt, solution } = doc.data();
      const closed = closedAt ? dateFormat(closedAt) : null;
      setOrder({
        id: doc.id,
        patrimony,
        description,
        status,
        solution,
        when: dateFormat(createdAt),
        closed
      });


      setIsLoading(false);
    })
  }, [])

  if(isLoading) {
    return  <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
        <Header title="Solicitação" />
        <HStack bg="gray.500" justifyContent="center" p={4}>
          {
            order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />

          }
          <Text
            fontSize="sm" color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]} ml={2} textTransform="uppercase"
          >
            {order.status === 'closed' ?  'Finalizado' : 'Em andamento'}
          </Text>

        </HStack>
        <ScrollView mx={5} showsVerticalScrollIndicator={false}>
          <CardDetails 
            title="equipamento"
            description={`Patrimônio ${order.patrimony}`}
            icon={DesktopTower}
            footer={order.when && `Aberto em: ${order.when}`}
          />
          <CardDetails 
            title="descrição do problema"
            description={`${order.description}`}
            icon={Clipboard}
          />
          <CardDetails 
            title="Resolução"
            icon={CircleWavyCheck}
            description={order.solution}
            footer={order.closed && `encerrado em: ${order.closed}`}
          >
            {order.status === 'open' && <Input mt={3} placeholder="Descrição da solução" onChangeText={setSolution} h={24} textAlignVertical="top" multiline/>}
          </CardDetails>
        </ScrollView>
        {
          order.status === 'open' &&  
          <Button title="Encerrar chamado" m={2} onPress={handleOrderClose}/>
        }
    </VStack>
  );
}