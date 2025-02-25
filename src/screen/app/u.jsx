import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Colors from '../../components/Colors';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../components/Responsive';
import Product from '../../components/Home/Product';
import Categories from '../../components/Home/categories';
import Data from '../../assets/dummyjson/topProduct.json';
import {
  UserCircleIcon as UserOutline,
  ShoppingCartIcon as CartOutline,
  HeartIcon,
} from 'react-native-heroicons/outline';
import {HeartIcon as HeartSolid} from 'react-native-heroicons/solid';
import Brands from '../../components/Home/brands';
import PopularProducts from '../../components/Home/popularProducts';
import {products} from '../../assets/dummyjson/products';
import ProductDetails from '../../components/Home/ProductDetails';
import {
  ADD_TO_CART,
  GET_ALL_CATEGORIES,
  GET_ALL_PRODUCTS,
  GET_CART_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_SINGLE_PRODUCT,
  SEARCH_PRODUCT,
  serverAddress,
} from '../../API/API_service';
import Loading from '../../components/General/loading';
import {debounce} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPopup from '../../components/General/loginPopup';
import Service from '../../API/Service';
import axios from 'axios';
import {brandData} from '../../assets/dummyjson/brands';
import CategoryDetails from '../../components/Home/categoryDetails';
import BottomNavigationHeader from '../../components/General/BottomNavigationHeader';
import HomeSearch from '../../components/General/HomeSearch';

const Home = () => {
  const staticImageURL = 'https://picsum.photos/300';
  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const route = useRoute();
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFavorite, setFavorite] = useState({});
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [tempProducts, setTempProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    setShowProductDetails(false);
  }, [isfocused]);

  // useEffect(() => {

  //   const backAction = () => {
  //     Alert.alert('Exit!', 'Are you sure you want to exit app?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, [route.name]);

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await GET_ALL_CATEGORIES();
      if (response && response?.data) {
        setCategories(response?.data);
      }
      setLoading(false);
    } catch (e) {
      console.log('Error Fetching Categories:', e?.message);
      setLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await GET_ALL_PRODUCTS();
      console.log('All Products:', response?.data);
      if (response && response?.data) {
        setAllProducts(response?.data);
        setTempProducts(response?.data);
      }
      setLoading(false);
    } catch (e) {
      console.log('Error fetching Products', e?.message);
      setLoading(false);
    }
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleSearch = async value => {
    console.log('Searching for:', value);
    if (value.length > 2) {
      searchProducts(value);
    } else if (!value) {
      setAllProducts(tempProducts);
    }
  };

  const searchProducts = async text => {
    const url = `${serverAddress}/product/search`;
    let data = {
      slug: text,
    };
    console.log(data);
    try {
      const response = await axios.get(url, data);
      console.log('=============Search Response========');
      console.log(response?.data);
      if (response?.success) {
        setAllProducts(response?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 600), []);

  const handleProductPress = async item => {
    setSelectedProduct(item);
    Service.singlProduct = item;
    setShowProductDetails(true);
  };

  const handleCategoryPress = item => {
    setSelectedCategory(item);
    setShowCategoryDetails(true);
  };

  const toggleFavorite = id => {
    // Toggle favorite for the selected product ID
    setFavorite(prevFavorites => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  const showPopup = async product => {
    try {
      const data = await AsyncStorage.getItem('user_data');
      if (data !== null) {
        let userData = await JSON.parse(data);
        setUser(userData);
        console.log(user);
        handleAddToCart(product);
      } else {
        setShowLoginPopup(true);
      }
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  };

  const handleAddToCart = async product => {
    console.log('Product Id', product?._id, user?._id);

    let data = {
      product: {
        brand: product?.brand?._id,
        product: product?._id,
        category: product?.category?._id,
        packSize: product?.priceList[0].number,
        price: product?.priceList[0].MRP,
        quantity: 1,
        stock: 1000,
        totalWeight: product?.priceList[0].number,
      },
      user: user?._id,
    };

    try {
      const response = await ADD_TO_CART(data);
      console.log('Add To Cart Response:', response);
      if (response?.success) {
        Alert.alert('Success!', 'Item Added to Cart', [
          {text: 'OK', onPress: () => navigation.navigate('Cart')},
        ]);
      }
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const handleBrandSelect = async name => {
    console.log('slug of P:', name);
    setLoading(true);
    try {
      const res = await GET_PRODUCT_BY_SLUG(name);
      if (res.success) {
        console.log('prod by brandname', res?.data);
        setAllProducts(res?.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <>
      {showCategoryDetails ? (
        <CategoryDetails
          navigation={navigation}
          setShowCategoryDetails={setShowCategoryDetails}
          selectedCategory={selectedCategory}
          allProducts={allProducts}
        />
      ) : (
        <>
          {showProductDetails ? (
            <ProductDetails
              showProductDetails={showProductDetails}
              setShowProductDetails={setShowProductDetails}
              allProducts={allProducts}
              product={selectedProduct}
              navigation={navigation}
              handleAddToCart={handleAddToCart}
            />
          ) : (
            <SafeAreaView style={styles.main}>
              <StatusBar
                barStyle={'dark-content'}
                backgroundColor={Colors.white}
              />
              {/* Header View */}
              <BottomNavigationHeader />
              {/* Search Bar */}
              <View style={styles.searchBar}>
                <View style={styles.searchIcon}>
                  <AntDesign
                    name="search1"
                    size={responsiveFontSize(25)}
                    color={'#DE3163'}
                  />
                </View>
                <TextInput
                  placeholder="Search for Products"
                  autoCapitalize="none"
                  placeholderTextColor={'gray'}
                  onChangeText={val => handleSearch(val)}
                  style={styles.searchInput}
                />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
                style={{
                  backgroundColor: Colors.backGround_grey,
                  marginVertical: responsivePadding(10),
                }}>
                <View>
                  <View style={styles.container}>
                    <Text style={styles.title}>Shop by Brands</Text>
                    <View style={styles.brand}>
                      {brandData.map(brand => {
                        return (
                          <TouchableOpacity
                            onPress={() => handleBrandSelect(brand.name)}
                            key={brand.id}
                            style={styles.brandContainer}>
                            <Image
                              source={brand.image}
                              style={styles.brandimage}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
                <View style={styles.divider} />

                <View style={{marginTop: responsivePadding(20)}}>
                  <View>
                    <Text style={styles.titleText}>Shop by Categories</Text>

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{paddingHorizontal: 15}}>
                      {categories.map((item, index) => {
                        return (
                          <Pressable
                            onPress={() => {
                              handleCategoryPress(item);
                            }}
                            key={index}
                            style={styles.catItem}>
                            <View style={styles.imageContainer}>
                              <Image
                                source={{uri: staticImageURL}}
                                style={styles.catImg}
                              />
                            </View>

                            <Text style={styles.itemText}>
                              {item?.name.length > 20
                                ? item?.name.slice(0, 20) + '...'
                                : item?.name}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>

                <View style={styles.divider} />

                {allProducts.length > 0 ? (
                  <View style={styles.container}>
                    <Text style={styles.text}>Popular Products</Text>

                    <View>
                      <FlatList
                        data={allProducts}
                        numColumns={2}
                        columnWrapperStyle={{
                          justifyContent: 'space-between',
                          gap: 10,
                        }}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, i}) => {
                          return (
                            <View key={i} style={styles.card}>
                              <Pressable
                                onPress={() => handleProductPress(item)}>
                                <View style={styles.imageWrapper}>
                                  <Image
                                    source={{uri: staticImageURL}}
                                    style={styles.image}
                                  />
                                </View>
                                <View style={styles.textWrapper}>
                                  <Text
                                    style={[
                                      styles.itemText,
                                      {
                                        fontWeight: '600',
                                        fontSize: responsiveFontSize(14),
                                      },
                                    ]}>{`${item?.name} ${item?.slug}`}</Text>
                                  <Text
                                    style={[
                                      styles.itemText,
                                      {
                                        color:
                                          item.priceList[0].stock_quantity <= 0
                                            ? Colors.outOfStockText
                                            : Colors.green,
                                        fontWeight: '600',
                                        fontSize: responsiveFontSize(16),
                                      },
                                    ]}>
                                    ₹ {item?.priceList[0]?.MRP || '0'}
                                  </Text>
                                </View>

                                {item.priceList[0].stock_quantity <= 0 && (
                                  <View style={styles.outofstock}>
                                    <Text style={styles.outofstockText}>
                                      Out of Stock
                                    </Text>
                                  </View>
                                )}

                                {item.priceList[0].stock_quantity > 0 && (
                                  <View style={styles.offerview}>
                                    <Text style={styles.offerText}>
                                      {30}% OFF
                                    </Text>
                                  </View>
                                )}
                                <Pressable
                                  onPress={() => toggleFavorite(item.id)}
                                  style={styles.favorite}>
                                  <AntDesign
                                    name={
                                      isFavorite[item.id] ? 'heart' : 'hearto'
                                    }
                                    color={isFavorite[item.id] ? 'red' : 'red'}
                                    size={20}
                                  />
                                </Pressable>
                              </Pressable>

                              <TouchableOpacity
                                disabled={item.priceList[0].stock_quantity <= 0}
                                activeOpacity={0.9}
                                onPress={() => showPopup(item)}
                                style={
                                  item.priceList[0].stock_quantity <= 0
                                    ? styles.outstockBtn
                                    : styles.btn
                                }>
                                <Text
                                  style={
                                    item.priceList[0].stock_quantity <= 0
                                      ? styles.outofstockBtnText
                                      : styles.btnText
                                  }>
                                  Add To Cart
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <Loading size={40} color={Colors.forgetPassword} />
                )}

                {showLoginPopup && (
                  <LoginPopup
                    showLoginPopup={showLoginPopup}
                    setShowLoginPopup={setShowLoginPopup}
                  />
                )}
              </ScrollView>
            </SafeAreaView>
          )}
        </>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    //  paddingTop:Platform.OS =='ios'?10:20
  },
  container: {
    marginHorizontal: responsivePadding(10),
  },
  brandimage: {
    width: '25%',
    // height: responsivePadding(70),
    // width: responsivePadding(70),
    // backgroundColor: Colors.white,
    // borderWidth: 1,
    // borderColor: '#DE3163',
    // borderRadius: responsivePadding(10),
  },
  iconView: {
    flexDirection: 'row',
    gap: responsivePadding(10),
  },
  searchBar: {
    marginHorizontal: responsivePadding(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.backGround_grey,
    borderWidth: 1,
    borderColor: Colors.backGround,
    padding: 6,
    paddingLeft: 10,
    gap: responsiveFontSize(10),
  },
  searchInput: {
    flex: 1,
    borderRadius: responsivePadding(5),
    paddingVertical: 10,
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    letterSpacing: 0.5,
  },
  contentContainer: {
    backgroundColor: Colors.backGround_grey,
    marginTop: responsivePadding(10),
    paddingBottom: responsivePadding(10),
  },
  divider: {
    height: 1,
    width: '90%',
    backgroundColor: Colors.backGround,
    marginTop: responsivePadding(20),
  },
  upperLeft: {
    flexDirection: 'row',
    gap: 20,
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors.backGround_grey,
    marginTop: responsivePadding(10),
  },
  text: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    marginBottom: responsivePadding(10),
  },
  itemText: {
    color: Colors.black,
  },

  card: {
    backgroundColor: Colors.white,
    width: responsivePadding(160),
    borderColor: Colors.black,
    borderWidth: 0.5,
    borderRadius: responsivePadding(5),
    marginBottom: responsivePadding(20),
  },
  imageWrapper: {
    marginTop: responsivePadding(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.forgetPassword,
    justifyContent: 'center',
    alignItems: 'center',
    height: responsivePadding(40),
    marginTop: responsivePadding(10),
    // bottom:0,
    // position:"absolute"
  },
  outstockBtn: {
    backgroundColor: Colors.outOfStock,
    justifyContent: 'center',
    alignItems: 'center',
    height: responsivePadding(40),
    marginTop: responsivePadding(10),
    // bottom:0,
    // position:"absolute"
  },
  contentContainer: {
    marginTop: responsivePadding(20),
    marginHorizontal: responsivePadding(10),
  },
  textWrapper: {
    marginTop: responsivePadding(10),
    marginHorizontal: responsivePadding(30),
  },
  btnText: {
    fontSize: responsiveFontSize(16),
    color: Colors.white,
    fontWeight: '500',
  },

  outofstockBtnText: {
    fontSize: responsiveFontSize(16),
    color: Colors.outOfStockText,
    fontWeight: '400',
  },
  favorite: {
    position: 'absolute',
    top: responsivePadding(5),
    right: responsivePadding(10),
  },
  outofstock: {
    position: 'absolute',
    top: responsivePadding(5),
    left: responsivePadding(0),
    borderRadius: 3,
    padding: 5,
    backgroundColor: Colors.forgetPassword,
  },
  outofstockText: {
    color: 'white',
    fontSize: responsiveFontSize(10),
  },
  offerview: {
    position: 'absolute',
    top: responsivePadding(5),
    left: responsivePadding(0),
    borderRadius: 3,
    padding: 5,
    backgroundColor: Colors.red,
  },
  offerText: {
    color: 'white',
    fontSize: responsiveFontSize(10),
  },
  brandimg: {
    height: responsivePadding(40),
    width: responsivePadding(150),
  },
  container: {
    marginHorizontal: responsivePadding(20),
    marginTop: responsivePadding(20),
  },
  title: {
    fontSize: responsiveFontSize(16),
    color: Colors.black,
    fontWeight: '600',
  },
  brandContainer: {
    // marginHorizontal: responsivePadding(2),
    // marginTop: responsivePadding(10),
    // elevation: 5,
    borderWidth: 2,
    margin: responsiveFontSize(10),
    width: '100%',
  },
  image: {
    width: responsivePadding(70),
    height: responsivePadding(70),
    backgroundColor: Colors.white,
    padding: 30,

    borderWidth: 1,
    borderRadius: responsivePadding(10),
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // borderWidth:2,
  },
  titleText: {
    fontSize: responsiveFontSize(16),
    color: Colors.black,
    fontWeight: '600',
    marginHorizontal: responsivePadding(10),
  },
  imageContainer: {
    width: responsivePadding(100),
    height: responsivePadding(100),
    padding: 10,
    gap: responsivePadding(30),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: responsivePadding(50),
  },
  catImg: {
    width: responsivePadding(60),
    height: responsivePadding(60),
  },
  catItem: {
    borderRadius: responsivePadding(50),
    padding: responsivePadding(5),
    marginHorizontal: responsivePadding(10),
  },
  itemText: {
    marginTop: responsivePadding(5),
    color: Colors.black,
    fontWeight: '400',
    alignSelf: 'center',
  },
});
