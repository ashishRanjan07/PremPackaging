import { Image, SafeAreaView, StatusBar, StyleSheet, View,Platform } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../components/Colors'
import { responsivePadding } from '../../components/Responsive'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
 const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.main}>
        <StatusBar barStyle={"default"} backgroundColor={Colors.white}/>
     <View>
        <Image source={require('../../assets/image/splash.png')} style={{height:responsivePadding(176),width:responsivePadding(307)}}/>
     </View>
    </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:Colors.white,
        justifyContent:'center',
        alignItems:'center'
    }
})