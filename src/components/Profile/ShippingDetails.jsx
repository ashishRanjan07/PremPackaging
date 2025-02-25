import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Colors";
import InternalHeader from "../header/InternalHeader";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  GET_SPECIFIC_USER_DETAILS,
  REMOVE_ADDRESS,
} from "../../API/API_service";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import { showMessage } from "react-native-flash-message";

const shippingDetails = ({ route }) => {
  const { routeName, cartProducts, user, discountedAmount } = route.params;
  console.log(routeName, "line 25");
  // console.log(cartProducts,"line 31");
  console.log(user,"Line 32");
  console.log(discountedAmount,"Line 33")
  const navigation = useNavigation();
  const [userAddress, setUserAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchSpecificUser(user?._id);
  }, [isFocused]);

  const handleUpdateAddress = (selectedAddress) => {
    navigation.navigate("AddAddress", {
      addressData: selectedAddress,
      isUpdating: true,
    });
  };

  const handleAddAddress = () => {
    navigation.navigate("AddAddress", {
      isUpdating: false,
    });
  };

  const fetchSpecificUser = async (id) => {
    setLoading(true);
    const response = await GET_SPECIFIC_USER_DETAILS(id);
    // console.log(response, "Line 30");
    if (response?.success) {
      console.log(response?.data?.contact_address,"Line 60")
      setUserAddress(response?.data?.contact_address);
      setLoading(false);
    } else {
      Alert.alert("Error", "Something went wrong");
      setLoading(false);
    }
  };

  const handleRemove = async (index) => {
    // console.log("Clicked on the Remove Button", index);
    try {
      const data = {
        id: user?._id,
        addressIndex: index,
      };
      // console.log(data, "Line 70");
      const response = await REMOVE_ADDRESS(data)
      if(response?.success===true){
        showMessage({
          message: "Address deleted Successfully",
          type: "success",
          color: Colors.white,
          backgroundColor: Colors.green,
        });
        fetchSpecificUser(user?._id)
      }
      else{
        Alert.alert("Error","Unable to remove the Address")
      }
    } catch (e) {
      Alert.alert("Error", "Unable to Remove the Address, Try again");
    }

  };
  const handleSelectAddress = async (item) => {
    console.log("clicked on select address");
    navigation.navigate("Final Review", {
      contact_address: item,
      cartProducts: cartProducts,
      user: user,
      discountedAmount: discountedAmount,
    });
  };

  const handleAddAddress2 = async () => {
    console.log("Clicked on the Add Address", user?._id);
    navigation.navigate("AddAddress", { id: user?._id });
    // const data = {
    //   id:user?._id,
    //   newAddress:{
    //     "name": "John Doe",
    //     "mobile": "9876543210",
    //     "gstin": "22ABCDE1234F2Z5",
    //     "address": "123, ABC Street",
    //     "pincode": "110001",
    //     "landmark": "Near XYZ Mall",
    //     "town": "New Delhi",
    //     "state": "Delhi",
    //     "email": "john.doe@example.com"
    //   }

    // }
  };

  const handleEditAddress = async (item, index) => {
    console.log("Clicked on the Edit Address Options", item);
    console.log(index, "Line 98");
    navigation.navigate("AddAddress", {
      isUpdating: true,
      addressData: item,
      id: user?._id,
      index: index,
    });
  };
  const displayAddressCard = ({ item, index }) => {
    console.log(item,"Line 136")
    return (
      <View style={styles.selectAddressCard} key={index}>
        <View style={styles.innerView}>
          <Text style={styles.customerName}>{item?.name || "N/A"}</Text>
          <View style={styles.view}>
            <TouchableOpacity onPress={() => handleEditAddress(item, index)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            {routeName === "Billing Address" && (
            <Text style={styles.editText}>|</Text>
            )}
            {routeName === "Billing Address" && (
              <>
                {/* <Text style={styles.editText}>|</Text> */}
                <TouchableOpacity onPress={() => handleRemove(index)}>
                  <Text style={styles.editText}>Remove</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

         <View style={styles.view}>
          <Text style={styles.selectText}>Address:</Text>
          <Text style={styles.selectText1}>
            {item?.address + item?.landmark || "N/A"}
          </Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.selectText}>City: </Text>
          <Text style={styles.selectText1}>{item?.town || "N/A"}</Text>
        </View> 
        <View style={styles.view}>
          <Text style={styles.selectText}>State: </Text>
          <Text style={styles.selectText1}>{item?.state || "N/A"}</Text>
        </View> 

        <View style={styles.view}>
          <Text style={styles.selectText}>Pin code: </Text>
          <Text style={styles.selectText1}>{item?.pincode || "N/A"}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.selectText}>Mobile Number: </Text>
          <Text style={styles.selectText1}>{`+91 ${item?.mobile}`} </Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.selectText}>GSTIN: </Text>
          <Text style={styles.selectText1}>{item?.gstin}</Text>
        </View>
        {routeName === "Billing Address" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={()=>handleSelectAddress(item)}
              activeOpacity={0.9}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Select Address</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <InternalHeader title={"Shipping Details"} />
       {loading ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size={textScale(30)} color={Colors.brandColor} />
          <Text style={styles.loaderText}>Loading Address Data</Text>
        </View>
      ) : (
        <View style={styles.scrollView}>
          <View style={{ flex: 1 }}>
            {userAddress?.length > 0 ? (
              <FlatList
                data={userAddress}
                renderItem={displayAddressCard}
                keyExtractor={(index) => index}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.noAddressContainer}>
                <Text style={styles.noAddressText}>No address available</Text>
              </View>
            )} 
          </View>
          {routeName === "Billing Address" && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleAddAddress2}
                activeOpacity={0.9}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Add Address</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )} 
    </View>
  );
};

export default shippingDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.back,
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    width: moderateScale(300),
    alignSelf: "center",
    marginVertical: moderateScaleVertical(15),
  },
  buttonText: {
    fontSize: textScale(14),
    color: Colors.white,
    textTransform: "uppercase",
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  button: {
    backgroundColor: Colors.forgetPassword,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  selectAddressCard: {
    marginVertical: moderateScaleVertical(10),
    borderWidth: moderateScale(0.3),
    borderColor: Colors.border_color,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    width: "95%",
    alignSelf: "center",
    gap: moderateScale(5),
  },
  customerName: {
    color: Colors.forgetPassword,
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  editText: {
    color: Colors.forgetPassword,
    fontSize: textScale(12),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  selectText: {
    fontSize: textScale(14),
    color: Colors.black,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  selectText1: {
    color: Colors.border_color,
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_Regular,
    width: "75%",
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(10),
  },
  loaderText: {
    fontSize: textScale(16),
    color: Colors.brandColor,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  innerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noAddressContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScaleVertical(20),
  },
  noAddressText: {
    fontSize: textScale(16),
    color: "red",
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
});
