import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Colors from "../../components/Colors";
import InternalHeader from "../../components/header/InternalHeader";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import CustomButton from "../../components/General/CustomButton";

const CustomForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [moq, setMoq] = useState("");
  const [queryDetails, setQueryDetails] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [contactPersonMobile, setContactPersonMobile] = useState("");
  return (
    <View style={styles.main}>
      <ScrollView style={{flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.inputBoxHolderView}>
          <Text style={styles.label}>Company Name*</Text>
          <TextInput
            placeholder="Company Name"
            placeholderTextColor={Colors.black}
            value={companyName}
            onChangeText={(text) => setCompanyName(text)}
            style={styles.inputBoxHolder}
          />
        </View>
        <View style={styles.inputBoxHolderView}>
          <Text style={styles.label}>Product Category*</Text>
          <TextInput
            placeholder="Product Category*"
            placeholderTextColor={Colors.black}
            value={productCategory}
            onChangeText={(text) => setProductCategory(text)}
            style={styles.inputBoxHolder}
          />
        </View>
        <View style={styles.inputBoxHolderView}>
          <Text style={styles.label}>MOQ*</Text>
          <TextInput
            placeholder="MOQ*"
            placeholderTextColor={Colors.black}
            value={moq}
            onChangeText={(text) => setMoq(text)}
            style={styles.inputBoxHolder}
          />
        </View>
        <View style={styles.inputBoxHolderView}>
          <Text style={styles.label}>Query Details*</Text>
          <TextInput
            placeholder="Query Details*"
            placeholderTextColor={Colors.black}
            value={queryDetails}
            onChangeText={(text) => setQueryDetails(text)}
            style={styles.inputBoxHolder}
          />
        </View>
        <View style={styles.inputBoxHolderView}>
          <Text style={styles.label}>Contact Person Name*</Text>
          <TextInput
            placeholder="Contact Person Name*"
            placeholderTextColor={Colors.black}
            value={contactPersonName}
            onChangeText={(text) => setContactPersonName(text)}
            style={styles.inputBoxHolder}
          />
        </View>
        <View style={styles.inputBoxHolderView}>
          <Text style={styles.label}>Contact Person Email*</Text>
          <TextInput
            placeholder="Contact Person Email*"
            placeholderTextColor={Colors.black}
            value={contactPersonEmail}
            onChangeText={(text) => setContactPersonEmail(text)}
            style={styles.inputBoxHolder}
          />
        </View>
        <View style={styles.inputBoxHolderView}>
          <Text style={styles.label}>Contact Person Mobile Number*</Text>
          <TextInput
            placeholder="Contact Person Mobile Number*"
            placeholderTextColor={Colors.black}
            value={contactPersonMobile}
            onChangeText={(text) => setContactPersonMobile(text)}
            style={styles.inputBoxHolder}
          />
        </View>

        <View style={{marginBottom:moderateScale(10),alignItems:'center',}}>
            <CustomButton name={"Submit"}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomForm;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  label: {
    fontFamily: FontFamily.Montserrat_Bold,
    color: Colors.brandColor,
    fontSize: textScale(14),
  },
  inputBoxHolder: {
    borderWidth: 2,
    width: "100%",
    borderRadius: moderateScale(5),
    height: moderateScale(60),
    borderColor: Colors.back,
    backgroundColor: Colors.back,
    fontFamily: FontFamily.Montserrat_Medium,
    fontSize: textScale(14),
    paddingHorizontal: moderateScale(10),
  },
  inputBoxHolderView: {
    marginVertical: moderateScaleVertical(10),
    width: "95%",
    alignSelf: "center",
    gap: moderateScaleVertical(10),
  },
});
