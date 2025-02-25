import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../components/Colors";
import BottomNavigationHeader from "../../components/General/BottomNavigationHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImagePath } from "../../utils/ImagePath";
import {
  UserIcon,
  ShoppingCartIcon as CartSolid,
  HeartIcon,
  TruckIcon,
} from "react-native-heroicons/solid";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import LogoutIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import { GET_SPECIFIC_USER_DETAILS } from "../../API/API_service";
import { showMessage } from "react-native-flash-message";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchLoginData();
  }, [isFocused]);

  const fetchLoginData = async () => {
    try {
      const userStr = await AsyncStorage.getItem("user_data");
      if (userStr) {
        const userData = JSON.parse(userStr);
        // console.log(userData?._id, "Line 42");
        const response = await GET_SPECIFIC_USER_DETAILS(userData?._id);
        setUser(response?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    showMessage({
      type:'success',
      icon:'success',
      message:"Success,You are successfully logout"
    })
    AsyncStorage.clear();
    navigation.replace("Drawer");
    // console.log("clicked on Logout section");
    // Alert.alert("Logout", "Are you sure you want to logout!!", [
    //   {
    //     text: "Cancel",
    //     style: "cancel",
    //   },
    //   {
    //     text: "OK",
    //     onPress: async () => {
    //       AsyncStorage.clear();
    //       navigation.replace("Drawer");
    //     },
    //   },
    // ]);
  };
  return (
    <View style={styles.main}>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <BottomNavigationHeader />
      {/* Name and image and their details sections */}
      <View style={[user ? styles.personDetails : styles.overlay]}>
        <View style={[styles.userImageContainer]}>
          {/* <Image
            source={ImagePath.defaultUserImage}
            style={styles.userImage}
            resizeMode="cover"
          /> */}
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>
              {user?.first_name
                ? user?.first_name?.charAt(0).toUpperCase()
                : "N"}
              {user?.last_name ? user?.last_name?.charAt(0).toUpperCase() : "A"}
            </Text>
          </View>
        </View>
        <View style={styles.nameHolder}>
          <Text style={styles.userName}>
            {(user && `${user.first_name} ${user.last_name}`) || "Full Name"}
          </Text>
          <Text style={styles.userEmail}>
            {(user && `${user?.email_address}`) || "email@email.com"}
          </Text>
        </View>
      </View>
      {/* Account Related Information */}
      <View style={styles.lowerView}>
        {/* Personal Details */}
        <TouchableOpacity
          style={[styles.listItemHolder, { opacity: user ? 1 : 0.3 }]}
          disabled={!user}
          onPress={() => navigation.push("PersonalDetails", { user: user })}
        >
          <View style={styles.iconContainer}>
            <UserIcon size={textScale(25)} color={Colors.black} />
          </View>
          <View style={styles.textHolder}>
            <Text style={styles.listNameText}>Personal Details</Text>
          </View>
          <View
            style={[styles.iconContainer, { backgroundColor: Colors.white }]}
          >
            <ChevronRightIcon size={textScale(20)} color={Colors.black} />
          </View>
        </TouchableOpacity>
        {/* My Order*/}
        <TouchableOpacity
          style={[styles.listItemHolder, { opacity: user ? 1 : 0.3 }]}
          disabled={!user}
          onPress={() => navigation.navigate("My Order", { user: user })}
        >
          <View style={styles.iconContainer}>
            <CartSolid size={textScale(25)} color={Colors.black} />
          </View>
          <View style={styles.textHolder}>
            <Text style={styles.listNameText}>My Order</Text>
          </View>
          <View
            style={[styles.iconContainer, { backgroundColor: Colors.white }]}
          >
            <ChevronRightIcon size={textScale(20)} color={Colors.black} />
          </View>
        </TouchableOpacity>
        {/* WishList Sections */}
        <TouchableOpacity
          style={[styles.listItemHolder, { opacity: user ? 1 : 0.3 }]}
          disabled={!user}
          onPress={() => navigation.push("WishList2")}
        >
          <View style={styles.iconContainer}>
            <HeartIcon size={textScale(25)} color={Colors.black} />
          </View>
          <View style={styles.textHolder}>
            <Text style={styles.listNameText}>Wishlist</Text>
          </View>
          <View
            style={[styles.iconContainer, { backgroundColor: Colors.white }]}
          >
            <ChevronRightIcon size={textScale(20)} color={Colors.black} />
          </View>
        </TouchableOpacity>
        {/* Shipping Address */}
        <TouchableOpacity
          style={[styles.listItemHolder, { opacity: user ? 1 : 0.3 }]}
          disabled={!user}
          onPress={() =>
            navigation.navigate("Shipping Address", {
              routeName: "Profile Address",
              user: user,
            })
          }
        >
          <View style={styles.iconContainer}>
            <TruckIcon size={textScale(25)} color={Colors.black} />
          </View>
          <View style={styles.textHolder}>
            <Text style={styles.listNameText}>Shipping Address</Text>
          </View>
          <View
            style={[styles.iconContainer, { backgroundColor: Colors.white }]}
          >
            <ChevronRightIcon size={textScale(20)} color={Colors.black} />
          </View>
        </TouchableOpacity>
      </View>
      {/* Logout Button Sections */}
      <View style={styles.logoutButtonView}>
        <TouchableOpacity
          onPress={() => (user ? handleLogout() : navigation.navigate("Login"))}
          style={styles.logoutHolder}
        >
          <LogoutIcon name="logout" color={Colors.red} size={textScale(30)} />
          <Text style={styles.listNameText}>
            {user ? "Logout" : "Log In /Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.back,
  },
  personDetails: {
    width: "90%",
    backgroundColor: "white",
    elevation: moderateScale(10),
    marginTop: moderateScaleVertical(15),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: "center",
    flexDirection: "row",
    gap: moderateScaleVertical(10),
    borderWidth: moderateScale(0.3),
    borderColor: Colors.border_color,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
  },
  userImageContainer: {
    height: moderateScale(70),
    width: moderateScale(70),
    alignItems: "center",
  },
  userImage: {
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: moderateScale(5),
    alignSelf: "center",
  },
  userName: {
    color: Colors.black,
    fontSize: textScale(15),
    fontFamily: FontFamily.Montserrat_Bold,
  },
  userEmail: {
    color: "gray",
    marginTop: moderateScaleVertical(5),
    fontFamily: FontFamily.Montserrat_Regular,
    fontSize: textScale(13),
  },
  nameHolder: {
    gap: moderateScale(3),
    justifyContent: "center",
  },
  lowerView: {
    width: "90%",
    alignSelf: "center",
    marginTop: "5%",
    padding: moderateScale(10),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    elevation: moderateScale(10),
    gap: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
  },
  listItemHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  iconContainer: {
    width: "15%",
    backgroundColor: Colors.backGround_grey,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignItems: "center",
  },
  textHolder: {
    width: "65%",
  },
  listNameText: {
    fontSize: textScale(16),
    color: Colors.brandColor,
    padding: moderateScale(10),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  logoutButtonView: {
    backgroundColor: "white",
    alignSelf: "center",
    width: "90%",
    marginTop: moderateScaleVertical(20),
    borderWidth: 0.3,
    elevation: moderateScale(10),
    borderColor: Colors.border_color,
    borderRadius: moderateScale(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
  },
  logoutHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    padding: moderateScale(10),
  },
  overlay: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.8)",
    marginTop: moderateScaleVertical(15),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: "center",
    flexDirection: "row",
    gap: moderateScale(10),
    borderWidth: 0.3,
    borderColor: Colors.border_color,
  },
  initialsContainer: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(75),
    backgroundColor: Colors.brandColor,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginVertical: moderateScale(20),
  },
  initialsText: {
    fontSize: textScale(20),
    color: Colors.white,
    fontFamily: FontFamily.Montserrat_Bold,
  },
});
