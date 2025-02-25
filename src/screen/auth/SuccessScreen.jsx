import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../components/Colors";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import { ImagePath } from "../../utils/ImagePath";
import { useNavigation } from "@react-navigation/native";

const SuccessScreen = ({ route }) => {
  const { come } = route.params;
  const navigation = useNavigation();
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
        <Text style={styles.loginText}>Success</Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.forgetPassword,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          style={styles.bgImage}
          source={ImagePath.loginBg}
          resizeMode="stretch"
        >
          <View style={styles.v1}>
            {come === "forgetPassword" && (
              <>
                <Image
                  source={ImagePath.password}
                  resizeMode="contain"
                  style={styles.imageStyle}
                />
                <Text style={styles.text}>
                  Your password is changed successfully
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.push("Login")}
                  style={styles.button}
                >
                  <Text style={[styles.text, { color: Colors.white }]}>
                    Go Back to Login
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {come === "account" && (
              <>
                <Image
                  source={ImagePath.account}
                  resizeMode="contain"
                  style={[
                    styles.imageStyle,
                    { width: "70%", height: moderateScale(200) },
                  ]}
                />
                <Text style={[styles.text, { width: "80%" }]}>
                  Your account is successfully created
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.push("Login")}
                  style={styles.button}
                >
                  <Text style={[styles.text, { color: Colors.white }]}>
                    Proceed
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SuccessScreen;

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
  v1: {
    flex: 1,
    overflow: "hidden",
    paddingTop: moderateScaleVertical(40),
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScaleVertical(20),
  },
  imageStyle: {
    width: "80%",
    height: moderateScale(250),
  },
  text: {
    fontSize: textScale(20),
    textAlign: "center",
    fontFamily: FontFamily.Montserrat_SemiBold,
    color: Colors.brandColor,
  },
  button: {
    width: "80%",
    alignSelf: "center",
    borderWidth: 2,
    alignItems: "center",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    borderColor: Colors.brandColor,
    backgroundColor: Colors.brandColor,
  },
});
