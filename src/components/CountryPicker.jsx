import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Colors from './Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveFontSize, responsivePadding} from './Responsive';
const CountryPicker = () => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      {/* Header View */}
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Country or Region</Text>
        <Ionicons
          name="close-sharp"
          size={responsiveFontSize(25)}
          color={Colors.black}
          style={styles.iconStyle}
        />
      </View>
      {/* Search View */}
      <View style={styles.searchholder}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.text_grey}
          style={styles.textInput}
        />
        <Ionicons
          name="search-outline"
          size={responsiveFontSize(30)}
          color={Colors.text_grey}
        />
      </View>
    </SafeAreaView>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerView: {
    marginTop: responsivePadding(10),
    padding: responsivePadding(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
    textAlign: 'center',
    width: '80%',
    fontWeight: '500',
  },
  iconStyle: {marginHorizontal: responsivePadding(20)},
  textInput: {
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    width: '85%',
  },
  searchholder: {
    borderWidth: responsivePadding(1),
    borderRadius: responsivePadding(10),
    marginVertical: responsivePadding(10),
    padding: responsivePadding(5),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor:Colors.text_grey
  },
});
