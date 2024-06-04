import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../components/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Data from '../../assets/dummyjson/RecentlyVisitedProduct.json';

const Profile = () => {
  const staticImageURL = 'https://picsum.photos/300';
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Hey! User</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.boxholder}>
          <TouchableOpacity style={styles.touchbox}>
            <AntDesign
              name="CodeSandbox"
              size={responsiveFontSize(35)}
              color={'blue'}
            />
            <Text style={styles.boxText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchbox}>
            <AntDesign
              name="hearto"
              size={responsiveFontSize(35)}
              color={'blue'}
            />
            <Text style={styles.boxText}>Wishlist</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxholder}>
          <TouchableOpacity style={styles.touchbox}>
            <AntDesign
              name="gift"
              size={responsiveFontSize(35)}
              color={'blue'}
            />
            <Text style={styles.boxText}>Coupons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchbox}>
            <MaterialCommunityIcons
              name="headset"
              size={responsiveFontSize(35)}
              color={'blue'}
            />
            <Text style={styles.boxText}>Help Center</Text>
          </TouchableOpacity>
        </View>
        {/* Account Setting */}
        <View style={styles.accountView}>
          <Text style={styles.text}>Account Settings</Text>
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.viewHolder}>
              <Feather
                name="user"
                size={responsiveFontSize(30)}
                color={'blue'}
              />
              <Text style={styles.accountText}>Edit Profile</Text>
            </View>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(25)}
              color={Colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.viewHolder}>
              <Feather
                name="credit-card"
                size={responsiveFontSize(30)}
                color={'blue'}
              />
              <Text style={styles.accountText}>Save Cards & Wallet</Text>
            </View>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(25)}
              color={Colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.viewHolder}>
              <Ionicons
                name="location-outline"
                size={responsiveFontSize(30)}
                color={'blue'}
              />
              <Text style={styles.accountText}>Save Address</Text>
            </View>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(25)}
              color={Colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.viewHolder}>
              <Feather
                name="bell"
                size={responsiveFontSize(30)}
                color={'blue'}
              />
              <Text style={styles.accountText}>Notification Settings</Text>
            </View>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(25)}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
        {/* Recently View Products */}
        <View style={styles.accountView}>
          <Text style={styles.text}>Recently Viewed Products</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productScrollView}>
            {Data.recentlyVisitedProducts.map(item => (
              <TouchableOpacity key={item.id} style={styles.productItem}>
                <Image
                  source={{uri: staticImageURL}}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* My Activity */}
        <View style={styles.accountView}>
          <Text style={styles.text}>My Activity</Text>
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.viewHolder}>
              <Feather
                name="edit"
                size={responsiveFontSize(30)}
                color={'blue'}
              />
              <Text style={styles.accountText}>Review</Text>
            </View>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(25)}
              color={Colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.viewHolder}>
              <MaterialIcons
                name="question-answer"
                size={responsiveFontSize(30)}
                color={'blue'}
              />
              <Text style={styles.accountText}>Questions & Answers</Text>
            </View>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(25)}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
        {/* Logout Section */}
        <TouchableOpacity style={styles.touchLogout}>
          <FontAwesome
            name="sign-out"
            size={responsiveFontSize(30)}
            color={Colors.red}
          />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerView: {
    width: '95%',
    alignSelf: 'center',
    padding: responsivePadding(10),
  },
  headerText: {
    fontSize: responsiveFontSize(20),
    fontWeight: '600',
    color: Colors.black,
  },
  scrollView: {
    width: '95%',
    alignSelf: 'center',
  },
  boxholder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: responsivePadding(5),
  },
  touchbox: {
    flexDirection: 'row',
    gap: 5,
    width: '45%',
    alignItems: 'center',
    borderWidth: responsivePadding(1),
    padding: responsivePadding(5),
    borderRadius: responsivePadding(5),
    borderColor: Colors.text_grey,
  },
  boxText: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
    fontWeight: '600',
  },
  accountView: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsivePadding(10),
  },
  text: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    padding: responsivePadding(10),
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsivePadding(10),
    borderWidth:responsivePadding(2),
    marginVertical:responsivePadding(5),
    borderRadius:responsivePadding(5),
    borderColor:Colors.text_grey
  },
  viewHolder: {
    width: '80%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  accountText: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: responsiveFontSize(18),
  },
  productImage: {
    height: responsivePadding(120),
    width: responsivePadding(120),
    borderRadius: responsivePadding(10),
  },
  productName: {
    marginTop: responsivePadding(5),
    fontSize: responsiveFontSize(16),
    color: Colors.black,
    fontWeight: '500',
  },
  productItem: {
    flexDirection: 'column',
    gap: 10,
    marginRight: responsivePadding(10),
    alignItems: 'center',
  },
  productScrollView: {
    marginVertical: responsivePadding(10),
  },
  touchLogout: {
    borderWidth: responsivePadding(1),
    padding: responsivePadding(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width:'95%',
    elevation: responsivePadding(3),
    backgroundColor: Colors.white,
    borderRadius: responsivePadding(5),
    borderColor: Colors.text_grey,
    marginVertical: responsivePadding(5),
    alignSelf:'center'
  },
  logoutText: {
    fontSize: responsiveFontSize(24),
    color: Colors.black,
  },
});
