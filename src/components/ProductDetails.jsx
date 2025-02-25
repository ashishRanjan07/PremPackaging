import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Colors from "./Colors";
import { responsiveFontSize, responsivePadding } from "./Responsive";
import { useNavigation } from "@react-navigation/core";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import InternalHeader from "./header/InternalHeader";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ADD_TO_CART,
  GET_RELATED_PRODUCT_DETAILS_BY_ID,
  GET_SINGLE_PRODUCT,
} from "../API/API_service";
import LoginPopup from "./General/loginPopup";
import { WebView } from "react-native-webview";
import PopularProducts from "./Home/popularProducts";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../utils/ResponsiveSize";
import FontFamily from "../utils/FontFamily";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import BottomModalForPackSize from "./General/BottomModalForPackSize";
import FastImage from "react-native-fast-image";
import RelatedProductComp from "./relatedProduct/RelatedProductComp";
import HomePopularProduct from "./Home/HomePopularProduct";
import { ImagePath } from "../utils/ImagePath";

const ProductDetails = ({ route }) => {
  const [webViewHeight, setWebViewHeight] = useState(100);
  const { item } = route.params;
  // console.log(item?.buyItWith, "Line 31");
  const [buyItWithProduct, setBuyItWithProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [showDetails, setShowDetails] = useState("Description");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [webViewLoader, setWebViewLoader] = useState(true);
  const [showTermsAndConditionModal, setShowTermsAndCondition] =
    useState(false);
  const [relatedProductsId, setRelatedProductsId] = useState(
    item?.relatedProducts
  );
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isRelatedProductsLoading, setIsRelatedProductsLoading] =
    useState(false);
  const [wishlist, setWishlist] = useState([]);
  const navigation = useNavigation();
  const [packSizeModal, setShowPackSizeModal] = useState(false);
  const [packSizeData, setPackSizeData] = useState([]);
  const [mrp, setMrp] = useState("");
  const [sp, setSp] = useState("");
  const [number, setNumber] = useState("");
  const [packWeight, setPackWeight] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [bigImage, setBigImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch the product wishlist state from AsyncStorage
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

  useFocusEffect(
    useCallback(() => {
      loadWishlist();
      fetchSingleProduct();
    }, [])
  );

  const fetchSingleProduct = async () => {
    // console.log(buyItWithProductId, "Line 96");
    setIsLoading(true);
    const buyItProducts = [];
    if (item?.buyItWith?.length > 0) {
      for (const buyItProduct of item?.buyItWith) {
        try {
          const response = await GET_SINGLE_PRODUCT(buyItProduct?._id);
          buyItProducts.push(response?.data);
        } catch (error) {
          console.log(error, "Line 106");
        }
      }
      setBuyItWithProduct(buyItProducts);
    }
    setIsLoading(false);
  };

  const isInWishlist = (item) => {
    return wishlist.some((i) => i._id === item._id);
  };

  const handleSaveToWishList = async (product) => {
    try {
      const newWishlist = [...wishlist];
      const itemIndex = newWishlist.findIndex(
        (wishlistItem) => wishlistItem._id === product._id
      );

      if (itemIndex > -1) {
        // Remove the product from the wishlist
        newWishlist.splice(itemIndex, 1);
        showMessage({
          message: "Product removed from wishlist",
          type: "info",
          icon: "success",
          color: Colors.white,
          backgroundColor: Colors.red,
        });
      } else {
        // Add the product to the wishlist
        newWishlist.push(product);
        showMessage({
          message: "Product added to wishlist",
          type: "info",
          icon: "success",
          color: Colors.white,
          backgroundColor: Colors.brandColor,
        });
      }

      // Update the state and store the updated wishlist in AsyncStorage
      setWishlist(newWishlist);
      await AsyncStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } catch (error) {
      console.log("Error updating wishlist", error);
    }
  };

  const fetchSpecificProductAndStore = async () => {
    setIsRelatedProductsLoading(true);
    const fetchedProducts = [];
    if (item?.relatedProducts?.length > 0) {
      for (const relatedProduct of item.relatedProducts) {
        try {
          const response = await GET_RELATED_PRODUCT_DETAILS_BY_ID(
            relatedProduct?._id
          );
          fetchedProducts.push(response?.data);
        } catch (error) {
          console.log("Error fetching related product:", error);
        }
      }
      setRelatedProducts(fetchedProducts);
    }
    setIsRelatedProductsLoading(false);
  };

  useEffect(() => {
    fetchSpecificProductAndStore();
  }, []);

  useEffect(() => {
    setRelatedProductsId(item?.relatedProducts);
    fetchSpecificProductAndStore();
  }, []);

  const additionalInformationData = [
    {
      label: "Size in Inches",
      value: `${item?.size_inch ? item?.size_inch : "N/A"}`,
    },
    { label: "Size in mm", value: `${item?.size_mm ? item?.size_mm : "N/A"}` },
    { label: "HSN Code", value: `${item?.hsn_code ? item?.hsn_code : "N/A"}` },
    { label: "Color", value: `${item?.color ? item?.color : "N/A"}` },
    {
      label: "Breadth in inches",
      value: `${item?.breadth_inch ? item?.breadth_inch : "N/A"}`,
    },
    {
      label: "Breadth in mm",
      value: `${item?.breadth_mm ? item?.breadth_mm : "N/A"}`,
    },
    {
      label: "Height in inches",
      value: `${item?.height_inch ? item?.height_inch : "N/A"}`,
    },
    {
      label: "Height in mm",
      value: `${item?.height_mm ? item?.height_mm : "N/A"}`,
    },
    {
      label: "Length in inches",
      value: `${item?.length_inch ? item?.length_inch : "N/A"}`,
    },
    {
      label: "Length in mm",
      value: `${item?.length_mm ? item?.length_mm : "N/A"}`,
    },
  ];

  const handlePackSize = (item) => {
    console.log(item, "Line 185");
    setShowPackSizeModal(true);
    setPackSizeData(item?.priceList);
  };
  const handleAddToCart = async (product) => {
    let user = await AsyncStorage.getItem("user_data");
    if (user !== null) {
      const userData = JSON.parse(user);
      let data = {
        product: {
          brand: product?.brand?._id,
          product: product?._id,
          category: product?.category?._id,
          packSize: number ? number : product?.priceList[0].number,
          price: sp ? sp : product?.priceList?.[0]?.SP,
          quantity: count,
          stock: 1000,
          totalWeight: product?.priceList[0].number,
          totalPackWeight: 0,
        },
        user: userData?._id,
      };
      console.log(data, "Line 212");
      try {
        const response = await ADD_TO_CART(data);
        console.log("Add To Cart Response:", response);
        if (response?.success) {
          showMessage({
            message: "Product Added to cart successfully",
            type: "success",
            icon: "success",
          });
        }
      } catch (e) {
        console.log("Error:", e);
      }
    } else {
      console.log("Please login to add to cart");
      setShowLoginPopup(true);
    }
  };

  const handleDecreaseItemQuantity = async () => {
    console.log("Clicked on the Decrease Button");
    count > 1 ? setCount(count - 1) : null;
  };

  const handleIncreaseItemQuantity = async () => {
    console.log("Clicked on the Increase Button");
    setCount(count + 1);
  };

  const onWebViewMessage = (event) => {
    // Get the height from the message from WebView
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  const webViewScript = `
    setTimeout(function() {
      window.ReactNativeWebView.postMessage(
        document.documentElement.scrollHeight
      );
    }, 500);
  `;

  const data = [
    { id: 1, name: "Free Delivery", image: ImagePath.delivery },
    { id: 2, name: "Secured Transaction", image: ImagePath.secure },
    { id: 3, name: "No Return", image: ImagePath.noReturn },
    { id: 4, name: "100% Recyclable", image: ImagePath.recycle },
  ];

  return (
    <View style={styles.main}>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <InternalHeader title={"Product Details"} heart={"productDetails"} />
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <View style={styles.firstSection}>
          <View style={styles.innerView}>
            <View style={{ marginVertical: moderateScaleVertical(10) }}>
              <Text style={styles.name}>
                {item?.name} {item?.slug} {item?.hsn_code} ({item?.size_inch}) (
                {item?.priceList[0]?.number} Pcs)
              </Text>
            </View>
            {imageLoading && (
              <ActivityIndicator
                size="large"
                color={Colors.brandColor}
                style={styles.activityIndicator}
              />
            )}
            <FastImage
              style={styles.imageStyle}
              source={{
                uri: bigImage === null ? item?.images[0]?.image : bigImage,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.web,
              }}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <View style={{ alignItems: "center" }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: moderateScale(15) }}
                style={styles.otherPics}
              >
                {item?.images.map((item, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.imageContainer}
                      onPress={() => setBigImage(item?.image)}
                    >
                      <Image
                        source={{ uri: item?.image }}
                        style={styles.catImg}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View
              style={{
                marginVertical: moderateScaleVertical(10),
                gap: moderateScale(10),
              }}
            >
              <Text style={styles.name}>About this item</Text>
              <View style={styles.itemHolder}>
                <Text style={styles.text2}>
                  1. Price per {number ? number : item?.priceList?.[0]?.number}{" "}
                  pcs + GST 18%
                </Text>
                <Text style={styles.text2}>
                  2. Brand : - {item?.brand?.name ? item?.brand?.name : "N/A"}{" "}
                </Text>
                <Text style={styles.text2}>
                  3. Model : - {item?.model ? item?.model : "N/A"}{" "}
                </Text>
                <Text style={styles.text2}>
                  4. Dimensions : - {item?.size_inch ? item?.size_inch : "N/A"}(
                  inches)
                </Text>
                <Text style={styles.text2}>
                  5. Pack of {number ? number : item?.priceList?.[0]?.number}{" "}
                  Pcs
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Second Sections */}
        <View style={styles.firstSection}>
          <View style={styles.innerView2}>
            <Text style={styles.name}>Price</Text>
            <Text
              style={[
                styles.name,
                {
                  color:
                    item?.priceList[0]?.stock_quantity > 0
                      ? Colors.green
                      : Colors.red,
                },
              ]}
            >
              {item?.priceList[0]?.stock_quantity > 0
                ? "In Stock"
                : "Out of Stock"}
            </Text>
          </View>
          <View style={styles.priceHolder}>
            {item?.priceList.length > 2 && (
              <Text style={styles.price}>
                ₹{sp ? sp : item?.priceList?.[0]?.SP}
              </Text>
            )}
            {item?.priceList.length > 2 ? (
              <View
                style={{
                  marginVertical: moderateScaleVertical(5),
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.text2}>Select Pack Size</Text>
                <TouchableOpacity
                  style={{
                    width: "45%",
                    alignItems: "center",
                    borderWidth: 2,
                    borderRadius: moderateScale(5),
                    backgroundColor: Colors.border_grey,
                    borderColor: Colors.border_grey,
                    padding: moderateScale(5),
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    gap: moderateScale(5),
                  }}
                  onPress={() => handlePackSize(item)}
                >
                  <Text style={styles.text2}>
                    {number ? number : item?.priceList[0]?.number}
                  </Text>
                  <AntDesign
                    name="down"
                    color={Colors.brandColor}
                    size={textScale(14)}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.price}>₹{item?.priceList?.[0]?.SP}</Text>
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: moderateScale(5),
              }}
            >
              <Text
                style={{
                  color: Colors.brandColor,
                  fontSize: textScale(14),
                  fontFamily: FontFamily.Montserrat_Regular,
                }}
              >
                M.R.P
              </Text>
              <Text style={styles.mrpText}>
                {mrp ? mrp : item?.priceList?.[0]?.MRP}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          {/* Increase and Decrease the count */}
          <View style={styles.quantityHolder}>
            <TouchableOpacity
              style={styles.iconHolder}
              onPress={handleDecreaseItemQuantity}
            >
              <MaterialCommunityIcons
                name="minus"
                size={textScale(25)}
                color={Colors.black}
              />
            </TouchableOpacity>
            <Text style={styles.countText}>{count}</Text>
            <TouchableOpacity
              onPress={handleIncreaseItemQuantity}
              style={[
                styles.iconHolder,
                { backgroundColor: Colors.forgetPassword },
              ]}
            >
              <MaterialIcons
                name="add"
                size={textScale(25)}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
          {/* Button and heart Icon */}
          <View style={styles.buttonHolder2}>
            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={[
                styles.button,
                {
                  backgroundColor:
                    item?.priceList[0]?.stock_quantity > 0
                      ? Colors.brandColor
                      : Colors.border_color,
                },
              ]}
              disabled={item?.priceList[0]?.stock_quantity > 0 ? false : true}
            >
              <Text style={styles.addText}>ADD TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heartHolder}
              onPress={() => handleSaveToWishList(item)}
            >
              <AntDesign
                name={isInWishlist(item) ? "heart" : "hearto"}
                color={Colors.red}
                size={textScale(30)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: moderateScale(10),
              paddingBottom: moderateScale(10),
            }}
          >
            <MaterialCommunityIcons
              name="truck"
              color={Colors.red}
              size={moderateScale(30)}
            />
            <Text style={styles.dText}>
              Delivery Within{" "}
              {item?.delivery_time ? item?.delivery_time : "7 Working Days"}
            </Text>
          </View>
          {/* 4 Icons */}
          <View
            style={{
              marginVertical: moderateScaleVertical(10),
              flexDirection: "row",
              alignItems: "center",
              flexWrap:'wrap',
              justifyContent:'space-evenly',
              gap:moderateScale(10)
            }}
          >
            {data.map((item)=>(
              <View key={item?.id} style={{alignItems:'center',gap:moderateScaleVertical(5)}}>
                <Image source={item?.image} resizeMode="contain" style={{width:moderateScale(30),height:moderateScale(30)}}/>
                <Text style={[styles.dText,{width:'80%'}]}>{item?.name}</Text>
                </View>
            ))}
          </View>
          {/* Return Days */}
          {/* <View style={styles.returnHolder}>
            <View style={styles.innerView4}>
              <Feather
                name="refresh-ccw"
                color={Colors.red}
                size={responsiveFontSize(25)}
              />
              <Text style={styles.text2}>7 Days Return. </Text>
            </View>
            <TouchableOpacity
              style={styles.tcHolder}
              onPress={() => setShowTermsAndCondition(true)}
            >
              <Text style={styles.tcText}>T&C</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {/* Third Section */}
        <View style={styles.firstSection}>
          <View style={styles.descriptionView}>
            <TouchableOpacity
              style={[
                styles.touch,
                showDetails === "Description" && styles.activeTab,
              ]}
              onPress={() => setShowDetails("Description")}
            >
              <Text style={styles.productText}>Description</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.touch,
                showDetails === "AdditionalInformation" && styles.activeTab,
              ]}
              onPress={() => setShowDetails("AdditionalInformation")}
            >
              <Text style={styles.productText}>Additional Information</Text>
            </TouchableOpacity>
          </View>
          {showDetails === "Description" ? (
            <View style={{ width: "95%", alignSelf: "center" }}>
              {item?.description ? (
                // <View style={{borderWidth:2,flex:1}}>
                <WebView
                  source={{
                    html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${item?.description}</body></html>`,
                  }}
                  injectedJavaScript={webViewScript}
                  onMessage={onWebViewMessage}
                  style={{ height: webViewHeight }}
                  originWhitelist={["*"]}
                />
              ) : (
                <View>
                  <Text style={styles.nanText}>Description Not Available</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={{ width: "95%", alignSelf: "center" }}>
              {additionalInformationData.map((item) => (
                <View style={styles.tableRow} key={item.label}>
                  <Text style={styles.tableLabel}>{item.label}</Text>
                  <Text style={styles.tableValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        {/* Buy with it Option */}
        <View style={styles.relatedView}>
          <Text style={[styles.loaderText, { textAlign: "left" }]}>
            Buy it With
          </Text>
          {buyItWithProduct.length > 0 ? (
            <View>
              {isLoading === true ? (
                <View>
                  <ActivityIndicator size="large" color={Colors.brandColor} />
                  <Text style={styles.loaderText}>
                    Please wait product is loading...
                  </Text>
                </View>
              ) : (
                <HomePopularProduct
                  data={buyItWithProduct}
                  width={250}
                  comingFrom={"buyItWith"}
                />
              )}
            </View>
          ) : (
            <Text style={styles.nanText}>No Buy it product Available</Text>
          )}
        </View>
        <View style={styles.relatedView}>
          <Text style={[styles.loaderText, { textAlign: "left" }]}>
            Related Products
          </Text>
          {isRelatedProductsLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.brandColor} />
              <Text style={styles.loaderText}>Loading please wait...</Text>
            </View>
          ) : relatedProducts.length > 0 ? (
            <View>
              <HomePopularProduct data={relatedProducts} width={250} />
            </View>
          ) : (
            <Text style={styles.nanText}>No Related Products</Text>
          )}
        </View>
        <BottomModalForPackSize
          visible={packSizeModal}
          data={packSizeData}
          message={"Choose Pack Size"}
          hideModal={() => setShowPackSizeModal(false)}
          selectedValue={(text) => {
            console.log(text, "Line 546");
            setMrp(text?.MRP);
            setSp(text?.SP);
            setNumber(text?.number);
            setPackWeight(text?.pack_weight);
            setStockQuantity(text?.stock_quantity);
            setShowPackSizeModal(false);
          }}
        />
      </ScrollView>
      {showLoginPopup && (
        <LoginPopup
          showLoginPopup={showLoginPopup}
          setShowLoginPopup={setShowLoginPopup}
        />
      )}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showTermsAndConditionModal}
        statusBarTranslucent
        onRequestClose={() => setShowTermsAndCondition(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTermsAndCondition(false)}
            >
              <Feather name="x" size={textScale(25)} color={Colors.black} />
            </TouchableOpacity>
            {/* {webViewLoader && (
              <View style={styles.loaderView}>
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size={"large"} color={Colors.brandColor} />
                  <Text style={styles.loaderText}>Please wait...</Text>
                </View>
              </View>
            )} */}
            <WebView
              source={{
                uri: "https://www.store.prempackaging.com/terms-of-sale",
              }}
              onLoadStart={() => setWebViewLoader(true)}
              onLoadEnd={() => setWebViewLoader(false)}
              // style={webViewLoader ? { display: "none" } : { flex: 1 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.back,
  },
  imageContainer: {
    padding: 10,
    marginLeft: moderateScale(10),
    borderColor: Colors.border_grey,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScaleVertical(10),
  },
  catImg: {
    width: moderateScale(75),
    height: moderateScale(75),
  },
  firstSection: {
    width: "95%",
    borderWidth: moderateScale(1),
    alignSelf: "center",
    marginVertical: moderateScaleVertical(10),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(5),
    borderColor: Colors.border_grey,
  },
  text2: {
    fontSize: textScale(14),
    color: Colors.brandColor,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  stateText: {
    fontSize: responsiveFontSize(20),
    fontWeight: "400",
    color: Colors.border_color,
  },
  innerView: {
    width: "100%",
    padding: moderateScale(10),
  },
  innerView2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(25),
    padding: moderateScale(10),
  },
  imageStyle: {
    height: moderateScale(275),
    width: moderateScale(350),
    alignSelf: "center",
    marginVertical: moderateScaleVertical(10),
  },
  priceHolder: {
    paddingHorizontal: moderateScale(25),
  },
  mrpText: {
    fontSize: textScale(14),
    color: Colors.red,
    textDecorationLine: "line-through",
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  imageView: {
    alignSelf: "center",
    marginVertical: responsivePadding(10),
  },
  detailsHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  itemHolder: {
    width: "90%",
    alignSelf: "center",
  },
  heartHolder: {
    // borderWidth: 2,
    width: "15%",
    alignItems: "center",
    padding: responsivePadding(5),
    borderRadius: responsivePadding(5),
    borderColor: Colors.border_color,
  },
  quantityHolder: {
    width: "50%",
    borderWidth: 1,
    borderColor: Colors.forgetPassword,
    marginHorizontal: moderateScale(25),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(5),
    overflow: "hidden",
    marginBottom: moderateScaleVertical(25),
  },
  name: {
    color: Colors.brandColor,
    fontSize: textScale(13),
    fontFamily: FontFamily.Montserrat_SemiBold,
    lineHeight: scale(22),
    letterSpacing: scale(0.3),
  },
  price: {
    color: Colors.brandColor,
    fontSize: textScale(20),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  viwHolder: {
    borderWidth: responsivePadding(1),
    width: "95%",
    alignSelf: "center",
    padding: responsivePadding(10),
    borderRadius: responsivePadding(5),
    borderColor: Colors.text_grey,
    gap: responsivePadding(5),
    backgroundColor: Colors.white,
    elevation: 5,
  },
  divider: {
    width: "100%",
    borderWidth: moderateScale(1),
    borderColor: Colors.border_grey,
    marginVertical: moderateScaleVertical(15),
  },
  rating: {
    color: Colors.text_grey,
    fontWeight: "700",
    fontSize: responsiveFontSize(18),
  },
  dText: {
    fontSize: textScale(14),
    color: Colors.black,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: FontFamily.Montserrat_Medium,
  },
  innerView3: {
    borderWidth: 2,
    borderColor: Colors.border_color,
    borderRadius: responsiveFontSize(5),
    width: "60%",
    padding: responsivePadding(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stateHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveFontSize(15),
    width: "80%",
    alignSelf: "center",
    marginVertical: responsivePadding(10),
  },
  textValue: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    marginHorizontal: responsivePadding(10),
    fontWeight: "600",
  },
  otherPics: {
    flexDirection: "row",
    marginHorizontal: moderateScale(10),
    gap: moderateScale(10),
  },
  button: {
    width: "75%",
    backgroundColor: Colors.forgetPassword,
    alignItems: "center",
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
  },
  productText: {
    color: Colors.forgetPassword,
    fontSize: textScale(12),
    fontWeight: "bold",
    padding: moderateScale(10),
  },
  buttonHolder2: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  productHolder: {
    borderWidth: responsivePadding(1),
    marginVertical: responsivePadding(10),
    width: "95%",
    alignSelf: "center",
    borderRadius: responsivePadding(5),
    borderColor: Colors.text_grey,
    padding: responsivePadding(10),
    backgroundColor: Colors.white,
  },
  tcHolder: {
    width: "25%",
    alignItems: "center",
  },
  tcText: {
    fontSize: textScale(14),
    color: Colors.blue,
    fontFamily: FontFamily.Montserrat_SemiBold,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  innerView4: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveFontSize(15),
    marginHorizontal: responsiveFontSize(10),
  },
  returnHolder: {
    borderWidth: moderateScale(1),
    width: "80%",
    alignSelf: "center",
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    borderColor: Colors.border_color,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScaleVertical(20),
  },
  subView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconHolder: {
    borderWidth: moderateScale(0.5),
    width: "30%",
    padding: moderateScale(10),
    alignItems: "center",
    borderColor: Colors.text_grey,
    backgroundColor: Colors.white,
  },
  buttonHolder: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
  },
  unitHolder: {
    width: "50%",
    borderWidth: responsivePadding(2),
    padding: responsivePadding(15),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    borderColor: Colors.forgetPassword,
    backgroundColor: Colors.white,
  },
  countText: {
    color: Colors.forgetPassword,
    fontSize: textScale(22),
    width: "40%",
    textAlign: "center",
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  addText: {
    color: Colors.white,
    fontSize: textScale(15),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  descriptionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(10),
    backgroundColor: Colors.back,
  },
  touch: {
    width: "50%",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: moderateScale(2),
    borderColor: Colors.red,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: moderateScaleVertical(1),
    borderColor: Colors.text_grey,
    paddingVertical: moderateScaleVertical(10),
  },
  tableLabel: {
    color: Colors.text_grey,
    fontFamily: FontFamily.Montserrat_SemiBold,
    fontSize: textScale(15),
  },
  tableValue: {
    color: Colors.black,
    fontSize: textScale(15),
    marginHorizontal: moderateScale(10),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  relatedProductsHolder: {
    borderWidth: 2,
    width: "95%",
    padding: responsivePadding(10),
    alignSelf: "center",
    borderRadius: responsivePadding(5),
    backgroundColor: "white",
    marginVertical: responsivePadding(10),
    borderColor: Colors.border_grey,
  },
  loaderContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  loaderText: {
    fontSize: textScale(15),
    color: Colors.brandColor,
    textAlign: "center",
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  nanText: {
    fontSize: textScale(16),
    color: Colors.border_color,
    fontFamily: FontFamily.Montserrat_Bold,
    textAlign: "center",
    padding: moderateScale(20),
  },
  webView: {
    width: "95%",
    alignSelf: "center",
    height: moderateScale(350),
    borderColor: Colors.border_grey,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    marginBottom: moderateScaleVertical(10),
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    gap: moderateScale(10),
    flex: 0.65,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  loaderView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
  },
  activityIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  relatedView: {
    borderWidth: 2,
    borderColor: Colors.white,
    marginBottom: moderateScaleVertical(10),
    width: "95%",
    alignSelf: "center",
    padding: moderateScale(10),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(5),
  },
});
