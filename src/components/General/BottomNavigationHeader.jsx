import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ImagePath } from "../../utils/ImagePath";
import { moderateScale, textScale } from "../../utils/ResponsiveSize";
import { GET_TOTAL_CART_COUNT } from "../../API/API_service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontFamily from "../../utils/FontFamily";

const BottomNavigationHeader = ({ cartValueChanged }) => {
  console.log(cartValueChanged, "line 13");
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchCartCount();
  }, [isFocused, cartValueChanged]);

  const fetchCartCount = async () => {
    let user = await AsyncStorage.getItem("user_data");
    if (user !== null) {
      const userData = JSON.parse(user);
      const response = await GET_TOTAL_CART_COUNT(userData?._id);
      setCartCount(response?.data?.count || 0);
    }
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.main}>
      <View style={styles.itemHolder}>
        {/* Menu Icon */}
        <TouchableOpacity style={styles.menuHolder} onPress={openDrawer}>
          <Feather name="menu" color={Colors.black} size={textScale(25)} />
        </TouchableOpacity>

        {/* Header Logo */}
        <View style={styles.imageViewHolder}>
          <Image
            style={styles.imageStyle}
            source={ImagePath.headerImage}
            resizeMode={"contain"}
          />
        </View>

        {/* Favorite and Cart Icons */}
        <View style={styles.iconHolder}>
          <TouchableOpacity onPress={() => navigation.navigate("Favorite")}>
            <Feather name="heart" size={moderateScale(30)} color={Colors.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.push("Cart")}
            style={styles.cartContainer}
          >
            <Feather
              name="shopping-cart"
              size={moderateScale(30)}
              color={Colors.brandColor}
            />

            {cartCount >= 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomNavigationHeader;

const styles = StyleSheet.create({
  main: {
    padding: moderateScale(5),
    backgroundColor: Colors.white,
  },
  itemHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuHolder: {
    width: "15%",
    alignItems: "center",
  },
  imageViewHolder: {
    width: "50%",
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: moderateScale(45),
  },
  iconHolder: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  cartContainer: {
    position: "relative", // To position the cart badge relative to the cart icon
  },
  cartBadge: {
    backgroundColor: Colors.red,
    position: "absolute",
    right: -10,
    top: -5,
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    fontFamily: FontFamily.Montserrat_Regular,
    color: Colors.white,
    fontSize: textScale(12),
  },
});
