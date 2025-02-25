import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../Colors";
import { responsiveFontSize, responsivePadding } from "../Responsive";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";

const { width, height } = Dimensions.get("window");

export default function LoginPopup({ showLoginPopup, setShowLoginPopup }) {
  const navigation = useNavigation();
 

  return (
    <Modal
      transparent={true}
      translucent={false}
      animationType="slide"
      visible={showLoginPopup}
    >
      <TouchableOpacity
        style={styles.modalView}
        onPress={() => setShowLoginPopup(false)}
      >
        <View style={styles.mainView}>
          <View>
            <Text style={styles.heading}>
              Please login / sign-Up first to add Products in Cart !!
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Login");
                    setShowLoginPopup(false);
                  }} 
                style={[
                  styles.btn,
                  {
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderColor: Colors.forgetPassword,
                  },
                ]}
              >
                <Text
                  style={[styles.btnText, { color: Colors.forgetPassword }]}
                >
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
                setShowLoginPopup(false);
              }}
                style={[
                  styles.btn,
                  {
                    backgroundColor: Colors.forgetPassword,
                    borderWidth: 2,
                    borderColor: Colors.forgetPassword,
                  },
                ]}
              >
                <Text style={[styles.btnText, { color: Colors.white }]}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    height: height,
    width: width,
    alignItems: "center",
  },
  mainView: {
    backgroundColor: Colors.white,
    width: "90%",
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    padding: moderateScale(10),
    borderColor: Colors.border_color,
  },
  closeIcon: {
    alignSelf: "flex-end",
    marginTop: moderateScaleVertical(-5),
    backgroundColor: Colors.backGround_grey,
    padding: moderateScale(5),
    borderRadius: moderateScale(50),
  },
  confirmationHolder: {
    width: "80%",
    height: "auto",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowRadius: moderateScale(3),
    backgroundColor: Colors.white,
  },
  heading: {
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
    color: Colors.black,
    textAlign: "center",
    lineHeight: scale(25),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: moderateScale(25),
    marginVertical: moderateScaleVertical(10),
  },
  btn: {
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    width: "40%",
    alignItems: "center",
  },
  btnText: {
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
    textAlign: "center",
  },
});
