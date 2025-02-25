import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Colors";
import { useNavigation } from "@react-navigation/native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import InternalHeader from "../header/InternalHeader";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const OrderDetails = ({ route }) => {
  const { item } = route.params;
  console.log(item, "Line 22");
  const staticImageURL = "https://picsum.photos/300";
  const status = item?.status;
  const statusSteps = {
    placed: 0,
    shipped: 1,
    out_for_delivery: 2,
    delivered: 3,
  };

  const currentStep =
    statusSteps[status] !== undefined ? statusSteps[status] : 0;

  const navigation = useNavigation();
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    let total = 0;
    item?.items.forEach((orderItem) => {
      total += orderItem?.price * orderItem?.quantity;
    });
    const calculatedDiscount = (
      item?.totalCartValue - item?.totalOrderValue
    ).toFixed(2);
    setDiscount(!isNaN(calculatedDiscount) ? calculatedDiscount : 0);
    setTotalAmount(total);
  }, [item?.items]);

  return (
    // <>
    // <SafeAreaView style={{ backgroundColor: Colors.white }} />
    // <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
    // <InternalHeader title={"Order Details"} />
    //   <ScrollView>
    //     <View style={styles.contentView}>
    //       <View>
    //         <Text style={styles.orderHeaderTitle}>Order: {item?.orderId}</Text>
    //       </View>
    //       <View style={styles.divider2} />
    //       {item?.items.map((orderItem, index) => {
    //         // console.log("Discount",item?.totalCartValue -
    //         //   item?.totalOrderValue ,"Line 54");
    //         return (
    //           <View key={orderItem._id} style={styles.card}>
    //             <View style={styles.cartImageHolder}>
    //               <FastImage
    //                 style={styles.productImage}
    //                 source={{
    //                   uri: orderItem?.product?.images[0]?.image,
    //                   priority: FastImage.priority.high,
    //                   cache: FastImage.cacheControl.web,
    //                 }}
    //                 resizeMode={FastImage.resizeMode.cover}
    //               />
    //             </View>
    //             <View style={{ width: "50%", gap: moderateScale(10) }}>
    //               <Text style={styles.nameHolder}>
    //                 {orderItem?.product?.name} {orderItem?.product?.slug}
    //               </Text>
    //               <Text style={styles.priceText}>
    //                 ₹ {orderItem?.price * orderItem?.quantity}
    //               </Text>
    //             </View>
    //           </View>
    //         );
    //       })}
    //       <View style={styles.divider2} />
    //       <View style={styles.cartTotalView}>
    //         {/* <View style={styles.divider} /> */}
    //         <View style={styles.cartSubtotalHolder}>
    //           <Text style={styles.cartSubtotalText}>Actual Price:</Text>
    //           <Text style={styles.cartSubtotalPrice}>₹ {totalAmount}</Text>
    //         </View>
    //         <View style={styles.cartSubtotalHolder}>
    //           <Text style={styles.cartSubtotalText}>Shipping Charge:</Text>
    //           <Text style={styles.cartSubtotalPrice}>
    //             ₹{item?.shippingCost}
    //           </Text>
    //         </View>
    //         <View style={styles.cartSubtotalHolder}>
    //           <Text style={styles.cartSubtotalText}>Discount:</Text>
    //           <Text style={styles.cartSubtotalPrice}>
    //             -₹{discount ? discount : 0}
    //           </Text>
    //         </View>
    //         <View style={styles.cartSubtotalHolder}>
    //           <Text style={styles.cartSubtotalText}>Tax:</Text>
    //           <Text style={styles.cartCalculated}>
    //             ₹
    //             {(
    //               item?.totalOrderValue -
    //               (totalAmount + item?.shippingCost)
    //             ).toFixed(2)}
    //           </Text>
    //         </View>
    //         <View style={styles.divider} />
    //         <View style={styles.divider} />
    //         {/* Cart Total Price */}
    //         <View style={styles.cartTotalPiceHolder}>
    //           <Text style={styles.cartTotalPriceTitle}>Total:</Text>
    //           <Text style={styles.cartTotalPriceTitle}>
    //             ₹{item?.totalOrderValue}
    //           </Text>
    //         </View>
    //       </View>
    //     </View>

    //     <View style={styles.contentView}>
    //       <View style={{ flexDirection: "row", alignItems: "center" }}>
    //         <Text style={styles.orderHeaderTitle}>Order Status</Text>
    //         <Text
    //           style={{
    //             color: Colors.green,
    //             fontFamily: FontFamily.Montserrat_Medium,
    //             fontSize: textScale(18),
    //           }}
    //         >
    //           {item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)}
    //         </Text>
    //       </View>

    //       <View style={styles.divider2} />

    //       <ProgressSteps direction={"vertical"} activeStep={currentStep}>
    //         <ProgressStep
    //           label="Order Placed"
    //           disabled={currentStep < 0}
    //           completed={currentStep >= 0}
    //           nextBtnText=""
    //           previousBtnText=""
    //           activeLabelStyle={
    //             currentStep >= 0 ? styles.activeLabel : styles.inactiveLabel
    //           }
    //           labelStyle={
    //             currentStep >= 0 ? styles.activeLabel : styles.inactiveLabel
    //           }
    //           completedStyle={styles.completedStep}
    //         >
    //           <View style={{ alignItems: "center" }} />
    //         </ProgressStep>
    //         <ProgressStep
    //           label="Shipped"
    //           disabled={currentStep < 1}
    //           completed={currentStep >= 1}
    //           nextBtnText=""
    //           previousBtnText=""
    //           activeLabelStyle={
    //             currentStep >= 1 ? styles.activeLabel : styles.inactiveLabel
    //           }
    //           labelStyle={
    //             currentStep >= 1 ? styles.activeLabel : styles.inactiveLabel
    //           }
    //           completedStyle={styles.completedStep}
    //         >
    //           <View style={{ alignItems: "center" }} />
    //         </ProgressStep>
    //         <ProgressStep
    //           label="Out for Delivery"
    //           disabled={currentStep < 2}
    //           completed={currentStep >= 2}
    //           nextBtnText=""
    //           previousBtnText=""
    //           activeLabelStyle={
    //             currentStep >= 2 ? styles.activeLabel : styles.inactiveLabel
    //           }
    //           labelStyle={
    //             currentStep >= 2 ? styles.activeLabel : styles.inactiveLabel
    //           }
    //           completedStyle={styles.completedStep}
    //         >
    //           <View style={{ alignItems: "center" }} />
    //         </ProgressStep>
    //         <ProgressStep
    //           label="Delivered"
    //           disabled={currentStep < 3}
    //           completed={currentStep >= 3}
    //           nextBtnText=""
    //           previousBtnText=""
    //           activeLabelStyle={
    //             currentStep >= 3 ? styles.activeLabel : styles.inactiveLabel
    //           }
    //           labelStyle={
    //             currentStep >= 3 ? styles.activeLabel : styles.inactiveLabel
    //           }
    //           completedStyle={styles.completedStep}
    //         >
    //           <View style={{ alignItems: "center" }} />
    //         </ProgressStep>
    //       </ProgressSteps>
    //     </View>
    //   </ScrollView>
    // </>

    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <InternalHeader title={"Order Details"} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.cardDesign}>
          <View style={styles.itemStyle}>
            <Text style={styles.keyStyle}>Order Id:</Text>
            <Text style={styles.valueStyle}>
              {item?.orderId ? item?.orderId : "N/A"}
            </Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.keyStyle}>Total Order Value:</Text>
            <Text style={styles.valueStyle}>
              ₹{item?.totalOrderValue ? item?.totalOrderValue : "N/A"}
            </Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.keyStyle}>Payment Status:</Text>
            <Text style={styles.valueStyle}>
              {item?.paymentStatus ? item?.paymentStatus : "N/A"}
            </Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.keyStyle}>Ordered by:</Text>
            <Text style={styles.valueStyle}>
              {item?.name ? item?.name : "N/A"}
            </Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.keyStyle}>Address:</Text>
            <Text style={styles.valueStyle}>
              {item?.landmark} {item?.town},{item?.state},{"India"}
            </Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.keyStyle}>Pincode:</Text>
            <Text style={styles.valueStyle}>{item?.pincode}</Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.keyStyle}>Order Date:</Text>
            <Text style={[styles.valueStyle, { width: "65%" }]}>
              {moment(item?.createdAt).format("YYYY-MM-DD | hh:mm A")}
            </Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.keyStyle}>Coupon Code:</Text>
            <Text style={styles.valueStyle}>{"N/A"}</Text>
          </View>
          <View
            style={{ borderBottomWidth: 2, borderColor: Colors.border_color }}
          >
            <Text style={[styles.keyStyle, { textAlign: "center" }]}>
              Product Details
            </Text>
            {item?.items.map((orderItem, index) => {
              console.log(orderItem, "line 278");
              return (
                <>
                  <Text
                    style={[
                      styles.valueStyle,
                      {
                        width: "100%",
                        textTransform: "capitalize",
                        color: Colors.brandColor,
                      },
                    ]}
                  >
                    Name:
                  </Text>
                  <Text
                    style={[
                      styles.valueStyle,
                      { width: "100%", textTransform: "capitalize" },
                    ]}
                  >
                    {orderItem?.product?.product_id
                      ? orderItem?.product?.product_id
                      : ""}{" "}
                    {orderItem?.product?.slug} (Quantity:{orderItem?.quantity}{" "}
                    PackSize:{orderItem?.packSize})
                  </Text>
                </>
              );
            })}
          </View>
          <View
            style={{ borderBottomWidth: 2, borderColor: Colors.border_color }}
          >
            <Text style={[styles.keyStyle, { textAlign: "center" }]}>
              Price Breakdown
            </Text>
            <View
              style={[
                styles.itemStyle,
                { borderBottomWidth: 0, padding: moderateScale(5) },
              ]}
            >
              <Text style={styles.keyStyle}>Cart Value:</Text>
              <Text style={styles.valueStyle}>₹{item?.totalCartValue}</Text>
            </View>
            <View
              style={[
                styles.itemStyle,
                { borderBottomWidth: 0, padding: moderateScale(5) },
              ]}
            >
              <Text style={styles.keyStyle}>Shipping Charge:</Text>
              <Text style={styles.valueStyle}>₹{item?.shippingCost}</Text>
            </View>
            <View
              style={[
                styles.itemStyle,
                { borderBottomWidth: 0, padding: moderateScale(5) },
              ]}
            >
              <Text style={styles.keyStyle}>GST:</Text>
              <Text style={styles.valueStyle}>
                ₹
                {(
                  item?.totalOrderValue -
                  (totalAmount + item?.shippingCost)
                ).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.itemStyle}>
            <Text style={styles.keyStyle}>Ordered Status:</Text>
            <Text style={styles.valueStyle}>
              {item?.status ? item?.status : "N/A"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  contentView: {
    backgroundColor: "white",
    width: "95%",
    borderRadius: moderateScale(10),
    marginVertical: moderateScaleVertical(20),
    marginHorizontal: moderateScale(10),
    alignSelf: "center",
  },
  orderHeaderTitle: {
    color: Colors.border_color,
    fontFamily: FontFamily.Montserrat_SemiBold,
    fontSize: textScale(14),
    padding: moderateScale(10),
  },
  productImage: {
    height: moderateScale(100),
    width: "80%",
    borderRadius: moderateScale(10),
  },
  card: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(20),
  },
  cartTotalView: {
    borderRadius: moderateScale(5),
    padding: moderateScale(12),
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScaleVertical(10),
  },
  cartSubtotalHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(5),
    marginBottom: moderateScaleVertical(20),
  },
  cartSubtotalText: {
    fontSize: textScale(15),
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_Bold,
  },
  cartSubtotalPrice: {
    fontSize: textScale(16),
    color: Colors.brandColor,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  cartCalculated: {
    fontSize: textScale(15),
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  cartTotalPiceHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  cartTotalPriceTitle: {
    fontSize: textScale(15),
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  divider: {
    borderWidth: 0.3,
    borderColor: Colors.border_grey,
    alignSelf: "center",
    width: "90%",
  },
  label: {
    fontSize: textScale(14),
    color: Colors.black,
    textAlign: "center",
    fontFamily: FontFamily.Montserrat_SemiBold,
    padding: moderateScale(8),
  },
  divider2: {
    borderWidth: moderateScale(1),
    borderColor: Colors.border_grey,
    borderStyle: "dotted",
  },
  cartImageHolder: {
    width: "35%",
    alignItems: "center",
  },
  nameHolder: {
    color: Colors.black,
    textTransform: "uppercase",
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  priceText: {
    color: Colors.brandColor,
    fontFamily: FontFamily.Montserrat_SemiBold,
    fontSize: textScale(14),
  },
  activeLabel: {
    color: Colors.green,
  },
  inactiveLabel: {
    color: Colors.grey,
  },
  completedStep: {
    backgroundColor: Colors.green,
  },
  cardDesign: {
    width: "95%",
    alignSelf: "center",
    marginVertical: moderateScaleVertical(10),
    gap: moderateScaleVertical(10),
    borderRadius: moderateScale(10),
  },
  itemStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    borderBottomWidth: 2,
    borderColor: Colors.border_color,
    padding: moderateScale(10),
  },
  keyStyle: {
    fontFamily: FontFamily.Montserrat_Medium,
    fontSize: textScale(16),
    fontWeight: "600",
    color: Colors.black,
  },
  valueStyle: {
    fontFamily: FontFamily.Montserrat_Regular,
    fontSize: textScale(16),
    fontWeight: "500",
    color: Colors.black,
    width: "70%",
    textTransform:'capitalize'
  },
});
