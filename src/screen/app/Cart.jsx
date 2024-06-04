import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../components/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import Data from '../../assets/dummyjson/cartProduct.json';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const staticImageURL = 'https://picsum.photos/300';
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <View style={styles.cartHolder}>
        <View style={styles.cartViewHolder}>
          {/* details View */}
          <View style={styles.detailsviewHolder}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <AntDesign
                name="star"
                size={responsiveFontSize(20)}
                color={Colors.black}
              />
              <Text
                style={
                  styles.rating
                }>{` ${item.rating} (${item.reviewCount} reviews)`}</Text>
            </View>

            <Text style={styles.price}>{`Rs.${item.price}`}</Text>
          </View>

          <View style={styles.countView}>
            <TouchableOpacity style={styles.iconHolder}>
              <MaterialIcons
                name="add"
                size={responsiveFontSize(16)}
                color={Colors.black}
              />
            </TouchableOpacity>
            <Text style={{color: Colors.black}}>Count</Text>
            <TouchableOpacity style={styles.iconHolder}>
              <MaterialCommunityIcons
                name="minus"
                size={responsiveFontSize(16)}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>
          {/* Product Images */}
          <View style={styles.cartImageHolder}>
            <Image
              source={{uri: staticImageURL}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      {/* Header View */}
      <View style={styles.headerView}>
        <TouchableOpacity>
          <Ionicons
            name="arrow-back"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Cart</Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      {/* Cart Item  */}
      <View style={{width: '95%', alignSelf: 'center', flex: 0.6}}>
        <FlatList
          data={Data?.recentlyVisitedProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      {/* Price Section */}
      <View style={styles.priceHolder}>
        <View style={styles.view}>
          <Text style={styles.text}>Selected Item:</Text>
          <Text style={styles.textValue}>3</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Subtotal:</Text>
          <Text style={styles.textValue}>Rs. 5899.00</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Discount (20%) :</Text>
          <Text style={styles.textValue}>200.00</Text>
        </View>
        <View style={{borderWidth: 1, borderColor: Colors.text_grey}} />
        <View style={styles.view}>
          <Text style={styles.text}>Total:</Text>
          <Text style={styles.textValue}>5699.00</Text>
        </View>
      </View>
      {/* CheckOut Button */}
      <TouchableOpacity style={styles.buttonView} onPress={()=> navigation.navigate('Checkout')}>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerView: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.black,
    fontSize: responsiveFontSize(20),
    fontWeight: '600',
  },
  cartHolder: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  cartViewHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsviewHolder: {
    width: '50%',
    gap: 5,
  },
  name: {
    color: Colors.black,
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
  },
  rating: {
    color: Colors.text_grey,
    fontSize: responsiveFontSize(15),
    fontWeight: '500',
  },
  price: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  cartImageHolder: {
    width: '35%',
    alignItems: 'center',
  },
  image: {
    height: responsivePadding(120),
    width: '80%',
    borderRadius: 10,
  },
  countView: {
    width: '10%',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
  },
  iconHolder: {
    borderWidth: 0.5,
    padding: 3,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: Colors.text_grey,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  buttonView: {
    borderWidth: responsivePadding(2),
    width: responsivePadding(343),
    alignSelf: 'center',
    height: responsivePadding(48),
    borderRadius: responsivePadding(5),
    borderColor: Colors.forgetPassword,
    backgroundColor: Colors.forgetPassword,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  checkoutText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: responsiveFontSize(18),
  },
  priceHolder: {
    borderWidth: 1,
    borderColor: Colors.text_grey,
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Colors.white,
    flex: 0.3,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    color: Colors.text_grey,
  },
  textValue: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    marginHorizontal: 10,
    fontWeight: '600',
  },
});
