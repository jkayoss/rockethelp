import { Input as NativeInput } from 'native-base';

export function Input({...rest}) {
  return (
    <NativeInput 
        bg="gray.700"
        h={12}
        size="md"
        borderWidth={1}
        fontSize="md"
        fontFamily="body"
        color="white"
        borderColor="gray.700"
        placeholderTextColor="gray.300"
        _focus={
          {
            borderWidth: 1,
            borderColor: "green.500",
            bg: "gray.700"
          }
        }
        {...rest}
    />
  );
}