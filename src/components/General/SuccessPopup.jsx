import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Colors'
import { responsiveFontSize, responsivePadding } from '../Responsive'
import { XMarkIcon } from 'react-native-heroicons/outline'
import LottieView from "lottie-react-native";

const {width, height} = Dimensions.get('window')

export default function SuccessPopup({showSuccessPopup, setShowSuccessPopup}) {
  return (
    <Modal transparent={true} visible={showSuccessPopup}>
    <View style={styles.modalView}>
        <View style={styles.mainView}>
        <TouchableOpacity onPress={()=>setShowSuccessPopup(false)} style={styles.closeIcon}>
            <XMarkIcon size={20} color={Colors.forgetPassword}/>
            </TouchableOpacity>


            {/* Animation */}
            <View>
            <LottieView
              source={require("../../assets/image/Animation - 1712573495942.json")}
              resizeMode="contain"
              style={{ height: responsivePadding(130), width: "90%" }}
              autoPlay={true}
              loop
            />
            <Text style={styles.heading}>Order Placed !!</Text>
            <Text style={styles.subHeading}>
              Order Placed Successfully!!!
            </Text>
            <View style={{ marginVertical: 20 }}>
             
            </View>
          </View>

        </View>
               
    </View>
</Modal>
  )
}

const styles= StyleSheet.create({
    modalView:{
        flex:1,
        position:"absolute",
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:"center",
        height:height,
        width:width,
        alignItems:"center"
        
      },
      mainView:{
        backgroundColor:Colors.white,
        height:responsivePadding(300),
        width:responsivePadding(300),
        borderRadius:10
      },
      closeIcon:{
        alignSelf:"flex-end",
        marginTop:-10,
        // marginHorizontal:responsivePadding(),
        backgroundColor:Colors.backGround_grey,
        padding:5,
        borderRadius:50
      },
      confirmationHolder: {
        width: "80%",
        height: "auto",
        padding: responsivePadding(10),
        borderRadius: responsivePadding(10),
        // elevation: responsivePadding(10),
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 0,
          height: responsivePadding(2),
        },
        shadowRadius: responsivePadding(3),
        backgroundColor: Colors.white,
      },
      heading: {
        fontSize: responsiveFontSize(18),
        fontWeight: "600",
        color: Colors.black,
        textAlign: "center",
        marginVertical: responsivePadding(10),
      },
      subHeading: {
        color: "gray",
        fontSize: responsiveFontSize(16),
        fontWeight: "400",
        textAlign: "center",
      },
})