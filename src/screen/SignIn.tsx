import { useState } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Alert } from 'react-native';
import Logo from '../assets/logo_primary.svg';
import { Envelope, Key } from 'phosphor-react-native'
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import auth from '@react-native-firebase/auth';

export function SignIn() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false); 
    function handleSignIn() {
        if(!email || !password) {
            return Alert.alert('Entrar', 'Informe e-mail e senha!');
        }
        setIsLoading(true);
        auth().signInWithEmailAndPassword(email,password)
        .catch((error) => {
            Alert.alert('Erro', 'Algo está errado! Tente novamente.');
            setIsLoading(false);
        }) 
        console.log(email, password);
    }
    const { colors } = useTheme();
    return(
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            <Heading color="gray.100" fontSize="xl" mt={8} mb={4}>
                Faça Login
            </Heading>
            <Input 
                placeholder="E-mail"
                mb={2}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4} />}
                onChangeText={setEmail}
            />
            <Input 
                placeholder="Senha"
                InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4} />}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Entrar" mt={4} w="full" onPress={handleSignIn} isLoading={isLoading}/>
        </VStack> 
    )
}