import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../components/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import Product from '../../components/Home/Product';
const Home = () => {
  const navigation = useNavigation();
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
            style={{height: 50, width: 100}}
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
      <ScrollView>
        {/* Shop by brand */}
        <View>
          <Text style={styles.brandText}>Shop by E-COMMERCE BRANDS</Text>
          <View style={styles.imageViewHolder}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/image/ajio.webp')}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/image/flipkart.webp')}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/image/myntra.webp')}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/image/amazon.webp')}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Product title="Shop from Top Products" />
        </View>
        <View>
          <Product title="Best deals on Featured Products"/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
  brandText: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: Colors.black,
    padding: 10,
    marginHorizontal: 10,
  },
  imageViewHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    height: responsivePadding(100),
    width: responsivePadding(175),
  },
});
