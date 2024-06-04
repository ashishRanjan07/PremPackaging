import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Colors from '../../components/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
const OTP = () => {
  const otpLength = 4;
  const [otpArray, setOtpArray] = useState(Array(otpLength).fill(''));
  const [remainingTime, setRemainingTime] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);

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

  const resendOtp = async () => {
    console.log('hi');
  };

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
      <StatusBar barStyle={'default'} backgroundColor={Colors.white} />
      <View style={styles.headerView}>
        <TouchableOpacity style={{padding: 10}}>
          <Ionicons
            name="arrow-back"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <View style={{width: '80%'}}>
          <Text style={styles.headertext}>Enter Code</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header view */}

        {/* Code sent number */}
        <View style={styles.textView}>
          <Text style={styles.descriptionText}>
            Code Sent to +91 6206416452
          </Text>
        </View>
        {/* Image View */}
        <View style={styles.imageview}>
          <Image
            source={require('../../assets/image/otp.png')}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
        {/* OTP section */}
        <View style={styles.otpContainer}>{renderInputs()}</View>
        {/* Resend Button and Timer */}
        <View style={{marginVertical: responsivePadding(20)}}>
          {showResendButton ? (
            <TouchableOpacity onPress={resendOtp} style={styles.resendButton}>
              <Text style={styles.resendButtonText}>Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>
              Resend Code in {remainingTime} sec
            </Text>
          )}
        </View>
        {/* Button Verify Otp */}
        <TouchableOpacity style={styles.touchButton}>
          <Text
            style={{
              color: Colors.white,
              fontWeight: '600',
              fontSize: responsiveFontSize(20),
            }}>
            NEXT
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headertext: {
    fontSize: responsiveFontSize(20),
    color: Colors.black,
    fontWeight: '600',
  },
  textView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: responsivePadding(30),
  },
  descriptionText: {
    color: Colors.text_grey,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    textAlign: 'center',
  },
  imageview: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    marginStart: 50,
    height: responsivePadding(250),
    width: responsivePadding(200),
  },
  otpInput: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.black,
    color: Colors.black,
    width: responsivePadding(50),
    height: responsivePadding(50),
    fontSize: responsiveFontSize(20),
    textAlign: 'center',
  },
  otpBox: {
    width: responsivePadding(40),
    height: responsivePadding(45),
    borderWidth: responsivePadding(1),
    textAlign: 'center',
    fontSize: responsiveFontSize(20),
    color: Colors.black,
    borderRadius: responsivePadding(5),
    fontWeight:'700',
    alignItems:'center'
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsivePadding(20),
  },
  resendButton: {
    backgroundColor: Colors.border_grey,
    padding: responsivePadding(15),
    borderRadius: responsivePadding(10),
    width: '85%',
    alignSelf: 'center',
  },
  resendButtonText: {
    color: Colors.text_grey,
    textAlign: 'center',
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
  timerText: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: responsiveFontSize(16),
  },
  touchButton: {
    borderWidth: 1,
    marginVertical: 20,
    width: responsivePadding(332),
    height: responsivePadding(44),
    alignSelf: 'center',
    backgroundColor: Colors.inactiveButton,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.inactiveButton,
  },
});
