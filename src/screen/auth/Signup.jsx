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
import React, {useState} from 'react';
import Colors from '../../components/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CountryPicker} from 'react-native-country-codes-picker';

const Signup = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [selectedCountryFlag, setSelectedCountryFlag] = useState('🇮🇳');
  
  

  const showModal = async() => {
    console.log("clicked")
    setShow(true)
  }
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      {/* Header View*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <TouchableOpacity style={{padding: 10}}>
            <Ionicons
              name="arrow-back"
              size={responsiveFontSize(35)}
              color={Colors.black}
            />
          </TouchableOpacity>
          <View style={{width: '80%'}}>
            <Text style={styles.headertext}>
              Sign up with your mobile number
            </Text>
          </View>
        </View>

        <View style={styles.textView}>
          <Text style={styles.descriptionText}>
            Enter your mobile phone number, we will send you OTP to verify
            later.
          </Text>
        </View>

        {/* Image View */}
        <View style={styles.imageview}>
          <Image
            source={require('../../assets/image/signup.png')}
            resizeMode="contain"
            style={styles.imageStyle}
          />
        </View>

        {/* Mobile Number view */}
        <View style={styles.inputHolder}>
          <Text style={styles.label}>Phone number</Text>
          <View style={styles.countryPickerContainer}>
            <View style={styles.inputcontainer}>

              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:2}} onPress={showModal}>
                <Text style={styles.countryCodeText}>
                  {selectedCountryFlag} {countryCode}
                </Text>
                <Ionicons name="chevron-down" size={responsiveFontSize(16)} color={Colors.black}/>
              </TouchableOpacity>
              <TextInput
                placeholder="Enter phone number"
                keyboardType="number-pad"
                style={styles.textInputBox}
                placeholderTextColor={Colors.text_grey}
                value={mobileNo}
                onChangeText={text => setMobileNo(text)}
              />
            </View>
            <CountryPicker
              onBackdropPress={() => setShow(false)}
              style={{
                modal: {
                  flex: 0.6,
                  backgroundColor: Colors.white,
                },
                countryName: {
                  color: Colors.black,
                },
                dialCode: {
                  color: Colors.black,
                },
              }}
              show={show}
              animationType="slide"
              pickerButtonOnPress={item => {
                setCountryCode(item.dial_code);
                setShow(false);
                setSelectedCountryFlag(item.flag);
              }}
            />
          </View>
        </View>

        <View style={styles.termText}>
          <Text
            style={{
              color: Colors.term_condition,
              fontSize: responsiveFontSize(15),
              fontWeight: '400',
              padding: 2,
            }}>
            By continuing, you confirm that you are authorised to use this
            mobile number and agree to receive an SMS. Mobile network fees may
            apply.
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* Lower View */}
          <View style={{width: '85%', alignSelf: 'center'}}></View>
        </View>
      </ScrollView>

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
    </SafeAreaView>
  );
};

export default Signup;

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
  descriptionText: {
    color: Colors.text_grey,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    textAlign: 'center',
  },
  imageview: {
    marginVertical: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageStyle: {
    height: responsivePadding(250),
    width: responsivePadding(200),
  },
  textView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: responsivePadding(30),
  },
  label: {
    color: Colors.text_grey,
    fontWeight: '600',
    fontSize: responsiveFontSize(16),
  },
  textInputBox: {
    padding: responsivePadding(10),
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    width: '80%',
    borderLeftWidth:2,
    borderColor:Colors.text_grey,
    paddingLeft:responsivePadding(15)
  },
  inputHolder: {
    padding: responsivePadding(10),
    gap: 10,
    width: '95%',
    alignSelf: 'center',
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
  termText: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    padding: 5,
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  countryCodeText: {
    marginStart: 10,
    color: Colors.black,
    fontWeight: '600',
    fontSize: responsiveFontSize(16),
  },
  inputcontainer: {
    borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.border_color,
    borderRadius: responsivePadding(5),
    gap: 5,
  },
});
