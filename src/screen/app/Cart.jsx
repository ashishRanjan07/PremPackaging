import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Colors from "../../components/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  EMPTY_CART,
  GET_ALL_COUPON,
  GET_CART_PRODUCTS,
  GET_COUPON_BY_COUPON_CODE,
  REMOVE_FROM_CART,
} from "../../API/API_service";
import InternalHeader from "../../components/header/InternalHeader";
import { BallIndicator } from "react-native-indicators";
import CustomButton from "../../components/General/CustomButton";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import AntDesign from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import { showMessage } from "react-native-flash-message";

export default function Cart() {
  const navigation = useNavigation();
  const [showCheckoutScreen, setShowCheckoutScreen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [showClearCart, setShowClearCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const couponRef = useRef(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [loaderForViewCoupon, setLoaderForViewCoupon] = useState(false);
  const [couponData, setCouponData] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const placeholderImage = "https://prempackaging.com/img/logo.png";
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchLoginData();
    setShowCheckoutScreen(false);
  }, [isFocused, navigation]);

  const fetchLoginData = async () => {
    setLoading(true);
    try {
      user_data_string = await AsyncStorage.getItem("user_data");
      if (user_data_string) {
        const userData = await JSON.parse(user_data_string);
        if (userData && userData?._id) {
          getProductsInCart(userData?._id);
          setUser(userData);
        }
      }

      setLoading(false);
    } catch (e) {
      console.log("Error fetching data:", e);
    }
  };

  const getProductsInCart = async (id) => {
    try {
      setLoading(true);
      const response = await GET_CART_PRODUCTS(id);
      if (response && response?.data?.products) {
        setCartProducts(response?.data?.products);
        setShowClearCart(true);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function getCartTotal() {
    const total = cartProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total - appliedDiscount; // Subtract the discount from total
  }

  const emptyCart = async (userId) => {
    let data = {
      id: userId,
    };
    try {
      const response = await EMPTY_CART(data);
      console.log(response);
      if (response?.success) {
        setCartProducts([]);
        Alert.alert("Cart", "Your cart is empty!!", [{ text: "OK" }]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeItemFromCart = async (productId) => {
    let data = {
      product: productId?._id,
      user: user?._id,
    };
    try {
      const response = await REMOVE_FROM_CART(data);
      // console.log(response, "line 130");
      if (response?.success) {
        // Refetch cart data from API
        await getProductsInCart(user?._id);

        setRefresh((prev) => !prev); 
        showMessage({
          type:"success",
          icon:"success",
          message:"Item successfully removed"
        })
        // Alert.alert("Success!", "Item removed", [
        //   {
        //     text: "OK",
        //     onPress: () => console.log("Item successfully removed"),
        //   },
        // ]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCheckOut = async () => {
    console.log("Clicked on the Process to checkout");
    // navigation.navigate("Checkout", {
    //   cartProducts: cartProducts,
    //   user: user,
    //   discountedAmount: appliedDiscount,
    // });
    navigation.navigate("Shipping Address", {
      routeName: "Billing Address",
      cartProducts: cartProducts,
      user: user,
      discountedAmount: appliedDiscount,
    });
    // setCouponCode("")
  };

  const handleCouponApply = async () => {
    const date = new Date();
    const todayDate = date.toISOString();
    const response = await GET_COUPON_BY_COUPON_CODE(couponCode);
    console.log(response, "Line 164");
    if (!response || !response.success || !response.data) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Invalid Coupon,Please enter a valid coupon code"
      })
      // Alert.alert("Invalid Coupon", "Please enter a valid coupon code");
      return;
    }
    const coupon = response.data;
    // Check if the coupon is within the valid date range
    if (todayDate < coupon.startDate || todayDate > coupon.endDate) {
      // Alert.alert("Invalid Coupon", "Coupon is not active");
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Invalid Coupon,Coupon is not active"
      })
      return;
    }
    // Check if the cart total meets the minimum order value requirement
    if (getCartTotal() < coupon.minimumOrderValue) {
      // Alert.alert(
      //   "Insufficient Cart Value",
      //   `Please add more items to meet the minimum order value of ${coupon.minimumOrderValue}`
      // );
      showMessage({
        type:'danger',
        icon:'danger',
        message:`Insufficient Cart Value,Please add more items to meet the minimum order value of${coupon.minimumOrderValue}`
      })
      return;
    }
    // Calculate discount amount
    let discountAmount = Math.min(
      (getCartTotal() * coupon.discountPercentage) / 100,
      coupon.maxDiscountCap
    );

    // Apply discount to cart total
    const newTotal = getCartTotal() - discountAmount;
    setAppliedDiscount(discountAmount);
    // Update UI with applied discount
    Alert.alert(
      "Applied Discount",
      `Discount applied: ${discountAmount.toFixed(2)}`
    );
    // setCartTotal(newTotal);
  };

  const handleSetValueToTextBox = async (item) => {
    setCouponCode(item?.couponCode);
    setShowCouponModal(false);
  };

  const handleViewAllCoupon = async () => {
    setShowCouponModal(true);
    setLoaderForViewCoupon(true);
    const response = await GET_ALL_COUPON();
    if (response?.success === true) {
      setCouponData(response?.data);
      setLoaderForViewCoupon(false);
    } else {
      Alert.alert("Coupon", "Coupon not available");
      setLoaderForViewCoupon(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <InternalHeader
        title={"Your Shopping Cart"}
        heart={"Cart"}
        handleClearCart={() => emptyCart(user?._id)}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {loading ? (
            <View style={styles.loaderView}>
              <BallIndicator color={Colors.brandColor} />
              <Text style={styles.loaderText}>
                Loading cart products please wait...
              </Text>
            </View>
          ) : (
            <>
              {cartProducts.length > 0 ? (
                <View>
                  {cartProducts.map((item, index) => {
                    return (
                      <>
                        <View key={index} style={styles.card}>
                          <View style={styles.cartImageHolder}>
                            <FastImage
                                style={styles.cartImage}
                              source={{
                                uri: item?.product?.images[0]?.image,
                                priority: FastImage.priority.high,
                                cache: FastImage.cacheControl.web,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </View>
                          <View style={{ width: "50%" }}>
                            <Text style={styles.itemName}>
                              {item?.product?.name} {item?.product?.slug}
                              {""}({item?.product?.size_inch} inches)
                            </Text>
                            {/* Count Holder */}
                            <View style={styles.countHolder}>
                              <Text style={styles.quantityText}>
                                {item?.quantity}
                              </Text>
                              <Text
                                style={{ color: "gray", textAlign: "center" }}
                              >
                                |
                              </Text>

                              <TouchableOpacity
                                onPress={() =>
                                  removeItemFromCart(item?.product)
                                }
                              >
                                <Text style={styles.deleteText}>Delete</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <Text style={styles.priceText}>
                            ₹ {item?.quantity * item.price || "0"}
                          </Text>
                        </View>
                        <View style={styles.divider} />
                      </>
                    );
                  })}
                  <View style={styles.cartTotalHolder}>
                    <Text style={styles.cartTotal}>
                      Subtotal ({cartProducts.length}{" "}
                      {cartProducts.length > 1 ? "items" : "item"}):
                    </Text>
                    <View style={{ marginRight: moderateScale(25) }}>
                      <Text style={styles.cartTotal}>
                        ₹ {getCartTotal() || "0"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.content}>
                    <View style={styles.couponContainer}>
                      <TextInput
                        placeholder="Coupon Code"
                        onChangeText={(text) => setCouponCode(text)}
                        placeholderTextColor={"gray"}
                        value={couponCode}
                        style={styles.couponInput}
                      />
                    </View>

                    <View style={styles.buttonHolder}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={[
                          styles.couponButton,
                          {
                            backgroundColor:
                              !couponCode?.length > 0
                                ? Colors.border_color
                                : Colors.forgetPassword,
                          },
                        ]}
                        onPress={() => handleCouponApply()}
                        disabled={!couponCode?.length > 0}
                      >
                        <Text style={styles.couponText}>Apply Coupon</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.couponButton}
                        onPress={handleViewAllCoupon}
                      >
                        <Text style={styles.couponText}>View All Coupon</Text>
                      </TouchableOpacity> */}
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.cartTotalView}>
                      <Text style={styles.cartTotalText}>Cart Total</Text>
                      <View style={styles.cartSubtotalHolder}>
                        <Text style={styles.cartSubtotalText}>Subtotal:</Text>
                        <Text style={styles.cartSubtotalPrice}>
                          ₹{getCartTotal() || "0"}
                        </Text>
                      </View>
                      <View style={styles.divider} />

                      {/* <View style={styles.cartSubtotalHolder}>
                        <Text style={styles.cartSubtotalText}>Shipping:</Text>
                        <Text style={styles.cartCalculated}>
                          calculated in next step
                        </Text>
                      </View> */}
                      <View style={styles.divider} />
                      {appliedDiscount > 0 && (
                        <View style={styles.cartSubtotalHolder}>
                          <Text style={styles.cartSubtotalText}>
                            Discount Applied:
                          </Text>
                          <Text
                            style={[
                              styles.cartSubtotalPrice,
                              { color: "green" },
                            ]}
                          >
                            - ₹{appliedDiscount.toFixed(2)}
                          </Text>
                        </View>
                      )}
                      <View style={styles.divider} />
                      {/* Cart Total Price */}

                      <View style={styles.cartTotalPiceHolder}>
                        <Text style={styles.cartSubtotalText}>Total:</Text>
                        <Text style={styles.cartTotalPrice}>
                          ₹{getCartTotal()}
                        </Text>
                      </View>
                      {/* Checkout Button */}
                      {cartProducts.length > 0 && (
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={handleCheckOut}
                          style={styles.checkOutButton}
                        >
                          <Text style={styles.checkOutButtonText}>
                            Process to checkout
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{ padding: moderateScale(20) }}>
                  <Text style={styles.emptyText}>Your cart is empty.</Text>
                </View>
              )}
            </>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showCouponModal}
          onRequestClose={() => setShowCouponModal(false)}
        >
          <View style={styles.modalOverlay} activeOpacity={1}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => setShowCouponModal(false)}
              >
                <AntDesign
                  name="closecircleo"
                  size={textScale(25)}
                  color={Colors.brandColor}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>View All Coupon</Text>
              {loaderForViewCoupon ? (
                <View>
                  <ActivityIndicator size={"large"} color={Colors.brandColor} />
                  <Text style={styles.loaderText}>Loading Please Wait...</Text>
                </View>
              ) : (
                <ScrollView style={{ flex: 0.5 }}>
                  {couponData?.map((item, index) => (
                    <View key={index} style={styles.couponItem}>
                      <Text style={styles.cartTotal}>{item?.name}</Text>
                      <Text style={styles.cartTotal}>
                        {item?.couponDescription
                          ? item?.couponDescription
                          : "N/A"}
                      </Text>
                      <View style={styles.lowerButtonHolder}>
                        <Text
                          style={[
                            styles.priceText,
                            { color: "red", fontSize: 18 },
                          ]}
                        >
                          {item?.couponCode}
                        </Text>
                        <CustomButton
                          name={"Apply"}
                          handleAction={() => handleSetValueToTextBox(item)}
                        />
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back,
  },
  content: {
    marginTop: moderateScaleVertical(10),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(5),
    marginHorizontal: moderateScale(10),
  },
  image: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
  itemName: {
    color: Colors.black,
    textTransform: "uppercase",
    fontSize: textScale(12),
    fontFamily: FontFamily.Montserrat_Regular,
  },
  button: {
    borderColor: Colors.forgetPassword,
    borderWidth: moderateScale(1),
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
  card: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: moderateScale(20),
    gap: moderateScale(20),
    alignItems: "center",
    paddingVertical: moderateScaleVertical(10),
  },
  countHolder: {
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
    marginTop: moderateScaleVertical(5),
  },
  cartImage: {
    width: "100%",
    height: moderateScale(100),
  },
  cartImageHolder: {
    width: "20%",
  },
  divider: {
    borderWidth: moderateScale(0.3),
    borderColor: Colors.border_grey,
    alignSelf: "center",
    width: "90%",
  },
  cartTotal: {
    color: Colors.forgetPassword,
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  deleteText: {
    fontSize: textScale(12),
    fontFamily: FontFamily.Montserrat_SemiBold,
    color: Colors.red,
  },
  cartTotalHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(10),
    marginBottom: moderateScaleVertical(20),
  },
  couponContainer: {
    borderWidth: 1,
    borderColor: Colors.forgetPassword,
    borderRadius: moderateScale(5),
    width: "95%",
    alignSelf: "center",
    height: moderateScale(45),
    marginTop: moderateScaleVertical(10),
    marginLeft: moderateScale(10),
    marginBottom: moderateScaleVertical(20),
  },
  couponInput: {
    flex: 1,
    paddingHorizontal: moderateScale(5),
    color: Colors.forgetPassword,
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  couponButton: {
    backgroundColor: Colors.forgetPassword,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    padding: moderateScale(10),
    marginLeft: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: moderateScaleVertical(20),
  },
  couponText: {
    color: Colors.white,
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  quantityText: {
    color: Colors.black,
    borderWidth: moderateScale(1),
    borderColor: Colors.black,
    width: moderateScale(20),
    fontFamily: FontFamily.Montserrat_Regular,
    textAlign: "center",
    borderRadius: moderateScale(5),
  },
  cartTotalView: {
    marginTop: moderateScaleVertical(20),
    borderWidth: moderateScale(1),
    borderColor: Colors.border_color,
    borderRadius: moderateScale(5),
    padding: moderateScale(12),
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScaleVertical(10),
  },
  cartTotalText: {
    fontSize: textScale(16),
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  cartSubtotalHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(5),
    marginVertical: moderateScale(10),
  },
  cartSubtotalText: {
    fontSize: textScale(14),
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  cartSubtotalPrice: {
    fontSize: textScale(14),
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  cartCalculated: {
    fontSize: textScale(13),
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_Regular,
    fontStyle: "italic",
  },
  cartTotalPiceHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(10),
  },
  cartTotalPrice: {
    fontSize: textScale(16),
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  checkOutButton: {
    backgroundColor: Colors.forgetPassword,
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScaleVertical(10),
    height: moderateScale(40),
    width: moderateScale(200),
    alignSelf: "center",
    borderRadius: moderateScale(5),
  },
  checkOutButtonText: {
    color: Colors.white,
    fontSize: textScale(13),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  priceText: {
    color: Colors.black,
    fontFamily: FontFamily.Montserrat_SemiBold,
    fontSize: textScale(14),
  },
  emptyText: {
    color: Colors.black,
    textAlign: "center",
    fontSize: textScale(16),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  loaderText: {
    fontSize: textScale(16),
    color: Colors.brandColor,
    textAlign: "center",
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  loaderView: {
    justifyContent: "center",
    padding: moderateScale(10),
    gap: moderateScale(10),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    padding: moderateScale(20),
    position: "absolute",
    bottom: 0,
    height: "65%",
  },
  modalTitle: {
    fontSize: textScale(16),
    fontFamily: FontFamily.Montserrat_SemiBold,
    marginBottom: moderateScale(10),
    color: Colors.brandColor,
    textAlign: "center",
  },
  lowerButtonHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
  },
  couponItem: {
    borderWidth: 2,
    padding: moderateScale(10),
    borderRadius: 10,
    marginVertical: moderateScaleVertical(5),
    backgroundColor: Colors.white,
    elevation: moderateScale(5),
    borderColor: Colors.border_grey,
    gap: moderateScale(10),
  },
  buttonHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
