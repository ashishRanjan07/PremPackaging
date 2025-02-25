import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../components/Colors";
import BottomNavigationHeader from "../../components/General/BottomNavigationHeader";
import HomeSearch from "../../components/General/HomeSearch";
import { brandData } from "../../assets/dummyjson/brands";
import CategoriesListData from "../../assets/dummyjson/Categories.json";
import { GET_ALL_PRODUCTS, HOME_PRODUCTS_SEARCH } from "../../API/API_service";
import { BallIndicator } from "react-native-indicators";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPopup from "../../components/General/loginPopup";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import _ from "lodash";
import PopularProducts from "../../components/Home/popularProducts";
import { ImagePath } from "../../utils/ImagePath";
import FastImage from "react-native-fast-image";
import LoaderModal from "../../components/General/LoaderModal";
import debounce from "lodash.debounce";
import TestimonialContainer from "../../components/Home/TestimonialContainer";
import YtVideo from "../../components/Home/YtVideo";
import Description from "../../components/Home/Description";
import CustomButton from "../../components/General/CustomButton";
import CustomPackagingButton from "../../components/Home/CustomPackagingButton";
import HomePopularProduct from "../../components/Home/HomePopularProduct";

const Home = () => {
  const navigation = useNavigation();
  const staticImageURL = "https://picsum.photos/300";
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [cartValueChanged, setCartValueChanged] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const placeholderImage = "https://prempackaging.com/img/logo.png";
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dealProduct, setDealProduct] = useState([]);

  const mapBrandName = (brandId) => {
    switch (brandId) {
      case "6557dbbc301ec4f2f4266107":
        return "Flipkart";
      case "6557dbcc301ec4f2f426610b":
        return "Myntra";
      case "6557dbad301ec4f2f4266103":
        return "Amazon";
      case "6582c8580ab82549a084894f":
        return "Ajio";
      case "6557dbf9301ec4f2f426611e":
        return "Rollabel";
      case "6557dc10301ec4f2f4266122":
        return "Pack-Secure";
      case "6582c8750ab82549a0848953":
        return "PackPro";
      default:
        return "Unknown Brand";
    }
  };

  const searchProducts = async (query) => {
    const data = { search: query };
    try {
      const response = await HOME_PRODUCTS_SEARCH(data);
      console.log(response, "Line 23");
      setSearchResults(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = debounce((text) => {
    if (text.length > 0) {
      searchProducts(text);
    } else {
      setSearchResults([]);
    }
  }, 500);

  useEffect(() => {
    handleSearch(searchText);
    return () => handleSearch.cancel();
  }, [searchText]);

  const handleSelectProduct = (product) => {
    navigation.navigate("ProductDetails", { item: product });
    setSearchText("");
    setSearchResults([]);
  };

  const getDropdownText = (item) => {
    const brandName = mapBrandName(item.brand);
    return `${brandName} - ${item.name} - ${item.model}`;
  };

  const filteredResults = searchResults.filter((item) => {
    const dropdownText = getDropdownText(item);
    return dropdownText.toLowerCase().includes(searchText.toLowerCase());
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  const loadWishlist = async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.log("Error loading wishlist", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearchText("");
        setSearchResults([]);
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      loadWishlist();
    }, [])
  );

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await GET_ALL_PRODUCTS();
      if (response && response?.data) {
        const filteredPopularProducts = response.data.filter(
          (item) => item.top_product === true
        );
        const dealProducts = response.data.filter(
          (item) => item?.deal_product === true
        );
        setDealProduct(dealProducts);
        setAllProducts(response?.data);
        setFilteredProducts(filteredPopularProducts);
      }
      setLoading(false);
    } catch (e) {
      console.log("Error fetching Products", e?.message);
      setLoading(false);
    }
  };

  const handleCategoriesClicked = async (list) => {
    setNavigating(true);
    try {
      setTimeout(async () => {
        let filteredData = [];

        if (list.name === "Tape") {
          const tapeCategories = [
            "6557df64301ec4f2f4266141",
            "6557df71301ec4f2f4266145",
            "6642e8f665f20fe41ab417bc",
          ];
          filteredData = allProducts.filter((item) =>
            tapeCategories.includes(item.category?._id)
          );
        } else {
          filteredData = allProducts.filter(
            (item) => item.category?._id === list?.category_id
          );
        }

        navigation.navigate("CategoryDetailsTwo", {
          categories: list,
          data: filteredData,
          option: "cat",
        });
        setNavigating(false); // Hide loader after delay
      }, 1000); // Add 1-second delay
    } catch (error) {
      console.log("Error navigating to category", error);
      setNavigating(false); // Hide loader on error
    }
  };

  const handleBrandCLicked = async (brand) => {
    console.log(brand, "Line 200");
    setNavigating(true);
    try {
      setTimeout(async () => {
        navigation.navigate("CategoryDetailsTwo", {
          categories: brand,
          data: allProducts.filter((item) => item.brand._id === brand.brandId),
          option: "brand",
        });
        setNavigating(false);
      }, 1000);
    } catch (error) {
      console.log("Error navigating to brand", error);
      setNavigating(false);
    }
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
      <BottomNavigationHeader cartValueChanged={cartValueChanged} />
      <View style={{backgroundColor:Colors.white,paddingBottom:moderateScaleVertical(10)}}>
      <HomeSearch
        placeholder={"Search for Products"}
        searchText={searchText}
        setSearchText={(text) => setSearchText(text)}
        filteredResults={filteredResults}
        getDropdownText={getDropdownText}
        handleSelectProduct={handleSelectProduct}
      />
      </View>
     
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <BallIndicator color={Colors.brandColor} />
            <Text style={styles.loaderText}>
              Loading brand, categories and popular products please wait...
            </Text>
          </View>
        ) : (
          <>
            {/* Brand */}
            <View
              style={[
                styles.shopByBrand,
                { marginTop: moderateScaleVertical(15) },
              ]}
            >
              <View style={styles.brandView}>
                <Text style={styles.brandText}>
                  WE ARE AUTHORISED VENDOR FOR
                </Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={styles.brandHolder}
                >
                  {brandData.map((brand) => (
                    <TouchableOpacity
                      key={brand.id}
                      style={[
                        styles.imageHolder,
                        {
                          borderColor:
                            selectedBrand?.id === brand.id
                              ? Colors.brandColor
                              : Colors.red,
                          backgroundColor:
                            selectedBrand?.id === brand.id
                              ? Colors.white
                              : Colors.back,
                        },
                      ]}
                      onPress={() => handleBrandCLicked(brand)}
                    >
                      <FastImage
                        style={styles.imageStyle}
                        source={{
                          uri: brand.image,
                          priority: FastImage.priority.high,
                          cache: FastImage.cacheControl.web,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View
              style={{
                backgroundColor: Colors.back,
                marginVertical:moderateScaleVertical(10)
              }}
            >
              <CustomPackagingButton />
            </View>
            {/* Categories */}
            <View style={styles.shopByBrand}>
              <View style={styles.brandView}>
                <Text style={styles.brandText}>SHOP BY CATEGORY PRODUCTS</Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={styles.brandHolder}
                >
                  {CategoriesListData.map((list) => (
                    <TouchableOpacity
                      onPress={() => handleCategoriesClicked(list)}
                      key={list.id}
                      style={styles.imageHolder2}
                    >
                      <View style={styles.imgHolder}>
                        {list.name === "Corrugated Box" && (
                          <FastImage
                            style={styles.imageStyle}
                            source={ImagePath.corrugatedBox}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        )}
                        {list.name === "Label" && (
                          <FastImage
                            style={styles.imageStyle}
                            source={ImagePath.Label}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        )}
                        {list.name === "Paper Bag" && (
                          <FastImage
                            style={styles.imageStyle}
                            source={ImagePath.paperBag}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        )}
                        {list.name === "Poly Bag" && (
                          <FastImage
                            style={styles.imageStyle}
                            source={ImagePath.polyBag}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        )}
                        {list.name === "Tape" && (
                          <FastImage
                            style={styles.imageStyle}
                            source={ImagePath.boppTape}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        )}
                      </View>
                      <Text style={styles.categoriesText}>{list.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Popular Products */}
            <View style={styles.popularProductHolder}>
              <View style={styles.brandView}>
                <Text style={styles.brandText}>SHOP FROM TOP PRODUCTS</Text>
                <View style={styles.productHolder}>
                  <HomePopularProduct data={filteredProducts} />
                </View>
              </View>
            </View>
            <View style={styles.popularProductHolder}>
              <View style={styles.brandView}>
                <Text style={styles.brandText}>
                  BEST DEALS ON FEATURED PRODUCTS
                </Text>
                <View style={styles.productHolder}>
                  <HomePopularProduct data={dealProduct} />
                </View>
              </View>
            </View>
            {/* Testimonial */}
            <Description />
            <YtVideo />
            <TestimonialContainer />
          </>
        )}
      </ScrollView>

      {showLoginPopup && (
        <LoginPopup
          showLoginPopup={showLoginPopup}
          setShowLoginPopup={setShowLoginPopup}
        />
      )}
      <LoaderModal visible={navigating} message="Loading, please wait..." />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.back,
  },
  shopByBrand: {
    padding: moderateScale(10),
    backgroundColor: Colors.back,
  },
  brandHolder: {
    marginVertical: moderateScaleVertical(5),
  },
  brandView: {
    width: "100%",
    alignSelf: "center",
  },
  brandText: {
    fontSize: textScale(16),
    color: Colors.brandColor,
    // fontFamily: FontFamily.Montserrat_SemiBold,
    padding: moderateScale(10),
    textAlign: "center",
    fontWeight: "700",
  },
  imageHolder: {
    borderWidth: moderateScale(1),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    borderColor: Colors.searchIcon,
    backgroundColor: Colors.white,
    overflow: "hidden",
    width: moderateScale(120),
    height: moderateScale(70),
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
    overflow: "visible",
  },
  imageHolder2: {
    width: moderateScale(120),
    marginHorizontal: moderateScale(5),
    alignItems: "center",
    gap: moderateScale(5),
  },
  imgHolder: {
    borderRadius: moderateScale(250),
    overflow: "hidden",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(110),
    width: moderateScale(110),
  },
  imageStyle2: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(50),
  },
  categoriesText: {
    fontSize: textScale(12),
    fontFamily: FontFamily.Montserrat_Bold,
    color: Colors.black,
    lineHeight: scale(20),
    textAlign: "center",
  },
  popularProductHolder: {
    backgroundColor: Colors.back,
    alignSelf: "center",
    width: "100%",
    paddingVertical: moderateScale(10),
  },
  productHolder: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: moderateScale(15),
    alignSelf: "center",
    // marginTop: moderateScaleVertical(10),
    justifyContent: "center",
  },
  item: {
    padding: moderateScale(10),
    backgroundColor: Colors.white,
    elevation: moderateScale(10),
    gap: moderateScale(5),
    width: "45%",
  },
  image: {
    width: "95%",
    height: moderateScale(140),
  },
  loaderText: {
    fontSize: textScale(16),
    color: Colors.brandColor,
    textAlign: "center",
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  loaderContainer: {
    gap: moderateScale(30),
    width: "90%",
    alignSelf: "center",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    borderColor: Colors.brandColor,
    backgroundColor: Colors.back,
    paddingTop: moderateScaleVertical(30),
  },
});
