import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../components/Colors";
import { EnvelopeIcon } from "react-native-heroicons/outline";
import Loading from "../../../components/General/loading";
import { useNavigation } from "@react-navigation/native";
import { SEND_OTP_ON_EMAIL } from "../../../API/API_service";
import FontFamily from "../../../utils/FontFamily";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../../utils/ResponsiveSize";
import { ImagePath } from "../../../utils/ImagePath";

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (email.length > 0) {
      setErrorText("");
    }
  }, [email]);

  const handleEmojiForEmail = (value) => {
    const emojiRegex =
      /(?:[\u2700-\u27BF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g;
    const filteredText = value.replace(emojiRegex, "");
    setEmail(filteredText);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return false;
    }
    // Additional check to avoid consecutive dots in domain part
    const domainPart = email.split('@')[1];
    if (domainPart.includes('..')) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (email.trim() === "") {
      setErrorText("Email address is required");
      return;
    }
    if (!validateEmail(email)) {
      setErrorText("Enter a valid email");
      return;
    } else {
      setErrorText("");
      sendCode(email);
    }
  };
  const sendCode = async (email) => {
    setIsLoading(true);
    try {
      const Data = {
        email: email,
      };
      const response = await SEND_OTP_ON_EMAIL(Data);
      console.log(response);
      if (response?.message === "User not found") {
        setIsLoading(false);
        setErrorText("You are not a registered User!!");
      }
      if (response && response?.message === "OTP generated successfully") {
        setIsLoading(false);
        navigation.replace("Otp", { email: email });
        setEmail("");
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e?.message);
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
        <Text style={styles.loginText}>Forgot Password ?</Text>
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
                <View style={styles.starView}>
                  <Text style={styles.inputText}>Email</Text>
                  <Text style={[styles.inputText, { color: Colors.red }]}>
                    *
                  </Text>
                </View>

                <View style={styles.inputBox}>
                  <EnvelopeIcon
                    size={textScale(22)}
                    color={Colors.border_color}
                  />
                  <TextInput
                    style={styles.input}
                    value={email}
                    autoCapitalize="none"
                    onChangeText={(value) => handleEmojiForEmail(value)}
                    placeholder="Enter registered Email"
                    placeholderTextColor={Colors.border_color}
                  />
                </View>
                {errorText && <Text style={styles.errorText}>{errorText}</Text>}
                {isLoading ? (
                  <Loading size={50} color={Colors.forgetPassword} />
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleSubmit()}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Send OTP</Text>
                  </TouchableOpacity>
                )}
                <Text
                  onPress={() => navigation.push("Login")}
                  style={styles.forgotPasswordText}
                >
                  Back to Sign in
                </Text>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  starView: {
    flexDirection: "row",
    gap: moderateScale(3),
    alignItems: "center",
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
  v1: {
    flex: 1,
    overflow: "hidden",
    paddingTop: moderateScaleVertical(40),
  },
  errorText: {
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_Regular,
    color: Colors.red,
  },
  forgotPasswordText: {
    marginTop: moderateScale(20),
    color: Colors.black,
    textAlign: "center",
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_Medium,
  },
});
