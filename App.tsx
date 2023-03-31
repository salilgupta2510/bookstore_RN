import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNaviagtor } from './src/tabNavigation';
import SearchScreen from './src/module/Search';
import { fp } from './src/utils/normalize';

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
                        options={({navigation}) => ({
                            headerTitle: 'Book Search',
                            headerTitleStyle: styles.heading,
                            headerStyle: { backgroundColor: '#C2C7D5'},
                            headerLeft: () => (
                                <Pressable  
                                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                                    onPress={() => navigation.pop()}>
                                    <Image source={require('./assets/common/cross_lightGray_icon.png')} />
                                </Pressable>
                            )
                        })} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default App;


const styles = StyleSheet.create({
    heading: { 
        fontSize: fp(16), 
        fontWeight: '600', 
        color: '#2c3e50', 
    }
})