import { StyleSheet, Text, View } from "react-native";
import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import FontFamily from "../../utils/FontFamily";
import Colors from "../Colors";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";

const YtVideo = () => {
  const handleOnReady = () => {
    console.log("Video is ready!");
  };

  const handleOnError = (error) => {
    console.error("Video encountered an error: ", error);
  };

  const handleOnChangeState = (state) => {
    console.log("Video state changed to: ", state);
  };

  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>E-COMMERCE VIDEO</Text>
      <YoutubePlayer
        height={320}
        play={false}
        videoId={"7hIsUYzLc7U"}
        onReady={handleOnReady}
        onError={handleOnError}
        onChangeState={handleOnChangeState}
      />
    </View>
  );
};

export default YtVideo;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FontFamily.Montserrat_Bold,
    color: Colors.brandColor,
    fontSize: textScale(16),
    textTransform: "uppercase",
    textAlign: "center",
  },
  main: {
    marginVertical: moderateScaleVertical(10),
    width: "95%",
    padding: moderateScale(10),
    alignSelf: "center",
    borderRadius: moderateScale(10),
    backgroundColor: "white",
    borderColor: "white",
    elevation: moderateScale(5),
    shadowRadius: moderateScale(3),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    gap: moderateScaleVertical(10),
    height:moderateScale(260)
  },
});
