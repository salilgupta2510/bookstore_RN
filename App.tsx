import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNaviagtor } from './src/tabNavigation';
import SearchScreen from './src/module/Search';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group>
                    <Stack.Screen
                        name="Home"
                        component={TabNaviagtor}
                        options={{
                            headerShown: false
                        }} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen
                        name="Search"
                        component={SearchScreen}
                        options={{
                            headerShown: false
                        }} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default App;
