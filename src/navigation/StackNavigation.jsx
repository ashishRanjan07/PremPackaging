import { StyleSheet} from 'react-native'
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
import UpdatePassword from '../screen/auth/forgetPassword/UpdatePassword';
import BottomNavigation from './BottomNavigation';
import ChekoutScreen from '../screen/app/ChekoutScreen';
import PaymentScreen from '../screen/app/PaymentScreen';
import DrawerNavigation from './DrawerNavigation';
import Cart from '../screen/app/Cart';
import OrderDetails from '../components/Profile/OrderDetails';
import Favourite from '../screen/app/Favourite';
import CategoryDetails from '../components/Home/categoryDetails';
import FilterScreen from '../components/Home/FilterScreen';
import AddAddress from '../components/Profile/AddAddress';
import SuccessPage from '../components/General/SuccessPage';
import CategoryDetailsTwo from '../components/Home/CategoryDetailsTwo';
import ShippingDetails from '../components/Profile/ShippingDetails';
import Wishlist from '../components/Profile/Wishlist';
import MyOrders from '../components/Profile/MyOrders';
import PersonalDetails from '../components/Profile/PersonalDetails';
import ShowAddressPage from '../components/showAddresspage';
import SelectAddress from '../components/selectAddress';
// import ProductDetails from '../components/Home/ProductDetails';
import ProductDetails from '../components/ProductDetails';
import SuccessScreen from '../screen/auth/SuccessScreen';
import CustomForm from '../screen/app/CustomForm';

const Stack = createStackNavigator();

const StackNavigation = () => {

  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash' screenOptions={{
      headerShown:false
    }}>
        <Stack.Screen name='Drawer' component={DrawerNavigation} options={{headerShown:false}}/>
        <Stack.Screen name='Otp' component={OTP} options={{headerShown:false}}/>
        <Stack.Screen name='Profile' component={SetProfile} options={{headerShown:false}}/>
        <Stack.Screen name='SignUp' component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login}  options={{headerShown:false}}/>
        <Stack.Screen name='SuccessScreen' component={SuccessScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Sign' component={SignUpForm} options={{headerShown:false}}/>
        <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name='forgetPassword' component={ForgetPassword} options={{headerShown:false}}/>
        <Stack.Screen name='UpdatePassword' component={UpdatePassword} options={{headerShown:false}}/>
        <Stack.Screen name='BottomNavigation' component={BottomNavigation} options={{headerShown:false}}/>
        <Stack.Screen name='Checkout' component={ChekoutScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Payment' component={PaymentScreen} />
        <Stack.Screen name='Cart' component={Cart}/>
        <Stack.Screen name ="ProductDetails" component={ProductDetails} options={{headerShown:false}}/>
        <Stack.Screen name='OrderDetails' component={OrderDetails} options={{headerShown:false}}/>
        <Stack.Screen name='Wishlist' component={Favourite} options={{headerShown:false}}/>
        <Stack.Screen name='CategoryDetails' component={CategoryDetails} options={{headerShown:false}}/>
        <Stack.Screen name='Filter' component={FilterScreen} options={{headerShown:false}}/>
        <Stack.Screen name='AddAddress' component={AddAddress} options={{headerShown:false}}/>
        <Stack.Screen name='SuccessPage' component={SuccessPage} options={{headerShown:false}}/>
        <Stack.Screen name='CategoryDetailsTwo' component={CategoryDetailsTwo} options={{headerShown:false}}/>
        <Stack.Screen name='Shipping Address' component={ShippingDetails} options={{headerShown:false}}/>
        <Stack.Screen name='WishList2' component={Wishlist} options={{headerShown:false}}/>
        <Stack.Screen name='My Order' component={MyOrders} options={{headerShown:false}}/>
        <Stack.Screen name='PersonalDetails' component={PersonalDetails} options={{headerShown:false}}/>
        <Stack.Screen name='Show Address' component={ShowAddressPage} options={{headerShown:false}}/>
        <Stack.Screen name='Final Review' component={SelectAddress} options={{headerShown:false}}/>
        <Stack.Screen name='Custom Form' component={CustomForm} options={{headerShown:true}}/>
      
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})