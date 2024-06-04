import {
    StyleSheet,
    Image,
    TextInput,
    View,
    Text,
    Platform,
    SafeAreaView,
    ActivityIndicator,
    KeyboardAvoidingView,
    StatusBar,
    Touchable,
    TouchableOpacity,
    ScrollView
  } from 'react-native';
  import React, {useEffect, useState} from 'react';

import { useNavigation } from '@react-navigation/native';
import AuthScreenTitle from '../../../components/AuthScreenTitle';
import Colors from '../../../components/Colors';
import { responsiveFontSize, responsivePadding } from '../../../components/Responsive';

const ForgetPassword = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = email => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  useEffect(() => {
    if(email.length===0) {
      setErrorText('')
    }
  },[email])

  const handleSubmit2 = async() => {
    navigation.navigate('EmailOtp')
  }
  const handleSubmit = async () => {
    if(email.trim()===''){
      setErrorText("Email address is required");
      return;
    }
    if (validateEmail(email)) {
      setErrorText('');
      setIsLoading(true);
          
      try {
        const formData = {
          email_address: email,
        };
        // console.log(formData, 'Line 53');
        const response = await sendOtp(formData);
        // console.log(response, 'Line 51');
        setIsLoading(false);
        if (response.success) {
          navigation.replace('OTP', {email: email});
          // console.log('Otp Sent suceessfully Line 54');
        } else {
          setErrorText(response.errorMessage);
        }
      } catch (error) {
        setErrorText('An error occurred. Please try again.');
        // console.log('Error:', error);
      }
    } else {
      setErrorText('Please enter a valid email address');
    }
  };


  return (
    <SafeAreaView style={styles.main}>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
        <ScrollView>
      {/* Header Images */}
      <View>
        <Image
          source={require('../../../assets/image/splash.png')}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>
      {/* Title  */}
      <AuthScreenTitle
        title="Forgot Password"
        subTitle="Don't Worry we will help you out!"
      />
      {/* Email address textinput field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          placeholder="Registered email address"
          placeholderTextColor={Colors.text_grey}
        />
        {errorText && errorText.length > 0 && (
          <Text style={styles.errorText}>{errorText}</Text>
        )}
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text>Please wait...</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleSubmit2} style={{width: '80%',marginVertical:20,borderWidth:2,padding:15,alignSelf:'center',borderRadius:10,backgroundColor:Colors.inactiveButton,borderColor:Colors.inactiveButton,alignItems:'center'}}>
         <Text style={{fontSize:16,fontWeight:'600',color:Colors.white}}>Send OTP</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
    </SafeAreaView>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:Colors.white
    },
    imageStyle: {
        alignSelf: 'center',
        height: responsivePadding(300),
        width: responsivePadding(300),
        borderRadius: responsivePadding(30),
      },
      container: {
        // height: Dimensions.get('screen').height,
        backgroundColor: Colors.white,
      },
      inputContainer: {
        width: '90%',
        marginVertical: responsivePadding(10),
        marginHorizontal: responsivePadding(20),
      },
      inputStyle: {
        letterSpacing: 0.7,
        backgroundColor: Colors.backGround_grey,
        padding:
          Platform.OS === 'ios' ? responsivePadding(20) : responsivePadding(15),
        borderRadius: responsivePadding(10),
        borderWidth: responsivePadding(1.5),
        borderColor: Colors.border_grey,
        fontWeight: '500',
        color: Colors.black,
      },
      loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: responsivePadding(2),
        width: '90%',
        alignSelf: 'center',
        padding: responsivePadding(5),
        borderRadius: responsivePadding(10),
        gap: 15,
        backgroundColor: Colors.border_grey,
        borderColor: Colors.border_grey,
      },
      errorText: {
        color: 'red',
        marginTop: responsivePadding(5),
      },
      text: {
        color: Colors.iconColor,
        fontSize: responsiveFontSize(16),
        fontWeight: '500',
      },
})