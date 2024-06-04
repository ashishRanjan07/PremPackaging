import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../components/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onsubmit = async() => {
    navigation.navigate('BottomNavigation')
  }
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <KeyboardAvoidingView
        style={{flex: 1, width: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.imageHolder}>
            <Image
              source={require('../../assets/image/splash.png')}
              style={styles.image}
            />
          </View>
          {/* Login Input sections */}
          <View style={{width: '95%'}}>
            {/* Email/phone number */}
            <View style={styles.inputHolder}>
              <Text style={styles.label}>Email/phone number</Text>
              <TextInput
                placeholder="Enter email/phone number"
                keyboardType="default"
                style={styles.textInputBox}
                placeholderTextColor={Colors.text_grey}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            {/* password */}
            <View style={styles.inputHolder}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter password"
                keyboardType="default"
                style={styles.textInputBox}
                placeholderTextColor={Colors.text_grey}
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </View>
            {/* Remember me and forget password sections */}
            <View style={styles.rememberView}>
              <TouchableOpacity style={styles.rememberTouchView}>
                <Fontisto
                  name="checkbox-passive"
                  size={responsiveFontSize(16)}
                  color={Colors.text_grey}
                />
                <Text style={styles.text}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('forgetpassword')}>
                <Text style={styles.text2}>Forget Password?</Text>
                <View style={styles.underline} />
              </TouchableOpacity>
            </View>
            {/* Button View */}
            <TouchableOpacity style={styles.buttonView} onPress={onsubmit}>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(18),
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
          {/* Don't have an account? */}
        </View>
      </KeyboardAvoidingView>
      <View style={styles.accountHolder}>
      <Text style={styles.label}>Don't have an account?{" "}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Sign')}>
        <Text style={[styles.text2, { fontSize: responsiveFontSize(16) }]}>
          Sign Up here
        </Text>
        <View style={styles.underline} />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHolder: {
    marginVertical: responsivePadding(46),
  },
  image: {
    height: responsivePadding(110),
    width: responsivePadding(201),
  },
  label: {
    color: Colors.text_grey,
    fontWeight: '600',
    fontSize: responsiveFontSize(16),
  },
  textInputBox: {
    borderWidth: 1,
    borderColor: Colors.border_color,
    borderRadius: responsivePadding(5),
    padding: responsivePadding(10),
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
  inputHolder: {
    padding: responsivePadding(10),
    gap: 5,
  },
  text2: {
    color: Colors.forgetPassword,
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
  },
  text: {
    color: Colors.text_grey,
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
  },
  rememberView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: responsivePadding(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberTouchView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonView: {
    borderWidth: responsivePadding(2),
    marginVertical: responsivePadding(20),
    width: responsivePadding(343),
    alignSelf: 'center',
    height: responsivePadding(48),
    borderRadius: responsivePadding(5),
    borderColor: Colors.forgetPassword,
    backgroundColor: Colors.forgetPassword,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {
    borderWidth: responsivePadding(1),
    borderColor: Colors.forgetPassword,
    backgroundColor: Colors.forgetPassword,
  },
  accountHolder: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:responsivePadding(20),
  },
});
