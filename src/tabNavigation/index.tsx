import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BookDetails from '../module/Details';
import ListingScreen from '../module/Listing';
import { fp, hp, spH, spV, wp } from '../utils/normalize';

const Tab = createBottomTabNavigator();

export const TabNaviagtor = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false
    }}>
      <Tab.Screen
        name="Explore"
        component={ListingScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Pressable style={styles.headerRightContainer} onPress={() => navigation.navigate('Search')}>
              <Image style={styles.headerRightImage} source={require('../../assets/common/search-category-icon.png')} />
              <Text style={styles.headerRightText}>Search</Text>
            </Pressable>
          ),
          headerTitleStyle: styles.headerTitleStyle,
          tabBarStyle: styles.tabBarCustomStyle,
          tabBarIcon: () => (
            <View style={styles.tabBarIconContainer}>
              <Image style={styles.tabBarImage} source={require('../../assets/bottomBar/explore.png')} />
              <Text style={styles.tabBarLable}>{`Explore`}</Text>
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleStyle: { color: '#2c3e50' },
  tabBarCustomStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0
  },
  tabBarIconContainer: { 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: spV(10) 
  },
  tabBarImage: { 
    width: 20, 
    height: 20, 
    tintColor: '#2c3e50' 
  },
  tabBarLable: { 
    fontWeight: '600', 
    color: '#2c3e50', 
    marginTop: spV(5) 
  },
  headerRightContainer: { 
    marginRight: spH(20), 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  headerRightImage: {
    tintColor: '#2c3e50',
     width: 20, 
     height: 20 
    },
  headerRightText: { 
    fontSize: fp(12), 
    marginLeft: spH(5), 
    fontWeight: '600', 
    color:'#2c3e50' 
  }
})