import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../components/Colors";
import Feather from "react-native-vector-icons/Feather";
import { LockClosedIcon } from "react-native-heroicons/outline";
import Loading from "../../../components/General/loading";
import { CHANGE_PASSWORD } from "../../../API/API_service";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../../utils/ResponsiveSize";
import FontFamily from "../../../utils/FontFamily";
import { ImagePath } from "../../../utils/ImagePath";

const UpdatePassword = (props) => {
  const navigation = useNavigation();
  const { email } = props.route.params;
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newPassword.length > 0) {
      setErrorText("");
      setNewPasswordError("");
    }
    if (confirmPassword.length > 0) {
      setErrorText("");
      setConfirmPasswordError("");
    }
  }, [newPassword, confirmPassword]);
  const handleSubmit = async () => {
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      // setErrorText("Passwords,Please fill the passwords!");
      setNewPasswordError("Please enter the new password!!");
      setConfirmPasswordError("Please enter the confirm password!!");
      return;
    }

    if (newPassword.length < 8 || confirmPassword.length < 8) {
      setErrorText("Password must be 8 characters long!!!");
      return;
    } else if (newPassword !== confirmPassword) {
      setErrorText("Both passwords must be same!!");
      return;
    } else {
      setIsLoading(true);
      let payload = {
        email_address: email,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      console.log(payload);
      try {
        const response = await CHANGE_PASSWORD(payload);
        console.log(response, "Line 74");

        setIsLoading(false);
        if (response && response?.message === "Password updated successfully") {
          navigation.replace("SuccessScreen", { come: "forgetPassword" });
          // Alert.alert(
          //   "Success",
          //   "Your Password has been changed successfully",
          //   [{ text: "OK", onPress: () => navigation.navigate("SuccessScreen") }]
          // );
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ backgroundColor: Colors.forgetPassword }} />
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.forgetPassword}
      />
      <View style={{ width: "100%", backgroundColor: Colors.forgetPassword }}>
        <Text style={styles.loginText}>Set a New Password</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: Colors.forgetPassword }}>
        <ImageBackground
          style={styles.bgImage}
          source={ImagePath.loginBg}
          resizeMode="stretch"
        >
          <View style={styles.v1}>
            <ScrollView>
              <View style={styles.contentContainer}>
                <Text style={styles.inputText}>New Password</Text>
                <View style={styles.inputBox}>
                  <LockClosedIcon
                    size={textScale(25)}
                    color={Colors.border_color}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    value={newPassword}
                    onChangeText={(value) => setNewPassword(value)}
                    placeholderTextColor={Colors.border_color}
                    secureTextEntry={!showPassword}
                  />
                  <Feather
                    onPress={() => setShowPassword(!showPassword)}
                    name={showPassword ? "eye" : "eye-off"}
                    size={textScale(20)}
                    color={Colors.border_color}
                  />
                </View>
                {newPasswordError && (
                  <Text style={styles.errorText}>{newPasswordError}</Text>
                )}
                <Text style={styles.inputText}>Confirm Password</Text>

                <View style={styles.inputBox}>
                  <LockClosedIcon size={textScale(25)} color={"gray"} />
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(value) => setConfirmPassword(value)}
                    placeholder="Confirm Password"
                    placeholderTextColor={Colors.border_color}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <Feather
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={textScale(20)}
                    color={Colors.border_color}
                  />
                </View>
                {confirmPasswordError && (
                  <Text style={styles.errorText}>{confirmPasswordError}</Text>
                )}

                {isLoading ? (
                  <Loading size={40} color={Colors.forgetPassword} />
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleSubmit()}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Save and Continue</Text>
                  </TouchableOpacity>
                )}
                {errorText && <Text style={styles.errorText}>{errorText}</Text>}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  loginText: {
    marginTop: moderateScaleVertical(80),
    alignSelf: "center",
    fontSize: textScale(22),
    fontFamily: FontFamily.Montserrat_ExtraBold,
    color: Colors.white,
  },
  bgImage: {
    flex: 1,
    width: "100%",
    marginTop: moderateScaleVertical(10),
  },
  contentContainer: {
    marginHorizontal: moderateScale(30),
    marginTop: moderateScaleVertical(80),
  },
  inputText: {
    color: Colors.black,
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_Medium,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.border_color,
    borderRadius: moderateScale(10),
    marginVertical: moderateScaleVertical(10),
  },
  input: {
    flex: 1,
    marginLeft: moderateScale(10),
    fontSize: textScale(16),
    color: Colors.black,
    padding: moderateScale(10),
    fontFamily: FontFamily.Montserrat_Medium,
  },
  button: {
    backgroundColor: Colors.forgetPassword,
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    marginTop: moderateScaleVertical(30),
  },
  buttonText: {
    fontSize: textScale(16),
    color: Colors.white,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  errorText: {
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_Regular,
    color: Colors.red,
    marginVertical: moderateScaleVertical(10),
  },
  v1: {
    flex: 1,
    overflow: "hidden",
    paddingTop: moderateScaleVertical(40),
  },
});
