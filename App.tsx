import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNaviagtor } from './src/tabNavigation';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={TabNaviagtor}
                    options={{
                        headerShown: false
                    }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default App;
