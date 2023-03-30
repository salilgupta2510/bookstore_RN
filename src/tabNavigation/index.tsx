import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';
import ListingScreen from '../module/Listing';
import { hp, spV, wp } from '../utils/normalize';

const Tab = createBottomTabNavigator();

export const TabNaviagtor = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false
    }}>
      <Tab.Screen
        name="Explore"
        component={ListingScreen}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          tabBarStyle: styles.tabBarCustomStyle ,
          tabBarIcon: () => (
            <View style={styles.tabBarIconContainer}>
              <Image style={styles.tabBarImage} source={require('../../assets/bottomBar/explore.png')} />
              <Text style={styles.tabBarLable}>{`Explore`}</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create ({
  headerTitleStyle: {color: '#2c3e50'},
  tabBarCustomStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0
  },
  tabBarIconContainer: { alignItems: 'center', justifyContent: 'space-between', marginTop: spV(10)},
  tabBarImage: { width: 20, height: 20, tintColor: '#2c3e50' },
  tabBarLable: { fontWeight: '600', color: '#2c3e50', marginTop: spV(5)}

})