import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/auth/Login';
import OTP from '../screen/auth/OTP';
import SetProfile from '../screen/auth/SetProfile';
import SignUpForm from '../screen/auth/SignUpForm';
import Signup from '../screen/auth/Signup';
import Splash from '../screen/auth/Splash';
import ForgetPassword from '../screen/auth/forgetPassword/ForgetPassword';
import EmailOtp from '../screen/auth/forgetPassword/EmailOtp';
import UpdatePassword from '../screen/auth/forgetPassword/UpdatePassword';
import BottomNavigation from './BottomNavigation';
import ChekoutScreen from '../screen/app/ChekoutScreen';
import PaymentScreen from '../screen/app/PaymentScreen';
import ProductDetails from '../components/ProductDetails';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Otp' component={OTP} options={{headerShown:false}}/>
        <Stack.Screen name='Profile' component={SetProfile} options={{headerShown:false}}/>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name='Sign' component={SignUpForm} options={{headerShown:false}}/>
        <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name='forgetpassword' component={ForgetPassword} options={{headerShown:false}}/>
        <Stack.Screen name='EmailOtp' component={EmailOtp} options={{headerShown:false}}/>
        <Stack.Screen name='UpdatePassword' component={UpdatePassword} options={{headerShown:false}}/>
        <Stack.Screen name='BottomNavigation' component={BottomNavigation} options={{headerShown:false}}/>
        <Stack.Screen name='Checkout' component={ChekoutScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Payment' component={PaymentScreen} />
        <Stack.Screen name ="ProductDetilas" component={ProductDetails} options={{headerShown:false}}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})