import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Colors from "../Colors";
import InternalHeader from "../header/InternalHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import FontFamily from "../../utils/FontFamily";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FastImage from "react-native-fast-image";

const Wishlist = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const placeholderImage = "https://prempackaging.com/img/logo.png";

  useEffect(() => {
    if (isFocused) {
      loadWishlist();
    }
  }, [isFocused]);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const storedWishlist = await AsyncStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
        // console.log(JSON.parse(storedWishlist), "Line 73");
       
        // console.log( storedWishlist?.images[0]?.image ,"Line 47")
      }
    } catch (error) {
      console.log("Error loading wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (item) => {
    try {
      const updatedWishlist = wishlist.filter(
        (wishlistItem) => wishlistItem._id !== item._id
      );
      setWishlist(updatedWishlist);
      await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      showMessage({
        message: "Product removed from wishlist",
        type: "info",
        color: Colors.white,
        backgroundColor: Colors.brandColor,
      });
    } catch (error) {
      console.log("Error removing from wishlist", error);
    }
  };

  const handleProductDetails = (item) => {
    navigation.navigate("ProductDetails", { item });
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
      <InternalHeader title={"Wishlist"} />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.brandColor} />
          <Text style={styles.loaderText}>Loading please wait...</Text>
        </View>
      ) : (
        <ScrollView>
          {wishlist.length === 0 ? (
            <View style={styles.emptyView}>
              <Text style={styles.loaderText}>Your Wishlist is empty!</Text>
            </View>
          ) : (
            wishlist.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => handleProductDetails(item)}
              >
                <View style={styles.cartImageHolder}>
                  <FastImage
                    style={styles.cartImage}
                    source={{
                      uri: item?.images[0]?.image || placeholderImage, // Fallback to placeholder if image is undefined
                      priority: FastImage.priority.high,
                      cache: FastImage.cacheControl.immutable, // Improve caching reliability
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    onError={() =>
                      setWishlist((prevWishlist) =>
                        prevWishlist.map((wishlistItem) =>
                          wishlistItem._id === item._id
                            ? {
                                ...wishlistItem,
                                images: [{ image: placeholderImage }],
                              }
                            : wishlistItem
                        )
                      )
                    }
                  />
                </View>
                <View style={styles.nameHolder}>
                  <Text
                    style={[
                      styles.orderTitle,
                      { color: Colors.forgetPassword },
                    ]}
                  >
                    {item.name} {item?.slug}
                  </Text>
                  <Text style={styles.orderTitle}>
                    ({item.size_inch}) INCHES
                  </Text>
                </View>
                <View style={styles.priceHolder}>
                  <TouchableOpacity
                    onPress={() => handleRemoveFromWishlist(item)}
                  >
                    <Text style={styles.deleteText}>Remove</Text>
                  </TouchableOpacity>
                  <Text style={styles.priceText}>
                    ₹ {item.priceList[0]?.SP}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.back,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    width: "95%",
    alignSelf: "center",
    marginTop: moderateScaleVertical(10),
    elevation: moderateScale(5),
    borderRadius: moderateScale(10),
    gap: moderateScale(15),
  },
  cartImage: {
    width: moderateScale(75),
    height: moderateScale(75),
    borderRadius: moderateScale(10),
  },
  cartImageHolder: {
    padding: moderateScale(20),
    width: "20%",
    alignItems: "center",
  },
  orderTitle: {
    color: Colors.black,
    textTransform: "uppercase",
    fontSize: textScale(12),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  deleteText: {
    color: Colors.red,
    fontSize: textScale(12),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  nameHolder: {
    width: "50%",
    marginTop: moderateScaleVertical(10),
    gap: moderateScale(10),
  },
  priceHolder: {
    width: "20%",
    alignItems: "center",
    gap: moderateScale(10),
  },
  priceText: {
    color: Colors.black,
    fontFamily: FontFamily.Montserrat_SemiBold,
    fontSize: textScale(14),
  },
  emptyView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: moderateScale(50),
  },
  loaderContainer1: {
    width: "90%",
    alignSelf: "center",
    paddingBottom: moderateScaleVertical(10),
    borderRadius: moderateScale(10),
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderView1: {
    position: "absolute",
    width: "100%",
    top: moderateScale(30),
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    fontFamily: FontFamily.Montserrat_SemiBold,
    color: Colors.black,
    textAlign: "center",
    fontSize: textScale(15),
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(10),
    backgroundColor: Colors.white,
  },
});
