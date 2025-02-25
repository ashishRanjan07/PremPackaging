import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "./Colors";
import SuccessPopup from "./General/SuccessPopup";
import { PLACE_ORDER } from "../API/API_service";
import Loading from "./General/loading";
import RazorpayCheckout from "react-native-razorpay";
import { RAZORPAY_PAYMENT_KEY } from "./General/secrets";
import InternalHeader from "./header/InternalHeader";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../utils/ResponsiveSize";
import FontFamily from "../utils/FontFamily";
import BottomModal from "./General/BottomModal";
import { useNavigation, validatePathConfig } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message";

const SelectAddress = ({ route }) => {
  const navigation = useNavigation();
  const { cartProducts, user, contact_address, discountedAmount } =
    route.params;
  const [servicePinCode, setServicePinCode] = useState(
    contact_address?.pincode
  );
  const [loading, setLoading] = useState(false);
  const address1 = [contact_address];
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [deliveryType, setDeliveryType] = useState("Standard Delivery");
  const [shippingAmount, setShippingAmount] = useState(0);
  // const [shippingMessage, setShippingMessage] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const VALID_ZIP_CODES = [
    "122022",
    "201015",
    "121000",
    "110066",
    "122234",
    "110101",
    "201306",
    "124505",
    "122002",
    "110007",
    "122010",
    "110080",
    "122016",
    "110022",
    "110079",
    "121001",
    "201313",
    "110084",
    "122001",
    "110102",
    "201014",
    "110069",
    "110039",
    "110119",
    "110605",
    "110043",
    "123507",
    "110049",
    "110030",
    "201318",
    "122100",
    "110065",
    "121010",
    "110011",
    "110025",
    "122207",
    "122007",
    "121004",
    "110067",
    "122003",
    "201301",
    "201106",
    "122055",
    "201007",
    "122004",
    "110073",
    "110086",
    "201018",
    "110003",
    "201021",
    "110078",
    "122220",
    "110047",
    "201206",
    "110051",
    "201316",
    "110503",
    "110013",
    "121005",
    "121102",
    "245304",
    "201002",
    "110031",
    "201019",
    "122231",
    "122226",
    "110016",
    "124508",
    "110090",
    "110089",
    "203208",
    "110036",
    "110014",
    "110608",
    "201102",
    "110085",
    "110505",
    "110104",
    "110103",
    "110059",
    "122230",
    "110054",
    "122012",
    "122102",
    "110100",
    "110042",
    "123003",
    "201101",
    "110052",
    "110020",
    "110091",
    "110604",
    "110504",
    "110401",
    "110098",
    "110012",
    "110048",
    "201012",
    "122011",
    "110301",
    "122006",
    "110403",
    "110015",
    "201020",
    "110607",
    "122101",
    "201309",
    "122206",
    "110063",
    "121003",
    "110096",
    "201304",
    "110046",
    "122203",
    "111112",
    "110019",
    "122227",
    "110110",
    "110117",
    "201312",
    "122009",
    "111120",
    "121011",
    "110507",
    "121014",
    "201005",
    "201016",
    "201017",
    "201315",
    "110609",
    "110071",
    "110058",
    "201006",
    "122232",
    "201307",
    "110108",
    "110113",
    "122005",
    "110088",
    "110094",
    "122215",
    "122223",
    "201300",
    "121013",
    "122208",
    "110502",
    "110033",
    "122211",
    "110005",
    "110057",
    "110006",
    "110083",
    "110040",
    "122013",
    "110115",
    "201009",
    "110125",
    "201000",
    "110072",
    "124501",
    "110018",
    "110402",
    "121101",
    "122210",
    "122218",
    "110076",
    "110093",
    "201303",
    "122017",
    "210005",
    "110092",
    "201305",
    "201317",
    "110017",
    "110037",
    "110029",
    "110053",
    "110510",
    "122204",
    "122019",
    "201003",
    "110026",
    "121012",
    "110024",
    "110027",
    "110118",
    "110050",
    "122209",
    "121015",
    "110302",
    "110009",
    "110508",
    "110095",
    "110116",
    "110501",
    "110060",
    "122213",
    "122214",
    "110114",
    "210003",
    "201013",
    "110028",
    "201103",
    "110112",
    "110044",
    "110512",
    "110099",
    "110511",
    "110105",
    "121009",
    "110106",
    "110001",
    "110034",
    "110082",
    "110056",
    "124507",
    "201008",
    "203207",
    "110097",
    "122015",
    "110062",
    "110121",
    "201314",
    "110603",
    "122217",
    "110068",
    "110509",
    "110008",
    "110077",
    "110606",
    "122228",
    "110120",
    "121006",
    "122224",
    "201310",
    "201311",
    "122098",
    "110124",
    "122021",
    "110075",
    "110506",
    "122225",
    "110081",
    "110045",
    "122020",
    "121002",
    "110122",
    "122216",
    "110064",
    "110010",
    "110070",
    "110087",
    "110002",
    "122233",
    "122109",
    "110021",
    "110074",
    "122229",
    "122000",
    "121008",
    "110109",
    "124506",
    "110004",
    "122018",
    "201302",
    "110107",
    "110023",
    "110061",
    "110038",
    "110601",
    "110055",
    "110032",
    "110602",
    "201004",
    "201010",
    "122219",
    "201001",
    "110035",
    "201308",
    "110041",
    "201011",
    "121007",
    "122008",
    "122014",
  ];
  const isValidZip = VALID_ZIP_CODES.includes(servicePinCode);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  function getCartTotal() {
    return cartProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  function calculateAmounts() {
    let totalAmount12 = 0;
    let totalAmount18 = 0;

    cartProducts.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      if (item.category === "6557deab301ec4f2f4266131") {
        totalAmount12 += itemTotal;
      } else {
        totalAmount18 += itemTotal;
      }
    });

    const gst12Charges = totalAmount12 * 0.12;
    const gst18Charges = totalAmount18 * 0.18;

    const totalGST = gst12Charges + gst18Charges;

    return {
      totalAmount12,
      totalAmount18,
      totalGST,
    };
  }

  const { totalAmount12, totalAmount18, totalGST } = calculateAmounts();

  const totalOrderValue = getCartTotal() + parseFloat(totalGST.toFixed(2));
  //  + parseInt(shippingAmount);

  const placeOrder = async () => {
    await OPEN_PAYMENT_GATEWAY();
  };

  const OPEN_PAYMENT_GATEWAY = async () => {
    // const amount1 = (totalOrderValue.toFixed(2) - discountedAmount).toFixed(2);
    // const amount1 = finalPrice.toFixed(2);
    // console.log(amount1, "line 388");
    var options = {
      description: "Make Payment for Cart Products",
      image: "https://www.store.prempackaging.com/pp_logo_1.png",
      currency: "INR",
      key: RAZORPAY_PAYMENT_KEY,
      amount: (finalPrice * 100).toFixed(2),
      name: "Prem Industries",
      prefill: {
        email: user?.email_address ? user?.email_address : "",
        contact: user?.mobile_number ? user?.mobile_number : "",
        name: `${user?.first_name} ${user?.last_name}`,
      },
      theme: { color: Colors.brandColor },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        console.log(data, "Line 113");
        if (data?.razorpay_payment_id) {
          OrderPlace(data?.razorpay_payment_id);
        }
      })
      .catch((error) => {
        console.log(error, "Line 412");
        showMessage({
          type: "danger",
          icon: "danger",
          message: `Transaction Failed.${
            Platform.OS === "ios" ? error.description : ""
          }`,
        });
        console.log(`Error: ${error.code} | ${error.description}`, "Line 113");
      });
  };

  useEffect(() => {
    console.log(totalOrderValue, "Line 412");
    console.log(shippingAmount, "Line 413");
    console.log(discountedAmount, "Line 414");
    // Recalculate final price whenever shippingAmount, discountedAmount, or totalOrderValue change
    const newFinalPrice = (
      totalOrderValue +
      shippingAmount -
      discountedAmount
    ).toFixed(2);
    setFinalPrice(newFinalPrice);
  }, [shippingAmount, discountedAmount, totalOrderValue]);

  const OrderPlace = async () => {
    console.log("hii", "Line 121");
    const items = cartProducts.map((x) => {
      return {
        product: x?.product?._id,
        quantity: x?.quantity,
        price: x?.price,
        packSize: x?.packSize,
      };
    });
    let data = {
      items: items,
      name: contact_address?.name,
      gstin: contact_address?.gstin,
      address: contact_address?.address,
      pincode: contact_address?.pincode,
      landmark: contact_address?.landmark,
      town: contact_address?.town,
      email: contact_address?.email,
      state: contact_address?.state,
      user: user?._id,
      totalOrderValue: finalPrice,
      totalCartValue: totalOrderValue,
      shippingCost: shippingAmount ? shippingAmount : 0,
      taxableAmount: totalGST.toFixed(2),
      paymentStatus: "Paid",
      utrNumber: "0",
    };
    console.log(data, "Line 155");
    setLoading(true);
    try {
      const response = await PLACE_ORDER(data);
      console.log(response, "Line 159");
      setLoading(false);
      if (response?.success) {
        navigation.navigate("SuccessPage", { id: user?._id });
      }
    } catch (e) {
      console.log(e, "Line 174");
    }
  };

  const displayAddressCard = ({ item, index }) => {
    return (
      <View style={styles.selectAddressCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.customerName}>{item?.name}</Text>
          <TouchableOpacity
            style={{ flexDirection: "row", gap: moderateScale(10) }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                fontSize: textScale(14),
                fontFamily: FontFamily?.Montserrat_Medium,
                color: Colors.brandColor,
                // textDecorationLine: "underline",
              }}
            >
              Change Address
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", gap: moderateScaleVertical(5) }}>
          {/* <Text style={styles.selectText}>Address: </Text> */}
          <View style={{ width: "100%" }}>
            <Text style={styles.selectText1}>
              {item?.landmark} {item?.town},{item?.state},{item?.pincode}
              {/* {"India,"} */}
              {/* {"\n"} */}
              {/* {`+91 ${item?.mobile}`} */}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
        <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
        <InternalHeader title={"Cart Summary"} />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* main content */}
          <View style={styles.content}>
            <View>
              <FlatList
                data={address1}
                keyExtractor={(item, index) => index}
                renderItem={displayAddressCard}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={styles.divider} />
            <View style={styles.yourOrderView}>
              <Text style={styles.yourOrderText}>Your Order</Text>

              <View style={styles.lowerView}>
                <Text style={styles.lowerText}>Product</Text>
                <Text style={styles.lowerText}>Total</Text>
              </View>
              <View style={styles.divider} />
              {cartProducts.length &&
                cartProducts.map((item, index) => {
                  return (
                    <View
                      style={[
                        styles.lowerView,
                        {
                          borderBottomWidth: moderateScale(2),
                          paddingHorizontal: moderateScale(10),
                          borderRadius: moderateScale(5),
                          borderColor: Colors.border_grey,
                        },
                      ]}
                      key={index}
                    >
                      <View style={styles.cartImageHolder}>
                        <FastImage
                          style={styles.cartImage}
                          source={{
                            uri: item?.product?.images[0]?.image,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.web,
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>

                      <View style={{ width: "60%" }}>
                        <Text style={styles.itemName}>
                          {/* {item?.category === "6557deab301ec4f2f4266131"
                          ? "Corrugated Box"
                          : ""}
                        {"\n"}  */}
                          {item?.product?.name} {item?.product?.slug} {"\n"}
                          {item?.quantity} x {item?.price}
                        </Text>
                      </View>
                      <View style={{ width: "15%" }}>
                        <Text style={styles.priceText}>
                          ₹{item.quantity * item.price}
                        </Text>
                      </View>
                    </View>
                  );
                })}

              {/* <View style={styles.divider} /> */}
              <View style={styles.freightChargesHolder}>
                <View style={{ width: "70%", gap: moderateScaleVertical(5) }}>
                  <Text style={styles.cartSubtotalText}>Total GST Charges</Text>
                  <Text
                    style={[
                      styles.cartSubtotalText,
                      {  fontSize: textScale(12) },
                    ]}
                  >
                    For corrugated boxes, GST is 12%. For all other products, GST is 18%
                  </Text>
                </View>

                <Text style={styles.cartSubtotalPrice}>
                  ₹{totalGST.toFixed(2)}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.view}>
                <Text style={[styles.itemName, { fontSize: textScale(16) }]}>
                  Choose Delivery Method
                </Text>
                <TouchableOpacity
                  style={styles.innerView}
                  // disabled={!isValidZip}
                  onPress={() => {
                    if (!isValidZip) {
                      showMessage({
                        type: "danger",
                        icon:'danger',
                        message:"Pincode not available for Express Delivery"
                      });
                    } else {
                      setDeliveryType("Express Delivery");
                      setShippingAmount(100);
                    }
                  }}
                >
                  <View style={{ width: "10%", alignItems: "center" }}>
                    <FontAwesome
                      name={
                        deliveryType === "Express Delivery"
                          ? "dot-circle-o"
                          : "circle-o"
                      }
                      color={Colors.brandColor}
                      size={textScale(20)}
                    />
                  </View>
                  <View style={{ width: "75%" }}>
                    <Text style={styles.innerMessageText}>
                      Express Delivery (2-3 working Days)
                    </Text>
                    <Text style={styles.innerSubText}>
                      Applicable for Delhi NCR Only
                    </Text>
                  </View>
                  <View style={{ width: "15%", alignItems: "center" }}>
                    <Text style={styles.cartSubtotalPrice}>₹100</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.innerView}
                  onPress={() => {
                    setDeliveryType("Standard Delivery");
                    setShippingAmount(0);
                  }}
                >
                  <View style={{ width: "10%", alignItems: "center" }}>
                    <FontAwesome
                      name={
                        deliveryType === "Standard Delivery"
                          ? "dot-circle-o"
                          : "circle-o"
                      }
                      color={Colors.brandColor}
                      size={textScale(20)}
                    />
                  </View>
                  <View style={{ width: "75%" }}>
                    <Text style={styles.innerMessageText}>
                      Standard Delivery (7-10 working Days)
                    </Text>
                    <Text style={styles.innerSubText}>
                      Applicable for PAN India
                    </Text>
                  </View>
                  <View style={{ width: "15%", alignItems: "center" }}>
                    <Text style={styles.cartSubtotalPrice}>₹0</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {discountedAmount > 0 && (
                <View style={styles.cartSubtotalHolder}>
                  <Text style={styles.cartSubtotalText}>Discount Applied:</Text>
                  <Text style={[styles.cartSubtotalPrice, { color: "green" }]}>
                    - ₹{discountedAmount.toFixed(2)}
                  </Text>
                </View>
              )}
              <View style={[styles.cartSubtotalHolder, { marginTop: 0 }]}>
                <Text style={styles.cartSubtotalText}>Final Price:</Text>
                <Text style={styles.cartSubtotalPrice}>₹{finalPrice}</Text>
              </View>
            </View>

            {/* Message View  */}
            {/* <View style={styles.messageView}>
            <Text style={styles.messageText}>
              Cash on delivery: Please contact us if you require {"\n"}{" "}
              assistance or wish to make alternate arrangements.
            </Text>
          </View> */}

            {/* Select Address Button */}

            {loading ? (
              <Loading size={30} color={Colors.forgetPassword} />
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => placeOrder()}
                style={styles.addressButton}
              >
                <Text style={styles.addressText}>Place Order</Text>
              </TouchableOpacity>
            )}
          </View>

          {showSuccessPopup && (
            <SuccessPopup
              showSuccessPopup={showSuccessPopup}
              setShowSuccessPopup={setShowSuccessPopup}
            />
          )}
          {/* <BottomModal
          visible={showDeliveryModal}
          data={deliveryMethodData}
          message={"Choose Delivery Type"}
          hideModal={() => setShowDeliveryModal(false)}
          selectedValue={(text) => {
            setDeliveryType(text?.title);
            setShippingAmount(text?.amount);
            setShowDeliveryModal(false);
            setShippingMessage(text?.message);
          }}
        /> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back,
  },
  content: {
    marginTop: moderateScaleVertical(10),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(5),
    marginHorizontal: moderateScale(10),
  },
  divider: {
    borderWidth: moderateScale(1),
    borderColor: Colors.border_grey,
    alignSelf: "center",
    width: "100%",
  },
  yourOrderView: {
    marginTop: moderateScaleVertical(10),
    marginHorizontal: moderateScale(10),
  },
  yourOrderText: {
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_Bold,
    fontSize: textScale(24),
    // textAlign: "center",
    marginBottom: moderateScaleVertical(5),
  },
  lowerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderTopWidth:0,
    // borderBottomWidth:2,
    // marginHorizontal: moderateScale(10),
    marginVertical: moderateScaleVertical(5),
    overflow: "hidden",
  },
  lowerText: {
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_Bold,
    fontSize: textScale(18),
  },
  cartImage: {
    width: "100%",
    height: moderateScale(100),
    borderRadius: moderateScale(5),
    borderColor: "red",
    // borderWidth:2
  },
  cartImageHolder: {
    width: "20%",
    height: moderateScale(75),
    alignItems: "center",
    justifyContent: "center",
    // borderWidth:2,
  },
  addressButton: {
    backgroundColor: Colors.forgetPassword,
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    width: moderateScale(300),
    alignSelf: "center",
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(25),
  },
  addressText: {
    color: Colors.white,
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  selectAddressCard: {
    marginVertical: moderateScaleVertical(5),
    borderColor: Colors.border_color,
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    width: "100%",
    gap: moderateScaleVertical(10),
  },
  customerName: {
    color: Colors.forgetPassword,
    fontSize: textScale(16),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  selectText: {
    fontSize: textScale(12),
    color: Colors.black,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  selectText1: {
    color: Colors.border_color,
    fontSize: textScale(12.5),
    fontFamily: FontFamily.Montserrat_Medium,
  },
  cartSubtotalHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(5),
    marginBottom: moderateScaleVertical(10),
  },
  cartSubtotalText: {
    fontSize: textScale(14),
    color: Colors.brandColor,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  cartSubtotalPrice: {
    fontSize: textScale(14),
    color: Colors.forgetPassword,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  itemName: {
    color: Colors.black,
    textTransform: "capitalize",
    fontSize: textScale(14),
    fontFamily: FontFamily.Montserrat_Medium,
  },
  priceText: {
    color: Colors.black,
    fontFamily: FontFamily.Montserrat_SemiBold,
    fontSize: textScale(14),
    textAlign: "right",
  },
  freightChargesHolder: {
    marginVertical: moderateScaleVertical(5),
    marginHorizontal: moderateScale(5),
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: moderateScaleVertical(20),
  },
  freightChargesText: {
    color: Colors.forgetPassword,
    fontSize: textScale(12),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  messageView: {
    width: "90%",
    alignSelf: "center",
    borderWidth: moderateScale(1),
    padding: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.border_color,
    backgroundColor: Colors.backGroundMessage,
    marginBottom: moderateScaleVertical(19),
    borderRadius: moderateScale(5),
  },
  messageText: {
    color: Colors.messageText,
    fontSize: textScale(11),
    fontFamily: FontFamily.Montserrat_Regular,
    textAlign: "center",
    lineHeight: scale(15),
  },
  typeHolder: {
    borderWidth: moderateScale(2),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    borderColor: Colors.back,
    backgroundColor: Colors.back,
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  view: {
    width: "100%",
    padding: moderateScale(5),
    paddingHorizontal: 0,
    gap: moderateScale(12),
    marginBottom: moderateScaleVertical(10),
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerMessageText: {
    fontFamily: FontFamily?.Montserrat_Medium,
    fontSize: textScale(13),
    color: Colors.brandColor,
  },
  innerSubText: {
    color: Colors.black,
    fontSize: textScale(12),
  },
});
