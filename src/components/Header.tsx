import { Heading, HStack, VStack, IconButton, useTheme, StyledProps, ScrollView } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
    title: string;
}

export function Header({title, ...rest}:Props) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    function handleGoBack() {
        navigation.goBack();
    }
    return (
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={6}
                mb={0}
                {...rest}
            >
                <IconButton icon={<CaretLeft color={colors.gray[200]}/>} size={20} onPress={handleGoBack}/>
                <Heading color="gray.100" textAlign="center" fontSize={16} flex={1} ml={-12}>
                    {title}
                </Heading>
            </HStack>

            

        
    );
}