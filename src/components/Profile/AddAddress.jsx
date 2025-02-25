import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Colors from "../Colors";
import Loading from "../General/loading";
import { useNavigation } from "@react-navigation/native";
import InternalHeader from "../header/InternalHeader";
import {
  ADD_ADDRESS,
  EDIT_ADDRESS,
  UPDATE_PROFILE,
} from "../../API/API_service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import { showMessage } from "react-native-flash-message";
import StateData from "../../assets/dummyjson/State.json";
import AntDesign from "react-native-vector-icons/AntDesign";

const AddAddress = ({ route }) => {
  const navigation = useNavigation();

  const { addressData, isUpdating, id, index } = route.params;
  console.log(addressData, "line 30");
  console.log(id, "Line 32");
  console.log(index, "Line 33");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(isUpdating ? addressData.name : "");
  const [address, setAddress] = useState(isUpdating ? addressData.address : "");
  const [city, setCity] = useState(isUpdating ? addressData.town : "");
  const [phone, setPhone] = useState(isUpdating ? addressData.mobile : "");
  const [gst, setGST] = useState(isUpdating ? addressData.gstin : "");
  const [pincode, setPinCode] = useState(isUpdating ? addressData.pincode : "");
  const [landmark, setLandmark] = useState(
    isUpdating ? addressData.landmark : ""
  );
  const [state, setState] = useState(isUpdating ? addressData.state : "");
  const [email, setEmail] = useState(isUpdating ? addressData.email : "");
  const [selectedState, setSelectedState] = useState(
    isUpdating ? addressData.state : ""
  );
  const [stateList, setStateList] = useState(StateData);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [searchStateText, setSearchStateText] = useState("");
  const validateGSTRegex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$/;
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return false;
    }
    const domainPart = email.split("@")[1];
    if (domainPart.includes("..")) {
      return false;
    }
    return true;
  };

  const handleSearchChange = (text) => {
    setSearchStateText(text); // Update search text

    if (text === "") {
      // If search text is empty, show the full state list
      setStateList(StateData);
    } else {
      // Filter states based on the search text (case-insensitive)
      const filteredStates = StateData.filter((stateName) =>
        stateName.name.toLowerCase().includes(text.toLowerCase())
      );
      setStateList(filteredStates);
    }
  };

  const handleStateSelection = (state) => {
    setSelectedState(state.name);
    setShowStateDropdown(false);
    setSearchStateText("");
  };

  const handleUpDateAddress = async () => {
    if (
      !name ||
      !address ||
      !city ||
      !phone ||
      !email ||
      !gst ||
      !pincode ||
      !landmark ||
      !selectedState
    ) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Please fill all fields..."
      })
      return;
    } else if (phone.length < 10) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Phone number must be 10 digits long!"
      })
      // Alert.alert("Error!", "Phone number must be 10 digits long!");
      return;
    } else if (pincode.length < 6) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Pincode must be at least of 6 digits!"
      })
      // Alert.alert("Error", "Pincode must be at least of 6 digits!");
      return;
    } else if (!validateEmail(email)) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Please enter valid Email Id!"
      })
      // Alert.alert("Invalid Email", "Please enter valid Email Id");
      return;
    } else if (!validateGSTRegex.test(gst)) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Please enter the valid GST Number!"
      })
      // Alert.alert("Invalid GST Number", "Please enter the valid GST Number");
      return;
    } else {
      setLoading(true);
      console.log("Clicked on the Update Address Button");
      try {
        const data = {
          id: id,
          addressIndex: index,
          updatedAddress: {
            name: name,
            mobile: phone,
            gstin: gst,
            address: address,
            pincode: pincode,
            landmark: landmark,
            town: city,
            state: selectedState,
            email: email,
          },
        };
        console.log(data, "line 86");
        const response = await EDIT_ADDRESS(data);
        console.log(response, "Line 88");
        if (response?.success === true) {
          showMessage({
            message: "Address added Successfully",
            type: "success",
            color: Colors.white,
            backgroundColor: Colors.green,
          });
          setLoading(false);
          navigation.goBack();
        } else {
          Alert.alert("Error", "Try Again");
          setLoading(false);
        }
      } catch (e) {
        Alert.alert("Error", "Something Went wrong Please try again");
        setLoading(false);
      }
    }
  };

  const handleAddress2 = async () => {
    console.log("Clicked on the Add Address Button");
    if (
      !name ||
      !address ||
      !city ||
      !phone ||
      !email ||
      !gst ||
      !pincode ||
      !landmark ||
      !selectedState
    ) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Please fill all fields..."
      })
      // Alert.alert("Error!", "Please fill all fields...");
      return;
    } else if (phone.length < 10) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Phone number must be 10 digits long!"
      })
      // Alert.alert("Error!", "Phone number must be 10 digits long!");
      return;
    } else if (!validateEmail(email)) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Please enter valid Email Id!"
      })
      // Alert.alert("Invalid Email", "Please enter valid Email Id");
      return;
    } else if (pincode.length < 6) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Pincode must be at least of 6 digits!"
      })
      // Alert.alert("Error", "Pincode must be at least of 6 digits!");
      return;
    } else if (!validateGSTRegex.test(gst)) {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Error! Please enter the valid GST Number!"
      })
      // Alert.alert("Invalid GST Number", "Please enter the valid GST Number");
      return;
    } else {
      try {
        const data = {
          id: id,
          newAddress: {
            name: name,
            mobile: phone,
            gstin: gst,
            address: address,
            pincode: pincode,
            landmark: landmark,
            town: city,
            state: selectedState,
            email: email,
          },
        };
        const response = await ADD_ADDRESS(data);
        // console.log(response,"Line 172")
        if (response?.success === true) {
          showMessage({
            message: "Address added Successfully",
            type: "success",
            color: Colors.white,
            backgroundColor: Colors.green,
          });
          navigation.goBack();
          // navigation.navigate("BottomNavigation");
        } else {
          showMessage({
            message: "Try Again, Address Not added",
            type: "error",
            color: Colors.white,
            backgroundColor: Colors.red,
          });
        }
        console.log(data, "line 171");
      } catch (e) {
        Alert.alert("Error", "Something went wrong");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ backgroundColor: Colors.white }} />
          <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
          <InternalHeader
            title={isUpdating ? "Update Address" : "Add Address"}
          />
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.formHolder}>
              <View>
                <Text style={styles.formTitle}>
                  Full Name
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  placeholder="Full Name"
                  value={name}
                  placeholderTextColor={Colors.black}
                  onChangeText={(value) => setName(value)}
                  style={styles.formInput}
                />
              </View>
              <View>
                <Text style={styles.formTitle}>
                  Mobile
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  value={phone}
                  onChangeText={(value) => setPhone(value)}
                  placeholder="Mobile Number"
                  placeholderTextColor={Colors.black}
                  keyboardType="number-pad"
                  maxLength={10}
                  style={styles.formInput}
                />
              </View>
              <View>
                <Text style={styles.formTitle}>
                  GSTIN
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  value={gst}
                  onChangeText={(value) => setGST(value)}
                  placeholder="GSTIN"
                  placeholderTextColor={Colors.black}
                  keyboardType="ascii-capable"
                  maxLength={15}
                  style={[styles.formInput, { textTransform: "uppercase" }]}
                />
              </View>
              <View>
                <Text style={styles.formTitle}>
                  Address
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  value={address}
                  onChangeText={(value) => setAddress(value)}
                  placeholder="Address"
                  placeholderTextColor={Colors.black}
                  style={styles.formInput}
                />
              </View>
              <View>
                <Text style={styles.formTitle}>
                  PIN CODE
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  value={pincode}
                  onChangeText={(value) => setPinCode(value)}
                  placeholder="Pin Code"
                  keyboardType="number-pad"
                  placeholderTextColor={Colors.black}
                  maxLength={6}
                  style={styles.formInput}
                />
              </View>
              <View>
                <Text style={styles.formTitle}>
                  Landmark
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  value={landmark}
                  onChangeText={(value) => setLandmark(value)}
                  placeholder="Landmark"
                  placeholderTextColor={Colors.black}
                  style={styles.formInput}
                />
              </View>
              <View>
                <Text style={styles.formTitle}>
                  Town/City
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  placeholder="Town / City"
                  value={city}
                  placeholderTextColor={Colors.black}
                  onChangeText={(value) => setCity(value)}
                  style={styles.formInput}
                />
              </View>
              <View>
                <Text style={styles.formTitle}>
                  Email address
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
                <TextInput
                  placeholder="Email"
                  autoCapitalize="none"
                  value={email}
                  placeholderTextColor={Colors.black}
                  onChangeText={(value) => setEmail(value)}
                  style={styles.formInput}
                />
              </View>
              {/* <View>
            <Text style={styles.formTitle}>
              State
              <Text style={{ color: "red" }}> *</Text>
            </Text>
            <TextInput
              placeholder="State"
              value={state}
              placeholderTextColor={Colors.black}
              onChangeText={(value) => setState(value)}
              style={styles.formInput}
            />
          </View> */}
              <View>
                <Text style={styles.formTitle}>
                  State
                  <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TouchableOpacity
                  style={styles.stateHolder}
                  onPress={() => setShowStateDropdown(!showStateDropdown)}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        color:
                          selectedState != null ? Colors.forgetPassword : "",
                      },
                    ]}
                  >
                    {selectedState || "Select State"}
                  </Text>
                  <View style={styles.iconHolder}>
                    <AntDesign
                      name="caretdown"
                      size={20}
                      color={Colors.border_color}
                    />
                  </View>
                </TouchableOpacity>
                {showStateDropdown && (
                  <View style={styles.dropdownContent}>
                    <TextInput
                      keyboardType="default"
                      label={"Search*"}
                      style={styles.formInput}
                      placeholderTextColor={Colors.text_grey}
                      onChangeText={handleSearchChange}
                      value={searchStateText}
                      placeholder="Search State"
                    />
                    {/* Use the filtered state list here */}
                    {stateList.length > 0 ? (
                      stateList.map((state, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.dropdownItem}
                          onPress={() => handleStateSelection(state)}
                        >
                          <Text style={styles.text}>{state.name}</Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text style={styles.text}>No states found</Text>
                    )}
                  </View>
                )}
              </View>
            </View>

            {loading ? (
              <Loading size={30} color={Colors.forgetPassword} />
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  isUpdating ? handleUpDateAddress() : handleAddress2()
                }
                style={styles.addressButton}
              >
                <Text style={styles.addressText}>
                  {isUpdating ? "Update Address" : "Add Address"}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  billingHeading: {
    color: Colors.forgetPassword,
    fontSize: textScale(18),
    fontFamily: FontFamily.Montserrat_SemiBold,
    marginLeft: moderateScale(10),
    marginTop: moderateScale(10),
  },
  formHolder: {
    width: "95%",
    alignSelf: "center",
    gap: moderateScale(10),
    marginVertical: moderateScaleVertical(10),
  },
  formTitle: {
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_SemiBold,
    fontSize: textScale(14),
  },
  formInput: {
    borderWidth: moderateScale(1),
    borderColor: Colors.border_color,
    marginVertical: moderateScaleVertical(10),
    color: Colors.forgetPassword,
    padding: moderateScale(10),
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
    borderRadius: moderateScale(5),
  },
  addressButton: {
    backgroundColor: Colors.forgetPassword,
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    width: moderateScale(300),
    alignSelf: "center",
    borderRadius: moderateScale(5),
    marginBottom: moderateScaleVertical(30),
  },
  addressText: {
    color: Colors.white,
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  upperHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScaleVertical(10),
  },
  changeText: {
    color: Colors.changeText,
    fontSize: textScale(13),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  stateHolder: {
    borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: moderateScale(5),
    borderColor: Colors.border_color,
    marginTop: moderateScaleVertical(10),
  },
  iconHolder: {
    width: "20%",
    padding: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    color: Colors.border_color,
    fontSize: textScale(16),
    fontFamily: FontFamily.Montserrat_SemiBold,
    padding: moderateScale(10),
    width: "80%",
  },
});
