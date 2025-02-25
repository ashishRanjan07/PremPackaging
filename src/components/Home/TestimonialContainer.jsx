import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Data from "../../assets/dummyjson/testimonials.json";
import FontFamily from "../../utils/FontFamily";
import Colors from "../Colors";
import { moderateScale, scale, textScale } from "../../utils/ResponsiveSize";

const { width: screenWidth } = Dimensions.get("window");

const TestimonialContainer = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % Data.length;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
      }
      return nextIndex;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(scrollToNext, 2000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>Testimonial</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true} 
        showsHorizontalScrollIndicator={false}
      >
        {Data.map((item) => (
          <View style={[styles.itemHolder, { width: screenWidth*0.95 }]} key={item?.id}>
            <Text style={styles.nameText}>{item?.name}</Text>
            <Text style={styles.descriptionText}>{item?.feedback}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TestimonialContainer;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    alignSelf:'center',
  },
  headerText: {
    fontFamily: FontFamily.Montserrat_Bold,
    color: Colors.brandColor,
    fontSize: textScale(16),
    textTransform: "uppercase",
    textAlign: "center",
  },
  itemHolder: {
    borderWidth: moderateScale(2),
    gap: moderateScale(10),
    padding: moderateScale(10),
    alignItems: "center",
    margin: moderateScale(10),
    backgroundColor: "white",
    borderRadius: moderateScale(5),
    elevation: moderateScale(10),
    borderColor: "white",
    shadowRadius: moderateScale(3),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
  },
  nameText: {
    fontFamily: FontFamily?.Montserrat_SemiBold,
    fontSize: textScale(18),
    color: Colors.brandColor,
    textAlign: "center",
    lineHeight: scale(24),
    textTransform: "capitalize",
  },
  descriptionText: {
    fontFamily: FontFamily.Montserrat_Medium,
    color: Colors.black,
    fontSize: textScale(12),
    textAlign: "center",
    lineHeight: scale(24),
  },
});
