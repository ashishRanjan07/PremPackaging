import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../components/Colors';
import Data from '../../assets/dummyjson/cartProduct.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import {useNavigation} from '@react-navigation/native';

const ChekoutScreen = () => {
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Checkout</Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      {/* Location */}
      <TouchableOpacity style={styles.locationHolder}>
        <View style={styles.locationView}>
          <View style={{width: '10%'}}>
            <Ionicons
              name="location-outline"
              size={responsiveFontSize(30)}
              color={Colors.text_grey}
            />
          </View>
          <View style={{width: '70%'}}>
            <Text style={styles.text}>Bairiya Patna</Text>
            <Text style={{color: Colors.text_grey}}>
              Village - Bairiya,Near by Durga Mandir Patna Bihar 800007
            </Text>
          </View>
          <View style={{width: '10%'}}>
            <Feather
              name="chevron-right"
              size={responsiveFontSize(30)}
              color={Colors.text_grey}
            />
          </View>
        </View>
      </TouchableOpacity>
      {/* Your Order Section */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <Text style={styles.text}>Your Order</Text>
          {Data?.recentlyVisitedProducts.map(item => (
            <View style={styles.cartHolder} key={item.id}>
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
          ))}
        </View>
        {/* Calculate Carges */}
        <View style={styles.locationHolder}>
          <Text style={styles.text1}>Calculate Fright Charges</Text>
          <View style={styles.view1}>
            <View style={{width: '45%'}}>
              <TextInput
                placeholder="Pin Code"
                placeholderTextColor={Colors.text_grey}
                style={styles.textInput}
              />
            </View>
            <View style={styles.view2}>
              <TouchableOpacity style={styles.touch}>
                <Text style={styles.checkoutText}>Shipping Coast</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Summary */}
        {/* Price Section */}
      <View style={styles.locationHolder}>
      <Text style={styles.text1}>Summary</Text>
        <View style={styles.view}>
          <Text style={styles.text}>Payment Method:</Text>
          <Text style={styles.textValue}>Cash On Delivery</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>GST 18%:</Text>
          <Text style={styles.textValue}>Rs. 5899.00</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Delivery Fee :</Text>
          <Text style={styles.textValue}>Rs.200.00</Text>
        </View>
        <View style={{borderWidth: 1, borderColor: Colors.text_grey}} />
        <View style={styles.view}>
          <Text style={styles.text}>Total Coast:</Text>
          <Text style={styles.textValue}>Rs.5699.00</Text>
        </View>
      </View>
      {/* Pay Now */}
      <TouchableOpacity style={styles.buttonView} onPress={()=> navigation.navigate('Payment')}>
        <Text style={styles.checkoutText}>Pay Now</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChekoutScreen;

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
  locationHolder: {
    borderWidth: responsivePadding(1),
    borderColor: Colors.text_grey,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(5),
    width: '95%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    elevation: 3,
    marginVertical: responsivePadding(10),
  },
  locationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: Colors.black,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
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
    width: '70%',
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
  buttonView: {
    borderWidth: responsivePadding(2),
    width: '90%',
    marginVertical: responsivePadding(20),
    alignSelf: 'center',
    height: responsivePadding(48),
    borderRadius: responsivePadding(5),
    borderColor: Colors.forgetPassword,
    backgroundColor: Colors.forgetPassword,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  checkoutText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: responsiveFontSize(18),
  },
  text1: {
    color: Colors.forgetPassword,
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  view1: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.black,
    borderColor: Colors.text_grey,
    paddingHorizontal: 10,
  },
  view2: {
    borderWidth: 2,
    width: '45%',
    height: '100%',
    backgroundColor: Colors.forgetPassword,
    borderRadius: 10,
    alignItems: 'center',
  },
  touch: {
    backgroundColor: Colors.forgetPassword,
    alignItems: 'center',
    marginVertical: 10,
  },
});
