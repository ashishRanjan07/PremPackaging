import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { responsiveFontSize, responsivePadding } from "../Responsive";
import Colors from "../Colors";
import {
  ArrowLeftIcon,
  CurrencyRupeeIcon,
  ArrowPathIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import Data from "../../assets/dummyjson/topProduct.json";
import DropDown from "../General/dropDown";
import PopularProducts from "./popularProducts";
import { Table, Row, Rows } from "react-native-table-component";
import ProductSlider from "./productSlider";
import ProgramerDropdown from "../ProgramerDropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPopup from "../General/loginPopup";
import Service from "../../API/Service";
import { ADD_TO_CART } from "../../API/API_service";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

export default function ProductDetails({
  showProductDetails,
  navigation,
  setShowProductDetails,
  allProducts,
  product,
}) {
  console.log("Passed Product", product);

  const staticImageURL = "https://picsum.photos/300";
  const [showFrieghtModal, setShowFrieghtModal] = useState(false);
  const [activeSection, setActiveSection] = useState("Product Details");
  const [cityModal, setCityModal] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [selectedState, setSelectedState] = useState("Select State");
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [selectedItem, setSelectedItem] = useState("Details");
  const [count, setCount] = useState(1);

  var user = null;

  const city = [
    { title: "Lucknow" },
    { title: "Ghaziabad" },
    { title: "Kanpur" },
  ];

  const openFreightModal = () => {
    setShowFrieghtModal(true);
  };

  const handleSectionChange = (sectionName) => {
    setActiveSection(sectionName);
  };

  const toggleCityModal = () => {
    setCityModal(!cityModal);
  };

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity);
    toggleCityModal();
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Update state to mark item as selected
  };

  const displayPopup = async () => {
    try {
      const data = await AsyncStorage.getItem("user_data");
      if (data !== null) {
        user = JSON.parse(data);
        handleAddToCart();
      } else {
        setShowLoginPopup(true);
      }
    } catch (e) {
      console.log("Error fetching data:", e);
    }
  };

  const handleAddToCart = async () => {
    let data = {
      product: {
        brand: product?.brand?._id,
        product: product?._id,
        category: product?.category?._id,
        packSize: product?.priceList[0].number,
        price: product?.priceList[0].MRP,
        quantity: 1,
        stock: 1000,
        totalWeight: product?.priceList[0].pack_weight,
      },
      user: user?._id,
    };

    console.log("Cart Item:", data);
    try {
      const response = await ADD_TO_CART(data);
      console.log(response);
      if (response?.success) {
        Alert.alert("Success!", "Item Added to Cart");
        navigation.navigate("Cart");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };
  const tableHead = ["Sr No.", "Weight", "Charges"];
  const tableData = [
    ["1.", "1Kg", "₹300"],
    ["2.", "2Kg", "₹1200"],
    ["3.", "3Kg", "₹500"],
    ["4.", "5Kg", "₹700"],
    ["5.", "5Kg", "₹700"],
    ["6.", "5Kg", "₹700"],
  ];

  const state = [{ title: "Uttar Pradesh" }, { title: "Madhya Pradesh" }];

  const handleDecrease = () => {
    count > 1 ? setCount(count - 1) : null;
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => setShowProductDetails(false)}>
          <ArrowLeftIcon
            size={responsivePadding(30)}
            strokeWidth={2}
            color={Colors.forgetPassword}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>

        <TouchableOpacity onPress={() => {}}>
          <HeartIcon
            size={responsivePadding(30)}
            strokeWidth={2}
            color={Colors.forgetPassword}
          />
        </TouchableOpacity>
      </View>

      {/* Product Details */}

      <View style={styles.details}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: responsivePadding(20),
          }}
        >
          <Text
            style={styles.productName}
          >{`${product?.name} ${product?.slug}`}</Text>
        </View>

        {/* Product Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: staticImageURL }}
            style={styles.prodImage}
            resizeMode="cover"
          />
        </View>
        {/* Other Images */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={styles.otherPics}
        >
          {Data?.top_products.map((item, i) => {
            return (
              <View style={styles.imageContainer}>
                <Image source={{ uri: staticImageURL }} style={styles.catImg} />
              </View>
            );
          })}
        </ScrollView>

        {/* About this Product */}

        <View style={styles.productAbout}>
          <Text style={styles.aboutTitle}>About this item</Text>
        </View>
        <View style={styles.bullets}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.aboutText}>*</Text>
            <Text style={styles.aboutText}>Price:</Text>
            <Text style={styles.aboutText}>{product?.priceList[0].MRP}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.aboutText}>*</Text>
            <Text style={styles.aboutText}>Brand:</Text>
            <Text style={styles.aboutText}>{product?.brand?.name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.aboutText}>*</Text>
            <Text style={styles.aboutText}>Structure:</Text>
            <Text style={styles.aboutText}>{product?.model}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.aboutText}>*</Text>
            <Text style={styles.aboutText}> Dimensions:</Text>
            <Text style={styles.aboutText}>{product?.size_inch}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.aboutText}>*</Text>
            <Text style={styles.aboutText}> Pack Of:</Text>
            <Text style={styles.aboutText}>
              {product?.priceList[0]?.pack_weight}
            </Text>
          </View>
        </View>
      </View>

      {/* Price and Stock Details */}

      <View style={styles.details}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: responsivePadding(10),
            marginBottom: responsivePadding(30),
          }}
        >
          <View style={{ marginTop: responsivePadding(10) }}>
            <Text style={styles.priceText}>Price</Text>
            <Text
              style={{
                color: Colors.black,
                fontWeight: "600",
                fontSize: responsiveFontSize(20),
              }}
            >
              ₹ {product?.priceList[0].MRP}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontWeight: "400",
                fontSize: responsiveFontSize(16),
              }}
            >
              M.R.P.
              <Text
                style={{
                  color: Colors.red,
                  textDecorationLine: "line-through",
                }}
              >
                {" "}
                ₹ 3500
              </Text>
            </Text>
          </View>

          <Text
            style={{
              color:
                product?.priceList[0].stock_quantity === 0
                  ? Colors.red
                  : Colors.green,
              fontSize: responsiveFontSize(18),
            }}
          >
            {product?.priceList[0].stock_quantity == 0
              ? "Out Of Stock"
              : "In Stock"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: responsivePadding(10),
            marginHorizontal: responsivePadding(20),
            marginBottom: responsivePadding(30),
          }}
        >
          <Pressable onPress={() => handleDecrease()} style={styles.btn}>
            <MinusIcon size={responsivePadding(16)} color={Colors.black} />
          </Pressable>

          <View
            style={[
              styles.btn,
              { width: 50, justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Text
              style={{
                color: Colors.forgetPassword,
                fontSize: responsiveFontSize(18),
                marginLeft: 10,
              }}
            >
              {count}
            </Text>
          </View>
          <Pressable
            onPress={() => handleIncrease()}
            style={[styles.btn, { backgroundColor: Colors.forgetPassword }]}
          >
            <PlusIcon size={responsivePadding(16)} color={Colors.white} />
          </Pressable>
        </View>

        {/* Add To Cart  */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: responsivePadding(30),
            marginHorizontal: responsivePadding(20),
          }}
        >
          <TouchableOpacity
            disabled={product?.priceList[0].stock_quantity == 0}
            onPress={() => {
              displayPopup();
            }}
            style={
              product?.priceList[0].stock_quantity == 0
                ? styles.outofStock
                : styles.addToCartButton
            }
          >
            <Text
              style={
                product?.priceList[0].stock_quantity == 0
                  ? styles.outofStockText
                  : styles.addToCartText
              }
            >
              Add To Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.favIcon}>
            <HeartIcon
              size={responsivePadding(30)}
              strokeWidth={2}
              color={Colors.red}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
      </View>

      <View style={styles.divider} />

      {/* Product Overview */}

      <View style={styles.details}>
        <View>
          {/* <View style={styles.productOverview}>
        <Text style={styles.productHead}>Product Details</Text>
        <Text style={styles.productHead}>Usage</Text>
        <Text style={styles.productHead}>Quick Overview</Text>
      </View> */}

          <ProductSlider
            onSectionChange={handleSectionChange}
            activeSection={activeSection}
          />

          {/* <View style={styles.divider} /> */}

          <View style={styles.productDetail}>
            <View style={styles.bullets}>
              {Data?.top_products.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.points,
                    selectedItem === item ? styles.selectedItem : null,
                  ]}
                  onPress={() => handleSelectItem(item)}
                >
                  <Text style={styles.bullet} />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={{ color: "black" }}>{item?.brand}</Text>
                    <Text style={{ color: "black" }}>{item?.category}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Other stats */}

      <View style={styles.details}>
        <PopularProducts
          title={"Related Products"}
          data={allProducts}
          navigation={navigation}
          handleAddToCart={handleAddToCart}
        />
      </View>

      {/* Frieght Modal Popup */}

      <Modal transparent={true} visible={showFrieghtModal}>
        <View style={styles.modalView}>
          <View style={styles.mainView}>
            <TouchableOpacity
              onPress={() => setShowFrieghtModal(false)}
              style={styles.closeIcon}
            >
              <XMarkIcon size={20} color={Colors.forgetPassword} />
            </TouchableOpacity>

            <View style={styles.rupeeIcon}>
              <CurrencyRupeeIcon
                size={responsivePadding(50)}
                color={Colors.forgetPassword}
              />
            </View>
            <Text
              style={{
                color: Colors.border_color,
                marginTop: 5,
                alignSelf: "center",
                fontSize: responsiveFontSize(18),
              }}
            >
              Calculate Freight Charges
            </Text>

            <View style={{ alignSelf: "center" }}>
              <ProgramerDropdown
                data={city}
                value={selectedCity}
                selectedData={(e) => setSelectedCity(e)}
                containerStyles={{ width: 250 }}
              />
            </View>

            {/* Table Data */}

            <View style={{ width: 250, height: 500, alignSelf: "center" }}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "gray" }}>
                <Row
                  data={tableHead}
                  style={styles.head}
                  textStyle={styles.headText}
                />
                <Rows data={tableData} textStyle={styles.text} />
              </Table>
            </View>
          </View>
        </View>
      </Modal>

      {/* cityModal Popup */}

      {showLoginPopup && (
        <LoginPopup
          showLoginPopup={showLoginPopup}
          setShowLoginPopup={setShowLoginPopup}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  main: {
    paddingTop: responsivePadding(20),
    marginHorizontal: responsivePadding(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: "400",
  },
  details: {
    backgroundColor: Colors.white,
    marginTop: responsivePadding(10),
    marginHorizontal: responsivePadding(10),
    borderRadius: responsivePadding(10),
  },
  productName: {
    color: Colors.black,
    fontSize: responsiveFontSize(20),
  },
  prodImage: {
    height: responsivePadding(200),
    width: responsivePadding(200),
  },

  catImg: {
    width: responsivePadding(60),
    height: responsivePadding(60),
  },

  divider: {
    borderWidth: 0.3,
    borderColor: Colors.border_grey,
    alignSelf: "center",
    width: "90%",
  },
  productAbout: {
    marginHorizontal: responsivePadding(10),
    marginTop: responsivePadding(20),
  },
  aboutTitle: {
    color: Colors.black,
    fontSize: responsiveFontSize(16),
    fontWeight: "600",
  },
  bullets: {
    marginTop: 10,
    marginLeft: 10,
    gap: 15,
    marginBottom: 30,
  },
  points: {
    flexDirection: "row",

    gap: 3,
  },
  bullet: {
    height: responsivePadding(3),
    width: responsivePadding(3),
    backgroundColor: Colors.black,
  },
  btn: {
    borderWidth: 0.5,
    borderColor: Colors.black,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: Colors.forgetPassword,
    padding: 8,
    paddingHorizontal: responsivePadding(70),
    borderRadius: responsivePadding(5),
  },
  addToCartText: {
    color: Colors.white,
    fontSize: responsiveFontSize(16),
    textTransform: "uppercase",
  },
  favIcon: {
    padding: 4,
    borderColor: Colors.border_color,
    borderWidth: 2,
    borderRadius: responsivePadding(5),
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsivePadding(10),
  },
  otherPics: {
    flexDirection: "row",
    marginHorizontal: responsivePadding(10),
    gap: 10,
  },
  catItem: {
    borderRadius: responsivePadding(50),
    padding: responsivePadding(5),
    marginHorizontal: responsivePadding(10),
  },
  imageContainer: {
    padding: 10,
    marginLeft: responsivePadding(10),
    borderColor: Colors.border_grey,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsivePadding(10),
  },
  catImg: {
    width: responsivePadding(60),
    height: responsivePadding(60),
  },
  priceText: {
    color: Colors.border_color,
    fontSize: responsiveFontSize(16),
    marginHorizontal: responsivePadding(10),
  },
  delivery: {
    borderWidth: 0.5,
    borderColor: Colors.black,
    padding: 8,
  },
  deliveryText: {
    color: Colors.black,
    fontSize: responsiveFontSize(13),
  },
  tcText: {
    color: Colors.blue,
    textDecorationLine: "underline",
  },
  deliveryDivider: {
    borderWidth: 0.5,
    borderColor: Colors.black,
    alignSelf: "center",
    width: "100%",
  },
  freightButton: {
    backgroundColor: Colors.forgetPassword,
    padding: 8,
    marginTop: responsivePadding(10),
    width: responsivePadding(300),
    paddingHorizontal: responsivePadding(50),
    borderRadius: responsivePadding(5),
    marginBottom: 30,
  },
  freightText: {
    fontSize: responsiveFontSize(13),
    color: Colors.white,
    textTransform: "uppercase",
  },
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
    height: responsivePadding(450),
    width: responsivePadding(300),
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.white,
  },
  closeIcon: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginHorizontal: responsivePadding(15),
    backgroundColor: Colors.border_grey,
    padding: 5,
    borderRadius: 50,
  },
  rupeeIcon: {
    alignSelf: "center",
  },
  head: { height: 40, fontWeight: "600", backgroundColor: "#C0C0C0" },
  text: { margin: 6, color: Colors.forgetPassword },
  headText: {
    color: Colors.forgetPassword,
    fontWeight: "600",
    textAlign: "center",
  },
  genderModalView: {
    backgroundColor: Colors.white,
    height: 300,
    width: 300,
    padding: responsivePadding(20),
    borderRadius: responsivePadding(10),
  },
  genderModalItem: {
    padding: responsivePadding(10),
    marginVertical: responsivePadding(5),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: responsivePadding(5),
    alignItems: "center",
    borderWidth: responsivePadding(1),
    borderRadius: responsivePadding(5),
  },
  genderModalText: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
  },
  productOverview: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  productHead: {
    color: "gray",
    fontSize: responsiveFontSize(14),
  },
  productDetail: {
    height: responsivePadding(350),
    width: "100%",
  },
  selectedItem: {
    borderBottomColor: "red", // Apply red border for selected item
  },
  aboutText: {
    color: "gray",
  },
  outofStock: {
    backgroundColor: Colors.outOfStock,
    padding: 8,
    paddingHorizontal: responsivePadding(70),
    borderRadius: responsivePadding(5),
  },
  outofStockText: {
    color: Colors.outOfStockText,
    fontSize: responsiveFontSize(16),
    textTransform: "uppercase",
  },
  productContainer: {
    flexDirection: "row",
    width: width * 3, // Total width for 3 sections
  },
  section: {
    width: width, // Width for each section
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
