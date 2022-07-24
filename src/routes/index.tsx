import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { SignIn } from '../screen/SignIn';
import { AppRoutes } from './app.routes';
import { useState, useEffect } from 'react';

export function Routes() {
    const [loading, setIsLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    useEffect(() => {
        const subscriber = auth()
        .onAuthStateChanged(response => {
            setUser(response);
            setIsLoading(false);
        })
        return subscriber;
    }, []);

    return(
        <NavigationContainer>
            {user ? <AppRoutes/> : <SignIn/>}
        </NavigationContainer>
    )
}