import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Colors";
import { GET_ALL_ORDERS } from "../../API/API_service";
import { BallIndicator } from "react-native-indicators";
import InternalHeader from "../header/InternalHeader";
import { useNavigation } from "@react-navigation/native";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import FastImage from "react-native-fast-image";

const MyOrders = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params;
  console.log(user,"Line 29")
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const staticImageURL = "https://picsum.photos/300";

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const response = await GET_ALL_ORDERS(user?._id);
      if (response?.success) {
        setOrderData(response?.data);
        setLoading(false);
      }
      if (!response?.success) {
        Alert.alert("No Order Found", response?.message);
        setLoading(false);
      }
    } catch (e) {
      console.log(e, "Line 65");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.renderItem}
        key={item?._id}
        onPress={() => navigation.navigate("OrderDetails", { item: item })}
      >
        <View style={styles.contentHolder}>
          {/* <View style={styles.imageHolder}>
            <FastImage
              style={styles.image}
              source={{
                uri: item?.items[0]?.product?.images[0]?.image,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.web,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View> */}
          <View style={styles.textHolder}>
            <Text style={styles.nameText}>
              {item?.items[0]?.product?.name} {item?.items[0]?.product?.slug}
            </Text>
            <Text numberOfLines={2} style={styles.descriptionText}>
              {item?.items[0]?.product?.meta_description}
            </Text>
            <Text></Text>
          </View>
          <View style={styles.priceHolder}>
            <Text
              style={[
                styles.nameText,
                { fontSize: textScale(16), textAlign: "center" },
              ]}
            >
              ₹{item?.totalOrderValue}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <InternalHeader title={"Order History"} />
      {loading ? (
        <View style={styles.loaderView}>
          <View style={styles.loaderContainer}>
            <BallIndicator color={Colors.brandColor} />
            <Text style={styles.loaderText}>
              Loading your order history please wait...
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {orderData.length > 0 ? (
            <FlatList
              data={orderData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          ) : (
            <View style={styles.NoOrderView}>
              <Text style={styles.loaderText}>
                You haven't order anything yet!
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.back,
  },
  loaderText: {
    fontSize: textScale(16),
    color: Colors.brandColor,
    textAlign: "center",
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  loaderView: {
    flex: 1,
    justifyContent: "center",
    padding: moderateScale(10),
  },
  loaderContainer: {
    gap: moderateScale(30),
    width: "90%",
    alignSelf: "center",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    borderColor: Colors.brandColor,
    backgroundColor: Colors.white,
    paddingTop: moderateScaleVertical(30),
    alignItems: "center",
    justifyContent: "center",
  },
  renderItem: {
    width: "95%",
    alignSelf: "center",
    marginVertical: moderateScaleVertical(5),
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    borderColor: Colors.border_grey,
    elevation: moderateScale(5),
    backgroundColor: Colors.white,
  },
  contentHolder: {
    flexDirection: "row",
    gap: moderateScale(10),
    width: "100%",
  },
  imageHolder: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: moderateScale(100),
    borderRadius: moderateScale(10),
    alignSelf: "center",
  },
  textHolder: {
    width: "75%",
    gap: moderateScale(5),
  },
  nameText: {
    fontSize: textScale(14),
    color: Colors.brandColor,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  descriptionText: {
    fontSize: textScale(14),
    color: Colors.black,
    fontFamily: FontFamily.Montserrat_Regular,
  },
  priceHolder: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  NoOrderView: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
