import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/app/Home';
import Favourite from '../screen/app/Favourite';
import Cart from '../screen/app/Cart';
import Profile from '../screen/app/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../components/Colors';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {

    return (
        <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.black, 
        tabBarStyle: {
          borderTopWidth: 2,
          backgroundColor: Colors.border_grey,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="home"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="heart-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cart-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="user"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
      );
};

export default BottomNavigation;

const styles = StyleSheet.create({
    activeIcon: {
        // Add any styles you want for the active icon
        // For example, you can add a different color or scale effect.
        color: 'blue',
      },
});
