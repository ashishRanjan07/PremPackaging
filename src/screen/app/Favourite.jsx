import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import Colors from '../../components/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import Data from '../../assets/dummyjson/topProduct.json';
import { useNavigation } from '@react-navigation/core';
const Favourite = () => {
  const navigation = useNavigation();
  const staticImageURL = 'https://picsum.photos/300';
  const deviceWidth = Dimensions.get('window').width;
  const productsPerRow = deviceWidth < 600 ? 2 : 4;
  const containerWidth = (deviceWidth - responsivePadding(30)) / productsPerRow;

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetilas',{item:item})}
        key={item.id}
        style={[styles.productContainer, {width: containerWidth}]}>
        <Image source={{uri: staticImageURL}} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
        <Text style={styles.productRating}>Rating: {item.rating}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      {/* Header View */}
      <View style={styles.headerView}>
        <TouchableOpacity>
          <Ionicons
            name="menu"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <View>
          <Image
            source={require('../../assets/image/splash.png')}
            style={{
              height: responsivePadding(50),
              width: responsivePadding(100),
            }}
          />
        </View>
        <TouchableOpacity>
          <Ionicons
            name="search"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      {/* Favourites Product Listed Below  */}
      <View style={{alignSelf: 'center', flex: 1}}>
        <FlatList
          data={Data.top_products}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={'2'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerView: {
    padding: responsivePadding(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.black,
    fontSize: responsiveFontSize(20),
    fontWeight: '600',
  },
  scrollView: {
    paddingHorizontal: responsivePadding(10),
    borderWidth: 2,
  },
  productContainer: {
    borderWidth: responsivePadding(1),
    width: responsivePadding(200), // Set the width of each product container
    marginRight: responsivePadding(10),
    borderRadius: responsivePadding(5),
    overflow: 'hidden',
    // height:'92%',
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: responsivePadding(10),
    borderColor: Colors.text_grey,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: responsivePadding(120), // Set an appropriate height for your images
    resizeMode: 'cover',
    borderRadius: responsivePadding(5),
  },
  productName: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    marginVertical: responsivePadding(5),
    paddingHorizontal: responsivePadding(5),
    color: Colors.black,
  },
  productPrice: {
    fontSize: responsiveFontSize(14),
    color: Colors.forgetPassword,
    paddingHorizontal: responsivePadding(5),
  },
  productRating: {
    fontSize: responsiveFontSize(14),
    color: Colors.text_grey,
    paddingHorizontal: responsivePadding(5),
  },
});
