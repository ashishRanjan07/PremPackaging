import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ADD_TO_CART } from "../../API/API_service";
import LoginPopup from "../General/loginPopup";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import FastImage from "react-native-fast-image";
import { showMessage } from "react-native-flash-message";
import Entypo from "react-native-vector-icons/Entypo";
import CustomButton from "../General/CustomButton";

const HomePopularProduct = ({ data, comingFrom }) => {
  const navigation = useNavigation();
  const [wishlist, setWishlist] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price whenever 'data' changes
    calculateTotalPrice();
  }, [data]);

  const calculateTotalPrice = () => {
    const total = data.reduce((sum, item) => {
      return sum + (item?.priceList?.[0]?.SP || 0);
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    (async () => {
      const savedWishlist = await AsyncStorage.getItem("wishlist");
      savedWishlist && setWishlist(JSON.parse(savedWishlist));
    })();
  }, []);

  const handleAddToCartBuyItWith = (data) => {
    data.forEach((item) => {
      if (item?.priceList?.[0]?.stock_quantity > 0) {
        handleAddToCart(item);
      }
    });
  };

  const handleAddToCart = async (product) => {
    console.log("hii Add to cart");
    const user = await AsyncStorage.getItem("user_data");
    if (user) {
      const userData = JSON.parse(user);
      const cartData = {
        product: {
          brand: product?.brand?._id,
          product: product?._id,
          category: product?.category?._id,
          packSize: product?.priceList[0].number,
          price: product?.priceList[0].SP,
          quantity: 1,
          stock: 1000,
          totalWeight: product?.priceList[0].number,
          totalPackWeight: 0,
        },
        user: userData?._id,
      };

      try {
        const response = await ADD_TO_CART(cartData);
        if (response?.success) {
          showMessage({
            message: "Product Added to cart successfully",
            type: "success",
            icon: "success",
          });
        }
      } catch (e) {
        console.log("Error adding to cart:", e);
      }
    } else {
      setShowLoginPopup(true);
    }
  };

  const isItemInWishlist = (id) =>
    wishlist.some((wishItem) => wishItem._id === id);

  useFocusEffect(
    useCallback(() => {
      loadWishlist();
    }, [])
  );

  const loadWishlist = async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.log("Error loading wishlist", error);
    }
  };

  const handleSaveToWishList = async (item) => {
    try {
      const newWishlist = [...wishlist];
      const itemIndex = newWishlist.findIndex(
        (wishlistItem) => wishlistItem._id === item._id
      );

      if (itemIndex > -1) {
        newWishlist.splice(itemIndex, 1);
        showMessage({
          message: "Product removed from wishlist",
          type: "info",
          icon: "success",
          color: Colors.white,
          backgroundColor: Colors.red,
        });
      } else {
        // If the product is not in the wishlist, add it
        newWishlist.push(item);
        showMessage({
          message: "Product added to wishlist",
          type: "info",
          icon: "success",
          color: Colors.white,
          backgroundColor: Colors.brandColor,
        });
      }

      setWishlist(newWishlist);
      await AsyncStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } catch (error) {
      console.log("Error updating wishlist", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.productHolder}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => navigation.push("ProductDetails", { item })}
            >
              <View style={styles.imageHolder3}>
                <FastImage
                  style={styles.image}
                  source={{
                    uri: item?.images[0]?.image,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.web,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={styles.itemTextHolder}>
                <Text numberOfLines={2} style={styles.nameText}>
                  {item?.name} {item?.slug}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: moderateScale(5),
                  }}
                >
                  {/* <Text
                    style={{
                      color: Colors.brandColor,
                      fontSize: textScale(12),
                      fontFamily: FontFamily.Montserrat_Regular,
                    }}
                  >
                    M.R.P
                  </Text> */}
                  <Text style={styles.mrpText}>
                    {item?.priceList?.[0]?.MRP}
                  </Text>
                  <Text
                    style={[
                      styles.priceText,
                      {
                        fontSize: textScale(18),
                        // color:
                        //   item?.priceList[0]?.stock_quantity > 0
                        //     ? Colors.green
                        //     : Colors.outOfStockText,
                      },
                    ]}
                  >
                    ₹ {item?.priceList[0]?.SP || "0"}
                  </Text>
                </View>
                {/* <Text
                  style={[
                    styles.priceText,
                    {
                      color:
                        item?.priceList[0]?.stock_quantity > 0
                          ? Colors.green
                          : Colors.outOfStockText,
                    },
                  ]}
                >
                  ₹ {item?.priceList[0]?.SP || "0"}
                </Text> */}
              </View>
              <View style={styles.discountHolder}>
                <View style={styles.offerView}>
                  <Text style={styles.offerText}>
                    {parseInt(
                      ((item?.priceList[0]?.MRP - item?.priceList[0]?.SP) /
                        item?.priceList[0]?.MRP) *
                        100
                    )}%{"\n"}
                     OFF
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.heartIconHolder}
                onPress={() => handleSaveToWishList(item)}
              >
                <AntDesign
                  name={isItemInWishlist(item._id) ? "heart" : "heart"}
                  size={moderateScale(25)}
                  color={isItemInWishlist(item._id) ? Colors.red : Colors.text_grey}
                />
              </TouchableOpacity>
              {comingFrom === "buyItWith" ? null : (
                <TouchableOpacity
                  // onPress={() => handleAddToCart(item)}
                  onPress={() => navigation.push("ProductDetails", { item })}
                  // disabled={item?.priceList[0]?.stock_quantity <= 0}
                  style={[
                    styles.button,
                    // {
                    //   backgroundColor:
                    //     item?.priceList[0]?.stock_quantity > 0
                    //       ? Colors.brandColor
                    //       : Colors.outOfStock,
                    // },
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      // {
                      //   color:
                      //     item?.priceList[0]?.stock_quantity > 0
                      //       ? Colors.white
                      //       : Colors.outOfStockText,
                      // },
                    ]}
                  >
                    VIEW PRODUCTS
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            {/* Display "+" icon if comingFrom is 'buyItWith' and it's not the last product */}
            {comingFrom === "buyItWith" && index < data.length - 1 && (
              <View style={styles.plusIconHolder}>
                <Entypo
                  name="plus"
                  size={textScale(30)}
                  color={Colors.brandColor}
                />
              </View>
            )}
          </React.Fragment>
        ))}
      </ScrollView>
      {comingFrom === "buyItWith" && (
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            gap: moderateScaleVertical(10),
          }}
        >
          <Text style={styles.totalPriceText}>
            Total Price : {totalPrice.toFixed(2)}
          </Text>
          <TouchableOpacity
            style={[
              styles.buttonHolder,
              {
                backgroundColor: data.some(
                  (item) => item?.priceList?.[0]?.stock_quantity <= 0
                )
                  ? Colors.outOfStock
                  : Colors.brandColor,
                borderColor: data.some(
                  (item) => item?.priceList?.[0]?.stock_quantity <= 0
                )
                  ? Colors.outOfStock
                  : Colors.brandColor,
              },
            ]}
            disabled={data.some(
              (item) => item?.priceList?.[0]?.stock_quantity <= 0
            )}
            onPress={() => handleAddToCartBuyItWith(data)}
          >
            <Text style={styles.buttonText2}>
              Add all {data.length} to cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {showLoginPopup && (
        <LoginPopup
          showLoginPopup={showLoginPopup}
          setShowLoginPopup={setShowLoginPopup}
        />
      )}
    </View>
  );
};

export default HomePopularProduct;

const styles = StyleSheet.create({
  item: {
    padding: moderateScale(10),
    backgroundColor: Colors.white,
    elevation: moderateScale(10),
    gap: moderateScale(5),
    width: moderateScale(200),
    margin: moderateScale(10),
    // borderWidth:2,
  },
  image: {
    width: moderateScale(175),
    height: moderateScale(175),
    alignSelf: "center",
  },
  itemTextHolder: {
    width: "98%",
    height: moderateScale(85),
    gap: moderateScale(5),
  },
  priceText: {
    fontSize: textScale(16),
    color: Colors.green,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  nameText: {
    fontSize: textScale(16),
    color: Colors.black,
    textAlign: "left",
  },
  discountHolder: {
    position: "absolute",
    top: "0%",
    right: "0%",
    alignItems:'center',
    justifyContent:'center',
    height:moderateScale(50),
    // borderRadius: moderateScale(5),
    width:'25%'
  },
  offerView: {
    backgroundColor: Colors.red,
    padding: moderateScale(5),
    width:'100%',
    borderBottomLeftRadius:moderateScale(10)
    // borderRadius: moderateScale(5),
  },
  outOfStock: {
    backgroundColor: Colors.red,
    padding: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
    borderBottomEndRadius: moderateScale(5),
    // borderRadius: moderateScale(5),
  },
  outOfStockText: {
    fontSize: textScale(14),
    color: Colors.white,
  },
  offerText: {
    fontSize: textScale(12),
    color: Colors.white,
    fontFamily:FontFamily.Montserrat_Medium
  },
  heartIconHolder: {
    position: "absolute",
    top: "0%",
    left: "0%",
    padding: moderateScale(5),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.white,
    borderColor: Colors.border_color,
    // borderWidth: 1,
    overflow: "hidden",
  },
  button: {
    marginHorizontal: moderateScale(-10),
    marginBottom: moderateScale(-10),
    alignItems: "center",
    backgroundColor: Colors.brandColor,
  },
  buttonText: {
    fontSize: textScale(14),
    textAlign: "center",
    padding: moderateScale(10),
    fontFamily: FontFamily.Montserrat_SemiBold,
    color: Colors.white,
  },
  productHolder: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: moderateScale(15),
    alignSelf: "center",
    // justifyContent: "center",
    marginVertical: moderateScaleVertical(10),
  },
  loaderContainer: {
    width: "90%",
    alignSelf: "center",
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    fontSize: textScale(14),
    color: "black",
    textAlign: "center",
  },
  loaderView: {
    position: "absolute",
    width: "100%",
    top: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  mrpText: {
    fontSize: textScale(14),
    color: Colors.green,
    textDecorationLine: "line-through",
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  plusIconHolder: {
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: moderateScale(2),
  },
  totalPriceText: {
    fontFamily: FontFamily.Montserrat_Bold,
    color: Colors.brandColor,
    fontSize: textScale(17),
  },
  buttonHolder: {
    borderWidth: 2,
    borderColor: Colors.brandColor,
    backgroundColor: Colors.brandColor,
    width: "60%",
    padding: moderateScale(10),
    alignItems: "center",
    borderRadius: moderateScale(10),
  },
  buttonText2: {
    fontFamily: FontFamily?.Montserrat_Medium,
    fontSize: textScale(15),
    color: Colors.white,
    paddingHorizontal: moderateScale(10),
  },
});
