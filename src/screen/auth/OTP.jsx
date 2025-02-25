import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../components/Colors";
import { useNavigation } from "@react-navigation/native";
import {
  SEND_OTP_ON_EMAIL,
  VERIFY_OTP,
  VERIFY_SIGN_UP_USER_EMAIL,
} from "../../API/API_service";
import Loading from "../../components/General/loading";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import { ImagePath } from "../../utils/ImagePath";
import CustomButton from "../../components/General/CustomButton";
import { showMessage } from "react-native-flash-message";

export default function OTP(props) {
  const navigation = useNavigation();
  const { email, initial } = props.route.params;
  const otpLength = 6;
  const [otpArray, setOtpArray] = useState(Array(otpLength).fill(""));
  const refArray = useRef(otpArray.map(() => React.createRef()));
  const [showResendButton, setShowResendButton] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const [loading, setLoading] = useState(false);
  const otpSet = otpArray.join("");

  useEffect(() => {
    if (remainingTime <= 0) {
      setShowResendButton(true);
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const resendOtp = async () => {
    const data = {
      email: email,
    };
    try {
      const response = await SEND_OTP_ON_EMAIL(data);
      if (response?.data?.message === "OTP generated successfully") {
        Alert.alert("Success!!", "OTP Send Again to your email!!");
      } 
    } catch (e) {
      console.log(e);
    }
  };
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const otpCopy = [...otpArray];
    otpCopy[index] = value;
    setOtpArray(otpCopy);

    if (value && index < otpLength - 1) {
      refArray.current[index + 1].current.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !otpArray[index] && index > 0) {
      refArray.current[index - 1].current.focus();
    }
  };
  const renderInputs = () => {
    return otpArray.map((item, index) => (
      <TextInput
        key={index}
        style={styles.otpBox}
        keyboardType={initial === "registration" ? "default" : "number-pad"}
        maxLength={1}
        onChangeText={(text) => handleOtpChange(index, text)}
        onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
        ref={refArray.current[index]}
        value={otpArray[index]}
      />
    ));
  };

  const verifyOtp = async () => {
    const otpDetails = {
      email: email,
      otp: parseInt(otpSet),
    };
    console.log(otpDetails, "Line 105");
    setLoading(true);
    try {
      const response = await VERIFY_OTP(otpDetails);
      console.log(response);
      if (response && response?.message === "OTP verified successfully") {
        setLoading(false);
        navigation.replace("UpdatePassword", { email: email });
      } else {
        Alert.alert("Error", "Invalid Otp");
        setLoading(false);
        setOtpArray(Array(otpLength).fill(""));
        refArray.current[0].current.focus();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // VERIFY_SIGN_UP_USER_EMAIL
  const verifyOtpSignUpUserEmail = async () => {
    const formData = {
      otp: otpSet,
      email_address: email,
    };
    console.log(formData, "Line 105");
    setLoading(true);
    try {
      const response = await VERIFY_SIGN_UP_USER_EMAIL(formData);
      console.log(response);
      if (response && response?.message === "OTP verified successfully") {
        showMessage({
          message: "Account Verified Successfully. Please Login.",
          type: "info",
          color: Colors.white,
          backgroundColor: Colors.brandColor,
        });
        navigation.replace("SuccessScreen", { come: "account" });
      }
      else{
        Alert.alert("Error", "Invalid Otp");
        setLoading(false);
        setOtpArray(Array(otpLength).fill(""));
        refArray.current[0].current.focus();
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
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
        <Text style={styles.loginText}>OTP</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: Colors.forgetPassword }}>
        <ImageBackground
          style={styles.bgImage}
          source={ImagePath.loginBg}
          resizeMode="stretch"
        >
          <View style={styles.v1}>
            <ScrollView>
              <View style={styles.imageView}>
                <Image
                  source={ImagePath.smsImage}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
                <View style={styles.badge} />
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.headerText}>We just emailed you.</Text>
                <Text style={styles.subtitle}>
                  Please enter the code we emailed you.
                </Text>
                <Text style={styles.emailText}>
                  {email || "example@site.com"}
                </Text>
                <Text style={styles.subtitle}>Confirmation Code</Text>
              </View>
              <View style={styles.otpContainer}>{renderInputs()}</View>
              {loading ? (
                <Loading size={textScale(40)} color={Colors.forgetPassword} />
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    marginTop: moderateScaleVertical(30),
                  }}
                >
                  <CustomButton
                    name={"Verify"}
                    handleAction={
                      initial === "registration"
                        ? verifyOtpSignUpUserEmail
                        : verifyOtp
                    }
                  />
                </View>
              )}

              <View
                style={{
                  marginVertical: moderateScaleVertical(20),
                  alignItems: "center",
                }}
              >
                {showResendButton ? (
                  <View style={styles.resendButton}>
                    <TouchableOpacity onPress={() => resendOtp()}>
                      <Text style={styles.resendButtonText}>Resend Code</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "#000", fontSize: textScale(14) }}>
                      Or
                    </Text>

                    <TouchableOpacity>
                      <Text style={styles.resendButtonText}>Call</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.timerText}>
                    Resend Code in {remainingTime} sec
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}

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
    marginHorizontal: moderateScale(20),
    marginTop: moderateScaleVertical(20),
    gap: moderateScale(10),
  },
  imageView: {
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: moderateScaleVertical(60),
  },
  imageStyle: {
    height: moderateScale(90),
    width: moderateScale(90),
    position: "absolute",
  },
  badge: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: "red",
    left: moderateScale(30),
    borderRadius: moderateScale(50),
  },
  headerText: {
    color: Colors.black,
    fontSize: textScale(20),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  subtitle: {
    color: Colors.border_color,
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_Regular,
  },
  emailText: {
    color: Colors.emailText,
    fontSize: textScale(16),
    fontFamily: FontFamily.Montserrat_Medium,
  },
  otpBox: {
    width: moderateScale(40),
    height: moderateScale(45),
    borderBottomWidth: moderateScaleVertical(1),
    textAlign: "center",
    fontSize: textScale(20),
    color: Colors.black,
    fontFamily: FontFamily.Montserrat_SemiBold,
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: moderateScaleVertical(20),
  },
  resendButtonText: {
    color: Colors.text_grey,
    textAlign: "center",
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
    textDecorationLine: "underline",
  },
  timerText: {
    textAlign: "center",
    color: Colors.black,
    fontSize: textScale(13),
  },
  resendButton: {
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  v1: {
    flex: 1,
    overflow: "hidden",
    paddingTop: moderateScaleVertical(40),
  },
});
