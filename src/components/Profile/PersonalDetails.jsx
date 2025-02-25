import {
  Image,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  PencilIcon,
  CameraIcon,
  PhotoIcon,
} from "react-native-heroicons/solid";
import Colors from "../Colors";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  GET_SPECIFIC_USER_DETAILS,
  UPDATE_PROFILE,
} from "../../API/API_service";
import Loading from "../General/loading";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import InternalHeader from "../header/InternalHeader";
import { ImagePath } from "../../utils/ImagePath";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import CustomBottomModal from "../General/CustomBottomModal";
import { showMessage } from "react-native-flash-message";

const PersonalDetails = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [isGenderModalVisible, setShowGenderModal] = useState(false);
  const isFocused = useIsFocused();
 
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  

  const indianPhoneRegex = /^(?:\+91|91)?[-\s]?[6-9]\d{9}$/;

  

  useEffect(() => {
    fetchSpecificUser(user?._id);
  }, [isFocused]);

  const fetchSpecificUser = async (id) => {
    // console.log(id, "Line 84");
    const response = await GET_SPECIFIC_USER_DETAILS(id);
    // console.log(response, "Line 69");
    if (response?.success === true) {
      setFirstName(response?.data?.first_name);
      setLastName(response?.data?.last_name);
      setEmail(response?.data?.email_address);
      setMobile(response?.data?.mobile_number);
      setGender(response?.data?.gender);
      setLoading(false);
    } else {
      Alert.alert(
        "Error",
        "Something Went Wrong Please try again after sometimes."
      );
    }
  };

  const genderData = [{ title: "Male" }, { title: "Female" }];

  const pickImageFromCamera = async () => {
    console.log("Camera");
    let options = {
      mediaType: "photos",
      quality: 0.1,
    };
    const result = await launchCamera(options);
    console.log(result);
    if (!result.didCancel) {
      setImage(result?.assets[0]?.uri);
      setShowModal(false);
    }
  };

  const pickImageFromGallery = async () => {
    console.log("Gallery");
    let options = {
      mediaType: "photos",
      quality: 0.1,
    };
    const result = await launchImageLibrary(options);
    console.log("Gallery", result);
    if (!result.didCancel) {
      setImage(result?.assets[0]?.uri);
      setShowModal(false);
    }
  };

  const updateUserProfile = async () => {
    if (!firstName || !lastName || !mobile || !email) {
    showMessage({
      type:'danger',
      icon:'danger',
      message:"Please fill all the details"
    })
      return;
    }
    if(!emailRegex.test(email))
    {
      showMessage({
        type:'danger',
        icon:'danger',
        message:"Please enter valid email id"
      })
      return ;
    }
    if(!indianPhoneRegex.test(mobile))
      {
        showMessage({
          type:'danger',
          icon:'danger',
          message:"Please enter valid mobile number"
        })
        return ;
      }
    let data = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobile,
      email: email,
      id: user?._id,
    };
    console.log("Payload:", data);
    setLoading(true);
    try {
      const response = await UPDATE_PROFILE(data);
      console.log(response, "line 128");
      setLoading(false);
      if (response?.success) {
        showMessage({
          icon:'success',
          type:'success',
          message:"User Profile Updated Successfully..."
        })
        // Alert.alert("Profile", "User Profile Updated Successfully...");
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.white }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <InternalHeader title={"Profile Details"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: moderateScaleVertical(30) }}
      >
        {/* Image  */}
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          {/* <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>
              {firstName.charAt(0).toUpperCase()}
              {lastName.charAt(0).toUpperCase()}
            </Text>
          </View> */}

          {/* <Image
            source={image ? { uri: image } : ImagePath.user}
            style={styles.imageStyle}
            resizeMode="cover"
          /> */}
          {/* <Pressable onPress={() => setShowModal(true)} style={styles.editIcon}>
            <PencilIcon size={textScale(20)} color={Colors.forgetPassword} />
          </Pressable> */}

          {/* <Text style={styles.uploadImageButton}>Upload image</Text> */}
        </View>
        {/* form inputs */}
        <View style={styles.formHolder}>
          <Text style={styles.formTitle}>First Name </Text>
          <View style={styles.inputBox}>
            <UserIcon size={textScale(25)} color={Colors.border_color} />
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={(value) => setFirstName(value)}
              placeholder="John"
              placeholderTextColor={Colors.border_color}
            />
          </View>

          <Text style={styles.formTitle}>Last Name </Text>
          <View style={styles.inputBox}>
            <UserIcon size={textScale(25)} color={Colors.border_color} />
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(value) => setLastName(value)}
              placeholder="Doe"
              placeholderTextColor={Colors.border_color}
            />
          </View>

          <Text style={styles.formTitle}>Email</Text>
          <View style={styles.inputBox}>
            <EnvelopeIcon size={textScale(25)} color={Colors.border_color} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(value) => setEmail(value)}
              placeholder="example@gmail.com"
              placeholderTextColor={Colors.border_color}
            />
          </View>

          <Text style={styles.formTitle}>Mobile Number</Text>
          <View style={styles.inputBox}>
            <PhoneIcon size={textScale(25)} color={Colors.border_color} />
            <TextInput
              style={styles.input}
              value={mobile}
              onChangeText={(value) => setMobile(value)}
              placeholder="1234#####"
              maxLength={10}
              placeholderTextColor={Colors.border_color}
            />
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.btnContainer}>
          {loading ? (
            <Loading size={textScale(30)} color={Colors.forgetPassword} />
          ) : (
            <TouchableOpacity
              onPress={() => updateUserProfile()}
              activeOpacity={0.9}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {/* Modal Popup */}
      <CustomBottomModal
        visible={isGenderModalVisible}
        message={"Choose Gender"}
        hideModal={() => setShowGenderModal(false)}
        data={genderData}
        selectedValue={(text) => {
          setGender(text);
          setShowGenderModal(false);
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <TouchableOpacity
              onPress={() => pickImageFromCamera()}
              style={styles.modalButton}
            >
              <CameraIcon size={25} color={Colors.forgetPassword} />
              <Text style={{ color: Colors.forgetPassword }}> Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => pickImageFromGallery()}
              style={styles.modalButton}
            >
              <PhotoIcon size={25} color={Colors.forgetPassword} />
              <Text style={{ color: Colors.forgetPassword }}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  imageStyle: {
    height: moderateScale(100),
    width: moderateScale(100),
    marginTop: moderateScaleVertical(20),
    borderRadius: moderateScale(10),
  },
  editIcon: {
    backgroundColor: "white",
    position: "absolute",
    top: moderateScale(95),
    left: moderateScale(80),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  uploadImageButton: {
    color: Colors.forgetPassword,
    marginTop: moderateScaleVertical(20),
    fontSize: textScale(16),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  formHolder: {
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  formTitle: {
    color: Colors.black,
    fontSize: textScale(16),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: Platform.OS === "android" ? moderateScale(5) : moderateScale(10),
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: moderateScale(10),
    marginVertical: moderateScaleVertical(10),
  },
  input: {
    flex: 1,
    marginLeft: moderateScale(10),
    fontSize: textScale(16),
    color: Colors.border_color,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  btnContainer: {
    width: moderateScale(300),
    marginTop: moderateScaleVertical(20),
    alignSelf: "center",
  },
  btn: {
    backgroundColor: Colors.forgetPassword,
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    borderRadius: moderateScale(10),
  },
  btnText: {
    color: Colors.white,
    fontSize: textScale(16),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  modalView: {
    backgroundColor: Colors.white,
    width: "100%",
    bottom: moderateScale(2),
    height: moderateScale(60),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    position: "absolute",
  },
  modalButtonView: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: moderateScale(10),
  },
  modalButton: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScaleVertical(30),
  },
  initialsContainer: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(75),
    backgroundColor: Colors.brandColor,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: moderateScale(20),
  },
  initialsText: {
    fontSize: textScale(40),
    color: Colors.white,
    fontFamily: FontFamily.Montserrat_Bold,
  },
});
