import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../Colors";
import CustomSlider from "./CustomSlider";
import CustomButton from "./CustomButton";
import Data from "../../assets/dummyjson/Categories.json";
import { CheckBox } from "@rneui/themed";
import { brandData } from "../../assets/dummyjson/brands";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import SubCategoryData from "../../assets/dummyjson/SubCategory.json";
const Header = ({
  title,
  onSort,
  onFilterBySize,
  onFilterByCategory,
  onFilterByBrand,
  option,
  categories,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  // Function to handle category selection
  const toggleCategorySelection = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleApplyFilter = () => {
    console.log(selectedCategories,"Line 60")
    onFilterByCategory(selectedCategories);
    setFilterModalVisible(false);
  };

  const resetFilter2 = () => {
    setLength(0);
    setWidth(0);
    setHeight(0);
    setSelectedCategories([]);
    onFilterBySize(20, 20, 20);
    onFilterByCategory([])
    setFilterModalVisible(false);
  };

  const handleSortOption = (option) => {
    onSort(option);
    setModalVisible(false);
  };

  // Function to handle brand selection
  const toggleBrandSelection = (brandId) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const toggleSubCategorySelection = (subCatId) => {
    if (selectedSubCategory.includes(subCatId)) {
      setSelectedSubCategory(
        selectedSubCategory.filter((id) => id !== subCatId)
      );
    } else {
      setSelectedSubCategory([...selectedSubCategory, subCatId]);
    }
  };
  const handleApplyBrandFilter = () => {
    const combinedArray = [...selectedBrands, ...selectedSubCategory];
    if (combinedArray.length > 0) {
      onFilterByBrand(combinedArray);
    } else {
      onFilterBySize(length, width, height);
    }
    setFilterModalVisible(false);
  };

  const resetBrandFilter = () => {
    setSelectedBrands([]); 
    onFilterByBrand([]); 
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <TouchableOpacity
        style={styles.iconHolder}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back-outline"
          size={moderateScale(30)}
          color={Colors.black}
        />
      </TouchableOpacity>
      <View style={styles.headerTextHolder}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.iconHolder2}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {/* <Octicons
            name="arrow-switch"
            size={textScale(30)}
            color={Colors.red}
            style={{ transform: [{ rotate: "90deg" }] }}
          /> */}
          <Ionicons name="swap-vertical" size={moderateScale(30)}
            color={Colors.red}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={moderateScale(30)} color={Colors.red} />
        </TouchableOpacity>
      </View>

      {/* Modal for sorting options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <Pressable
              style={styles.option}
              onPress={() => handleSortOption("default")}
            >
              <Text style={styles.optionText}>Default Sorting</Text>
            </Pressable>
            <Pressable
              style={styles.option}
              onPress={() => handleSortOption("highToLow")}
            >
              <Text style={styles.optionText}>Price: High to Low</Text>
            </Pressable>
            <Pressable
              style={styles.option}
              onPress={() => handleSortOption("lowToHigh")}
            >
              <Text style={styles.optionText}>Price: Low to High</Text>
            </Pressable>
            <Pressable
              style={[styles.option, { backgroundColor: Colors.red }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.optionText, { color: Colors.white }]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>
      {/* Modal for Filter */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={{ backgroundColor: Colors.white }} />
          <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
          <ScrollView
            style={{ width: "100%", flex: 1, backgroundColor: "white" }}
          >
            <View style={styles.headerHolder}>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons
                  name="arrow-back"
                  size={textScale(30)}
                  color={Colors.black}
                />
              </TouchableOpacity>

              <View style={styles.headerView}>
                <Text style={styles.modalTitle}>Filter By</Text>
              </View>
            </View>

            {option === "cat" && (
              <View style={styles.lowerView}>
                <Text style={styles.label}>Filter by Size</Text>
                <CustomSlider
                  name={"Length"}
                  minValue={0}
                  maxValue={20}
                  value={length}
                  onValueChange={setLength}
                />
                <CustomSlider
                  name="Width"
                  minValue={0}
                  maxValue={20}
                  value={width}
                  onValueChange={setWidth}
                />
                <CustomSlider
                  name="Height"
                  minValue={0}
                  maxValue={20}
                  value={height}
                  onValueChange={setHeight}
                />
              </View>
            )}
            {option === "brand" && (
              <View style={styles.lowerView}>
                <Text style={styles.label}>Filter by Category</Text>
                {Data.map((item) => {
                  const isChecked = selectedCategories.includes(
                    item.category_id
                  );
                  return (
                    <View key={item?.id} style={styles.contentContainer}>
                      <CheckBox
                        center
                        title={item?.name}
                        checked={isChecked}
                        onPress={() =>
                          toggleCategorySelection(item.category_id)
                        }
                      />
                    </View>
                  );
                })}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <CustomButton
                    name={"Apply"}
                    handleAction={handleApplyFilter}
                  />
                  <CustomButton name={"Reset"} handleAction={resetFilter2} />
                </View>
              </View>
            )}

            {option === "cat" && (
              <View style={styles.lowerView}>
                <Text style={styles.label}>Filter by Brand</Text>
                {brandData.map((item, index) => {
                  const isChecked = selectedBrands.includes(item.brandId);
                  return (
                    <View key={index} style={styles.contentContainer}>
                      <CheckBox
                        center
                        title={
                          item?.name.charAt(0).toUpperCase() +
                          item?.name.slice(1)
                        }
                        checked={isChecked}
                        onPress={() => toggleBrandSelection(item.brandId)}
                      />
                    </View>
                  );
                })}
                {option === "cat" && categories?.name === "Label" && (
                  <View
                    style={[
                      styles.lowerView,
                      { marginLeft: moderateScale(-20) },
                    ]}
                  >
                    <Text style={styles.label}>Filter by Sub Category</Text>
                    {SubCategoryData.map((item, index) => {
                      const isChecked = selectedSubCategory.includes(
                        item.category_id
                      );
                      return (
                        <View key={index} style={styles.contentContainer}>
                          <CheckBox
                            center
                            title={item?.name}
                            checked={isChecked}
                            onPress={() =>
                              toggleSubCategorySelection(item.category_id)
                            }
                          />
                        </View>
                      );
                    })}
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <CustomButton
                    name={"Apply"}
                    handleAction={handleApplyBrandFilter}
                  />
                  <CustomButton
                    name={"Reset"}
                    handleAction={resetBrandFilter}
                  />
                </View>
              </View>
            )}

            {/* </ScrollView> */}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(15),
    borderBottomColor: Colors.brandColor,
  },
  iconHolder: {
    padding: moderateScale(10),
    alignItems: "center",
  },
  headerTextHolder: {
    width: "60%",
    alignItems: "center",
  },
  headerText: {
    fontSize: textScale(20),
    color: Colors.brandColor,
    fontFamily: FontFamily.Montserrat_SemiBold,
    textAlign: "center",
  },
  iconHolder2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: moderateScale(15),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  modalTitle: {
    fontSize: textScale(18),
    fontFamily: FontFamily.Montserrat_Bold,
    marginBottom: moderateScaleVertical(10),
    color: Colors.brandColor,
  },
  option: {
    width: "100%",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: "center",
    backgroundColor: Colors.back,
    marginVertical: moderateScaleVertical(5),
  },
  optionText: {
    fontSize: textScale(16),
    color: Colors.brandColor,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  lowerView: {
    width: "100%",
    padding: moderateScale(10),
    backgroundColor: "white",
    gap: moderateScale(10),
    alignSelf: "center",
  },
  label: {
    fontSize: textScale(16),
    color: Colors.black,
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerHolder: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: moderateScale(10),
    backgroundColor: Colors.white,
  },
  headerView: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    color: Colors.black,
    fontSize: textScale(13),
    fontFamily: FontFamily.Montserrat_SemiBold,
  },
});
