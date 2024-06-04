import {Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    Alert,} from 'react-native';
import React,{useState,useEffect,useRef} from 'react';
import Colors from '../../../components/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../components/Responsive';
import {useNavigation} from '@react-navigation/native';
import AuthScreenTitle from '../../../components/AuthScreenTitle';

const EmailOtp = () => {
  const navigation = useNavigation();
  const otpLength = 6;
  const [otpArray, setOtpArray] = useState(Array(otpLength).fill(''));
  const [remainingTime, setRemainingTime] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);

  const onSubmit2  = async () => {
    navigation.navigate('UpdatePassword')
  }
  const onSubmit = async () => {
    const otp = otpArray.join('');
    if (
      otp.length === otpLength &&
      otpArray.every(element => element.trim() !== '')
    ) {
      try {
        const formData ={
          otp:otp,
          email_address:email
        }
        const response = await verifyOtp(formData);
        if (response.success) {
          Alert.alert('Success', response.message);
          navigation.replace('NewPassword', {email});
          setOtpArray(Array(otpLength).fill(''));
        } else {
          Alert.alert(
            'Error',
            response.message || 'Failed to verify OTP. Please try again.',
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
    }
  };
  const resendButton = async () => {
    Alert.alert("Resend")
  }
  const resendOtp = async () => {
    try {
      const response = await fetch(`${serverAddress}/member/forgot/password`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email_address: email}),
      });

      const responseData = await response.json();
      if (response.ok && responseData.success) {
        Alert.alert('Success', 'OTP resend successfully');
        setRemainingTime(30); 
        setShowResendButton(false); 
      } else {
        Alert.alert('Error', responseData.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };
  useEffect(() => {
    if (remainingTime <= 0) {
      setShowResendButton(true);
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const refArray = useRef(otpArray.map(() => React.createRef()));
  const handleOtpChange = (index, value) => {
    const otpCopy = [...otpArray];
    otpCopy[index] = value;
    setOtpArray(otpCopy);

    if (value && index < otpLength - 1) {
      refArray.current[index + 1].current.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !otpArray[index] && index > 0) {
      refArray.current[index - 1].current.focus();
    }
  };
  const renderInputs = () => {
    return otpArray.map((item, index) => (
      <TextInput
        key={index}
        style={styles.otpBox}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={text => handleOtpChange(index, text)}
        onKeyPress={({nativeEvent}) => handleKeyPress(index, nativeEvent.key)}
        ref={refArray.current[index]}
        value={otpArray[index]}
      />
    ));
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <ScrollView>
        {/* Header Images */}
        <View style={{alignItems:'center'}}>
          <Image
            source={require('../../../assets/image/splash.png')}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
        {/* Title and Descriptions */}
        <AuthScreenTitle
          title="OTP"
          subTitle="Please enter 6 digit email Otp!"
        />
        <View style={styles.inputContainer}>
          <View style={styles.otpContainer}>{renderInputs()}</View>
          <View style={{marginVertical: responsivePadding(20)}}>
            {showResendButton ? (
              <TouchableOpacity onPress={resendButton} style={styles.resendButton}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                Resend OTP in {remainingTime} sec
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={onSubmit2} style={{width: '80%',marginVertical:20,borderWidth:2,padding:15,alignSelf:'center',borderRadius:10,backgroundColor:Colors.inactiveButton,borderColor:Colors.inactiveButton,alignItems:'center'}}>
         <Text style={{fontSize:16,fontWeight:'600',color:Colors.white}}>Verify OTP</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailOtp;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  imageStyle: {
    height: responsivePadding(200),
    width: responsivePadding(200),
  },
  inputContainer: {
    marginVertical: responsivePadding(10),
    marginHorizontal: responsivePadding(20),
    width: '95%',
  },
  otpText: {
    fontSize: responsiveFontSize(19),
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsivePadding(20),
  },
  otpBox: {
    width: responsivePadding(40),
    height: responsivePadding(40),
    borderBottomWidth: responsivePadding(1),
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    color: Colors.black,
  },
  timerText: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: responsiveFontSize(16),
  },
  resendButton: {
    backgroundColor: Colors.border_grey,
    padding: responsivePadding(15),
    borderRadius: responsivePadding(10),
    width: '80%',
    alignSelf: 'center',
  },
  resendButtonText: {
    color: Colors.iconColor,
    textAlign: 'center',
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
});
