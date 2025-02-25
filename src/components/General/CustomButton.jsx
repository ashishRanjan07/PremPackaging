import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { responsiveFontSize, responsivePadding } from "../Responsive";
import Colors from "../Colors";

const CustomButton = ({ name, handleAction }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleAction}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.forgetPassword,
    justifyContent: "center",
    alignItems: "center",
    // height: responsivePadding(30),
    width: "40%",
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    marginStart: responsivePadding(10),
    // marginBottom: responsivePadding(30),
  },
  buttonText: {
    fontSize: responsiveFontSize(16),
    color: Colors.white,
    fontWeight: "500",
  },
});
