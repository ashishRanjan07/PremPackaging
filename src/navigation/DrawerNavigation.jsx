import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  responsiveFontSize,
  responsivePadding,
} from "../components/Responsive";
import Colors from "../components/Colors";
import BottomNavigation from "./BottomNavigation";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import data from "../assets/dummyjson/DrawerCategory.json";
import Feather from "react-native-vector-icons/Feather";
import {
  GET_ALL_PRODUCTS,
  GET_SPECIFIC_USER_DETAILS,
} from "../API/API_service";
import { moderateScale, moderateScaleVertical, textScale } from "../utils/ResponsiveSize";

function CustomDrawerContent(props) {
  const [expanded, setExpanded] = useState(false);
  const [id, setId] = useState(null);
  const [tape, setTape] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const user = route?.params?.userData;

  useEffect(() => {
    fetchLocalData();
    getAllProducts();
  }, [isFocused]);

  const fetchLocalData = async () => {
    try {
      const userStr = await AsyncStorage.getItem("user_data");
      if (userStr) {
        const userData = JSON.parse(userStr);
        // console.log(userData?._id, "Line 42");
        const response = await GET_SPECIFIC_USER_DETAILS(userData?._id);
        setLocalUser(response?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await GET_ALL_PRODUCTS();
      // console.log(response?.data, 'All Products Line 34:');
      if (response && response?.data) {
        setAllProducts(response?.data);
      }
    } catch (e) {
      console.log("Error fetching Products", e?.message);
    }
  };

  const closeDrawer = () => {
    props.navigation.closeDrawer();
  };
  const handlePress = () => setExpanded(!expanded);
  const handleTapePress = () => setTape(!tape);

  const navigateToCategory = (category) => {
    console.log(category);
    navigation.navigate("CategoryDetails", { name: category });
    closeDrawer();
  };

  const handleCategoryClick = (item) => {
    closeDrawer();
    navigation.navigate("CategoryDetailsTwo", {
      categories: item,
      data: allProducts.filter(
        (items) => items.category?._id === item?.category_id
      ),
      option: "cat",
    });
  };

  const handleSubCategoryClicked = (item) => {
    closeDrawer();
    navigation.navigate("CategoryDetailsTwo", {
      categories: item,
      data: allProducts.filter(
        (items) => items.sub_category === item?.category_id
      ),
      option: "cat",
    });
  };

  const handleSubMenuList = (item) => {
    if (item?.id === id) {
      setId(null);
    } else {
      setId(item?.id);
    }
    console.log("submenu List Clicked", item);
  };

  const handleWhatsappClicked = async () => {
    const phone = "+918447247227"; // Phone number with country code
    const message = "Hi, I have an enquiry about the product."; // Default message
    const url = `whatsapp://send?text=${encodeURIComponent(
      message
    )}&phone=${phone}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp is not installed on your device.");
      }
    } catch (e) {
      console.log("Error opening WhatsApp", e);
    }
  };

  // Handle phone call click
  const handleCallClicked = async () => {
    const phone = "+918447247227";
    const url = `tel:${phone}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open the phone dialer.");
      }
    } catch (e) {
      console.log("Error making phone call", e);
    }
  };

  const renderItem2 = ({ item }) => {
    const handleItemPress = () => {
      if (
        item?.name === "Bopp Tape" ||
        item?.name === "Paper Tape" ||
        item?.name === "Speciality Tape"
      ) {
        handleCategoryClick(item);
      } else {
        handleSubCategoryClicked(item);
      }
    };

    return (
      <TouchableOpacity
        style={styles.internalItem}
        // onPress={() => handleSubCategoryClicked(item)}
        onPress={handleItemPress}
      >
        <Text style={[styles.nameText,{fontSize:textScale(15)}]}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View key={item?.id}>
        <TouchableOpacity
          style={styles.itemHolder}
          onPress={() => {
            item?.subMenu ? handleSubMenuList(item) : handleCategoryClick(item);
          }}
        >
          <Text style={styles.nameText}>{item?.name}</Text>
          {item?.subMenu ? (
            <AntDesign
              name="caretdown"
              color={Colors.brandColor}
              size={textScale(15)}
            />
          ) : // <AntDesign
          //   name="caretright"
          //   color={Colors.brandColor}
          //   size={responsiveFontSize(24)}
          // />
          null}
        </TouchableOpacity>
        {item?.subMenu && item?.id === id && (
          <FlatList
            data={item?.subMenu}
            renderItem={renderItem2}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ backgroundColor: Colors.forgetPassword }} />
      <View style={styles.upperView}>
        <FontAwesome5
          name="user-circle"
          color={Colors.red}
          size={textScale(40)}
        />
        <View style={{ gap: moderateScale(5) }}>
          <Text style={styles.userName}>
            {(localUser &&
              `${localUser?.first_name} ${localUser?.last_name}`) ||
              "Full Name"}
          </Text>
        </View>
        <TouchableOpacity style={styles.iconView} onPress={closeDrawer}>
          <AntDesign
            name="close"
            color={Colors.white}
            size={textScale(25)}
          />
        </TouchableOpacity>
      </View>
      {/* Show the list */}
      <View style={{ padding: moderateScale(10) }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
        <TouchableOpacity
          style={styles.iconHolder}
          onPress={handleWhatsappClicked}
        >
          <FontAwesome
            name="whatsapp"
            color={Colors.red}
            size={textScale(30)}
          />
          <Text style={[styles.nameText, { fontSize: textScale(16) }]}>
            +918447247227
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconHolder} onPress={handleCallClicked}>
          <Feather
            name="phone-call"
            color={Colors.red}
            size={textScale(30)}
          />
          <Text style={[styles.nameText, { fontSize: textScale(16) }]}>
            +918447247227
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  return (
    <Drawer.Navigator 
    screenOptions={{drawerType:'front'}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Dashboard"
    >
      
      <Drawer.Screen
        name="Dashboard"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  upperView: {
    backgroundColor: Colors.forgetPassword,
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    padding: moderateScale(10),
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  emailText: {
    fontSize: textScale(14),
    color: Colors.white,
    fontWeight: "400",
  },
  iconView: {
    position: "absolute",
    right: "3%",
  },
  userName: {
    fontSize: textScale(16),
    fontWeight: "500",
    color: Colors.white,
  },
  itemHolder: {
    borderRadius: moderateScale(5),
    backgroundColor: Colors.yellow_background,
    marginVertical: moderateScaleVertical(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(5),
  },
  nameText: {
    fontSize: textScale(16),
    color: Colors.brandColor,
    fontWeight: "600",
    padding: moderateScale(10),
    textTransform:'uppercase'
  },
  internalItem: {
    borderRadius: moderateScale(5),
    width: "90%",
    alignSelf: "flex-end",
    marginVertical: moderateScaleVertical(5),
    backgroundColor: Colors.yellow_background,
    paddingHorizontal: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconHolder: {
    borderWidth: 2,
    flexDirection: "row",
    gap: textScale(20),
    alignItems: "center",
    marginVertical: moderateScaleVertical(5),
    padding: moderateScale(8),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.yellow_background,
    borderColor: Colors.yellow_background,
  },
});
