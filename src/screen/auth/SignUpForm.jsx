import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../components/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import { useNavigation } from '@react-navigation/native';

const SignUpForm = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Create Account</Text>
        <View>
          <View style={styles.view}>
            <Text style={styles.labelText}>First Name*</Text>
            <TextInput
              placeholder="John"
              style={styles.inputbox}
              placeholderTextColor={Colors.text_grey}
            />
          </View>
          <View style={styles.view}>
            <Text style={styles.labelText}>Last Name*</Text>
            <TextInput
              placeholder="John"
              style={styles.inputbox}
              placeholderTextColor={Colors.text_grey}
            />
          </View>
          <View style={styles.view}>
            <Text style={styles.labelText}>Phone number*</Text>
            <TextInput
              placeholder="1234567890"
              style={styles.inputbox}
              maxLength={10}
              placeholderTextColor={Colors.text_grey}
            />
          </View>

          <View style={styles.view}>
            <Text style={styles.labelText}>Email*</Text>
            <TextInput
              placeholder="john@gmail.com"
              style={styles.inputbox}
              maxLength={10}
              placeholderTextColor={Colors.text_grey}
            />
          </View>

          <View style={styles.view}>
            <Text style={styles.labelText}>Password*</Text>
            <TextInput
              placeholder="Enter password"
              style={styles.inputbox}
              maxLength={10}
              secureTextEntry
              placeholderTextColor={Colors.text_grey}
            />
          </View>

          <View style={styles.view}>
            <Text style={styles.labelText}>Re- enter Password*</Text>
            <TextInput
              placeholder="Please re-enter the password"
              style={styles.inputbox}
              maxLength={10}
              secureTextEntry
              placeholderTextColor={Colors.text_grey}
            />
          </View>
          <TouchableOpacity style={styles.touchButton}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>

          <View style={styles.accountHolder}>
      <Text style={styles.label}>Already have an account?{" "}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.text2, { fontSize: responsiveFontSize(16) }]}>
          Login
        </Text>
        <View style={styles.underline} />
      </TouchableOpacity>
    </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerText: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.black,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
    borderColor: Colors.text_grey,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  view: {gap: 10, marginBottom: 10},
  labelText: {
    fontWeight: '600',
    fontSize: responsiveFontSize(18),
    color: Colors.black,
  },
  inputbox: {
    borderWidth: 1,
    borderColor: Colors.text_grey,
    borderRadius: 10,
    padding: Platform.OS === 'ios' ? 15 : 10,
    color: Colors.black,
    fontWeight: '600',
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
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: responsiveFontSize(20),
  },
  accountHolder: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:responsivePadding(20),
  },
  underline: {
    borderWidth: responsivePadding(1),
    borderColor: Colors.forgetPassword,
    backgroundColor: Colors.forgetPassword,
  },
  text2: {
    color: Colors.forgetPassword,
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
  },
  label: {
    color: Colors.text_grey,
    fontWeight: '600',
    fontSize: responsiveFontSize(16),
  },
});
