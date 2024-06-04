import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from './Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveFontSize, responsivePadding} from './Responsive';
import {useNavigation} from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductDetails = ({route}) => {
  const staticImageURL = 'https://picsum.photos/300';
  const {item} = route.params;
  console.log(item, 'Line 10');
  const [showDetails, setShowDetails] = useState('Description');
  const navigation = useNavigation();
  const descriptionPoints = [
    'High-quality corrugated cardboard construction ensures durability and protection during transit.',
    'Easy-to-assemble design saves you time and effort in packaging',
    'Available in various sizes to accommodate a wide range of products',
    'Eco-friendly and recyclable, reducing your environmental footprint',
    'Ideal for e-commerce businesses, movers, and shippers',
    'Customize with your branding for a professional and personalized touch',
  ];

  const additionalInformationData = [
    {label: 'Size in Inches', value: '7.7x4x2.5'},
    {label: 'Size in mm', value: '196x102x64'},
    {label: 'HSN Code', value: '48191010'},
    {label: 'Color', value: 'Brown'},
    {label: 'Breadth in inches', value: '4.01'},
    {label: 'Breadth in mm', value: '102'},
    {label: 'Height in inches', value: '2.50'},
    {label: 'Height in mm', value: '64'},
    {label: 'Length in inches', value: '7.72'},
    {label: 'Length in mm', value: '196'},
  ];

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      {/* header View */}
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Product Details</Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            size={responsiveFontSize(35)}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      {/* Product Image */}
      <ScrollView style={{flex: 1}}>
        <View style={styles.imageView}>
          <Image
            source={{uri: staticImageURL}}
            resizeMode="cover"
            style={styles.imageStyle}
          />
        </View>
        {/* Product Details */}
        <View style={styles.viwHolder}>
          <View style={styles.detailsHolder}>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={styles.price}>Rs.{item.price}</Text>
          </View>
          <Text style={styles.rating}>Rating : {item.rating}</Text>
        </View>
        {/* Product Details */}
        <View style={styles.productHolder}>
          <Text style={styles.productText}>Product Details</Text>
          <View style={{gap: 10, marginVertical: 10}}>
            <View style={styles.subView}>
              <Text style={styles.rating}>Brand </Text>
              <Text style={styles.textValue}>Flipkart</Text>
            </View>
            <View style={styles.subView}>
              <Text style={styles.rating}>Price per 50 pc </Text>
              <Text style={styles.textValue}>₹102 + GST 18%</Text>
            </View>
            <View style={styles.subView}>
              <Text style={styles.rating}>Pack Weight </Text>
              <Text style={styles.textValue}>4.3 kg</Text>
            </View>
            <View style={styles.subView}>
              <Text style={styles.rating}>Dimension in Inches</Text>
              <Text style={styles.textValue}>6.7x4x2</Text>
            </View>
            <View style={styles.subView}>
              <Text style={styles.rating}>Dimension in mm</Text>
              <Text style={styles.textValue}>171x102x51</Text>
            </View>
          </View>
        </View>
        {/*Product Descriptions  */}
        <View style={styles.descriptionView}>
          <TouchableOpacity
            style={[
              styles.touch,
              showDetails === 'Description' && styles.activeTab,
            ]}
            onPress={() => setShowDetails('Description')}>
            <Text style={styles.productText}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touch,
              showDetails === 'AdditionalInformation' && styles.activeTab,
            ]}
            onPress={() => setShowDetails('AdditionalInformation')}>
            <Text style={styles.productText}>Additional Information</Text>
          </TouchableOpacity>
        </View>
        {showDetails === 'Description' ? (
          <View style={{marginBottom: '20%'}}>
            {descriptionPoints.map((point, index) => (
              <Text
                key={index}
                style={{
                  color: Colors.black,
                  fontSize: responsiveFontSize(18),
                  textAlign: 'justify',
                }}>
                {'\u2022'} {point}
                {'\n'}
              </Text>
            ))}
          </View>
        ) : (
          <View style={{marginBottom: '20%'}}>
            {additionalInformationData.map(item => (
              <View style={styles.tableRow} key={item.label}>
                <Text style={styles.tableLabel}>{item.label}</Text>
                <Text style={styles.tableValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      {/* Buttom Button */}
      <View
        style={[
          styles.buttonHolder,
          {position: 'absolute', bottom: Platform.OS === 'android' ? 0 : 15},
        ]}>
        <View style={styles.unitHolder}>
          <TouchableOpacity style={styles.iconHolder}>
            <MaterialIcons
              name="add"
              size={responsiveFontSize(25)}
              color={Colors.black}
            />
          </TouchableOpacity>
          <Text style={styles.countText}>1</Text>
          <TouchableOpacity style={styles.iconHolder}>
            <MaterialCommunityIcons
              name="minus"
              size={responsiveFontSize(25)}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addView} onPress={()=>navigation.navigate('Cart')}>
          <Text style={styles.addText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

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
  imageStyle: {
    height: responsivePadding(250),
    width: responsivePadding(200),
  },
  imageView: {
    alignSelf: 'center',
    marginVertical: responsivePadding(10),
  },
  detailsHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  name: {
    color: Colors.black,
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
  },
  price: {
    color: Colors.text_grey,
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
  },
  viwHolder: {
    borderWidth: responsivePadding(1),
    width: '95%',
    alignSelf: 'center',
    padding: responsivePadding(10),
    borderRadius: responsivePadding(5),
    borderColor: Colors.text_grey,
    gap: responsivePadding(5),
    backgroundColor: Colors.white,
    elevation: 5,
  },
  rating: {
    color: Colors.text_grey,
    fontWeight: '700',
    fontSize: responsiveFontSize(18),
  },
  textValue: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    marginHorizontal: responsivePadding(10),
    fontWeight: '600',
  },
  productText: {
    color: Colors.forgetPassword,
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
  },
  productHolder: {
    borderWidth: responsivePadding(1),
    marginVertical: responsivePadding(10),
    width: '95%',
    alignSelf: 'center',
    borderRadius: responsivePadding(5),
    borderColor: Colors.text_grey,
    padding: responsivePadding(10),
    backgroundColor: Colors.white,
  },
  subView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconHolder: {
    borderWidth: 0.5,
    padding: responsivePadding(3),
    borderRadius: responsivePadding(10),
    alignItems: 'center',
    borderColor: Colors.text_grey,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  buttonHolder: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
  },
  unitHolder: {
    width: '50%',
    borderWidth: responsivePadding(2),
    padding: responsivePadding(15),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    borderColor: Colors.forgetPassword,
    backgroundColor: Colors.white,
  },
  countText: {
    color: Colors.forgetPassword,
    fontSize: responsiveFontSize(25),
  },
  addView: {
    width: '50%',
    borderWidth: responsivePadding(2),
    padding: responsivePadding(15),
    alignItems: 'center',
    backgroundColor: Colors.forgetPassword,
    borderColor: Colors.forgetPassword,
  },
  addText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(20),
  },
  descriptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsivePadding(10),
  },
  touch: {
    width: '50%',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: responsivePadding(2),
    borderColor: Colors.red,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: responsivePadding(1),
    borderColor: Colors.text_grey,
    paddingVertical: responsivePadding(10),
  },
  tableLabel: {
    color: Colors.text_grey,
    fontWeight: '700',
    fontSize: responsiveFontSize(18),
  },
  tableValue: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    marginHorizontal: responsivePadding(10),
    fontWeight: '600',
  },
});
