import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../components/Colors";
import { EnvelopeIcon, LockClosedIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Loading from "../../components/General/loading";
import { LOGIN_USER } from "../../API/API_service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Service from "../../API/Service";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import { ImagePath } from "../../utils/ImagePath";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");
  const [emailValidationText, setEmailValidationText] = useState("");
  const [passwordValidationText, setPasswordValidationText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (validateEmail(email)) {
      setEmailError(false);
      setEmailValidationText("");
    }

    if (password.length > 0) {
      setPasswordError(false);
      setPasswordValidationText("");
    }

    if (email.length > 0) {
      if (!validateEmail(email)) {
        setEmailError(true);
        setEmailValidationText("Please enter a valid email!");
        return;
      } else if (email.length === 0) {
        setEmailError(false);
        setEmailValidationText("");
        return;
      } else if (email.length > 0) {
        setErrorMessage("");
      }
    }
  }, [email, password]);

  const validateEmail = (email) => {
    // const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<!\.\.)$/;
    return regex.test(email);
  };

  const handleEmojiForEmail = (value) => {
    const emojiRegex =
      /(?:[\u2700-\u27BF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g;
    const filteredText = value.replace(emojiRegex, "");
    setEmail(filteredText);
  };

  const handleEmojiForPassword = (value) => {
    const emojiRegex =
      /(?:[\u2700-\u27BF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g;
    const filteredText = value.replace(emojiRegex, "");
    setPassword(filteredText);
  };

  const handleLogin = async () => {
    if (email.trim() === "") {
      setEmailError(true);
      setEmailValidationText("Please enter the Email!");
    }
    if (password.trim() === "") {
      setPasswordError(true);
      setPasswordValidationText("Please enter the Password!");
      return;
    } else if (!validateEmail(email)) {
      setEmailError(true);
      setEmailValidationText("Please enter a valid Email!");
      return;
    } else if (email.length > 0 && password.length > 0) {
      setEmailError(false);
      setPasswordError(false);
    }

    const loginUser = {
      email_address: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await LOGIN_USER(loginUser);
      console.log("Server Response:", response?.data?.user);
      if (response?.success) {
        try {
          await AsyncStorage.setItem(
            "user_data",
            JSON.stringify(response?.data?.user)
          );
          Service.userData = await response?.data?.user;
        } catch (e) {
          console.log("Error in Saving data:", e?.message);
        }
        navigation.replace("Drawer", { userData: response?.data?.user });
        setEmail("");
        setPassword("");
      } else {
        setShowErrorText(true);
        setErrorMessage("Invalid Credentials!!");
        setEmail("");
        setPassword("");
      }
      setLoading(false);
    } catch (e) {
      console.log(e?.message);
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <>
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
          <Text style={styles.loginText}>Welcome back!</Text>
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
                  <Text style={styles.inputText}>Email</Text>

                  <View style={styles.inputBox}>
                    <EnvelopeIcon
                      size={textScale(25)}
                      color={Colors.border_color}
                    />
                    <TextInput
                      style={styles.input}
                      value={email}
                      autoCapitalize={"none"}
                      onChangeText={(value) => handleEmojiForEmail(value)}
                      placeholder="Enter your Email"
                      placeholderTextColor={Colors.border_color}
                    />
                  </View>

                  {emailError && (
                    <Text style={styles.errorText}>{emailValidationText}</Text>
                  )}

                  <Text style={styles.inputText}>Password</Text>

                  <View style={styles.inputBox}>
                    <LockClosedIcon
                      size={textScale(25)}
                      color={Colors.border_color}
                    />
                    <TextInput
                      style={styles.input}
                      autoCapitalize="none"
                      placeholder="Enter Password"
                      value={password}
                      onChangeText={(value) => handleEmojiForPassword(value)}
                      secureTextEntry={!showPassword}
                      placeholderTextColor={Colors.border_color}
                    />

                    <Feather
                      onPress={() => setShowPassword(!showPassword)}
                      name={showPassword ? "eye" : "eye-off"}
                      size={textScale(20)}
                      color={Colors.border_color}
                    />
                  </View>

                  {passwordError && (
                    <Text style={styles.errorText}>
                      {passwordValidationText}
                    </Text>
                  )}

                  <Text
                    onPress={() => navigation.navigate("forgetPassword")}
                    style={styles.forgotPasswordText}
                  >
                    Forgot Password ?
                  </Text>

                  {loading ? (
                    <Loading
                      size={textScale(40)}
                      color={Colors.forgetPassword}
                    />
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => handleLogin()}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                  )}

                  <View style={styles.lowerSignUpHolder}>
                    <Text style={styles.forgotPasswordText}>New User? </Text>
                    <Text
                      onPress={() => navigation.navigate("SignUp")}
                      style={styles.signUpText}
                    >
                      Sign Up
                    </Text>
                  </View>

                  {showErrorText && (
                    <View style={[styles.errorHolder, { marginTop: 10 }]}>
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.forgetPassword,
  },
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
    borderColor: "gray",
    borderRadius: moderateScale(10),
    marginVertical: moderateScaleVertical(10),
  },
  input: {
    flex: 1,
    marginLeft: moderateScale(10),
    fontSize: textScale(16),
    color: Colors.black,
    padding: moderateScale(10),
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    color: Colors.black,
    fontSize: textScale(14),
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
    fontFamily: FontFamily.Montserrat_Medium,
  },
  errorText: {
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_Regular,
    color: Colors.red,
  },
  v1: {
    flex: 1,
    overflow: "hidden",
    paddingTop: moderateScaleVertical(40),
  },
  lowerSignUpHolder: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: moderateScaleVertical(20),
    alignItems: "center",
  },
  signUpText: {
    color: Colors.forgetPassword,
    fontSize: textScale(14),
    textDecorationLine: "underline",
    fontFamily: FontFamily.Montserrat_Medium,
  },
});
