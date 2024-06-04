import {
  Image,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
const SetProfile = () => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      {/* Header View */}
      <View style={styles.headerView}>
        <TouchableOpacity style={{padding: 10}}>
          <Ionicons
            name="arrow-back"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <View style={{width: '80%'}}>
          <Text style={styles.headertext}>Set up your profile </Text>
        </View>
      </View>
      <View style={styles.textView}>
        <Text style={styles.descriptionText}>
          This info needs to be accurate.
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image view */}
        <View style={styles.imageHolder}>
          <Image
            source={require('../../assets/image/dummy.png')}
            style={styles.imagestyle}
          />
          <TouchableOpacity>
            <Text style={styles.addImageText}>Add Image</Text>
            <View style={styles.underline} />
          </TouchableOpacity>
        </View>
        {/* First name */}
        <View style={styles.viewHolder}>
          <TextInput
            placeholder="First name"
            placeholderTextColor={Colors.text_grey}
            style={styles.input}
          />
        </View>
        <View style={styles.viewHolder}>
          <TextInput
            placeholder="Last name"
            placeholderTextColor={Colors.text_grey}
            style={styles.input}
          />
        </View>
        <View style={styles.viewHolder}>
          <TextInput
            placeholder="Date of birth"
            placeholderTextColor={Colors.text_grey}
            style={styles.input}
          />
        </View>
        <View style={styles.viewHolder}>
          <TextInput
            placeholder="Nationility"
            placeholderTextColor={Colors.text_grey}
            style={styles.input}
          />
        </View>
        <View style={styles.viewHolder}>
          <TextInput
            placeholder="Address Line 1"
            placeholderTextColor={Colors.text_grey}
            style={styles.input}
          />
        </View>
        <View style={styles.viewHolder}>
          <TextInput
            placeholder="Address Line 2"
            placeholderTextColor={Colors.text_grey}
            style={styles.input}
          />
        </View>
        <View style={styles.viewHolder}>
          <TextInput
            placeholder="City"
            placeholderTextColor={Colors.text_grey}
            style={styles.input}
          />
        </View>
        <View style={styles.viewHolder}>
          <TextInput
            placeholder="State"
            placeholderTextColor={Colors.text_grey}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.touchButton}>
          <Text
            style={styles.text}>
            NEXT
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetProfile;

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
  },
  descriptionText: {
    color: Colors.text_grey,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    textAlign: 'center',
  },
  imageHolder: {
    marginVertical: responsivePadding(25),
    width: '80%',
    marginHorizontal: responsivePadding(20),
    alignItems: 'center',
    flexDirection: 'row',
    gap: 40,
  },
  imagestyle: {
    height: responsivePadding(125),
    width: responsivePadding(125),
  },
  addImageText: {
    fontSize: responsiveFontSize(18),
    color: Colors.forgetPassword,
  },
  underline: {
    borderWidth: 1,
    backgroundColor: Colors.forgetPassword,
  },
  viewHolder: {
    borderWidth: responsivePadding(2),
    alignSelf: 'center',
    width: '90%',
    borderRadius: responsivePadding(10),
    padding: Platform.OS==='android'?responsivePadding(10):responsivePadding(20),
    marginBottom:responsivePadding(20)
  },
  input: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    marginLeft: responsivePadding(10),
  },
  touchButton: {
    borderWidth: 1,
    marginVertical: responsivePadding(20),
    width: responsivePadding(332),
    height: responsivePadding(44),
    alignSelf: 'center',
    backgroundColor: Colors.inactiveButton,
    borderRadius: responsivePadding(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.inactiveButton,
  },
  text:{
    color: Colors.white,
    fontWeight: '600',
    fontSize: responsiveFontSize(20),
  }
});
