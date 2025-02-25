import { Alert, LogBox, StyleSheet, Text, View ,BackHandler} from "react-native";
import React, { useEffect, useState } from "react";
import StackNavigation from "./src/navigation/StackNavigation";
import FlashMessage from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./src/screen/auth/NoInternet";
import JailMonkey from "jail-monkey";

import Toast from "react-native-toast-message";

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(["Remote debugger"]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    checkPhoneRooted();
    return () => unsubscribe();
  }, []);

  const checkPhoneRooted = () => {
    if (JailMonkey.isJailBroken()) {
      // Alternative behaviour for jail-broken/rooted devices.
      console.log("Yes");
      Alert.alert("Warning", "Your Phone is Rooted");
      const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () => backHandler.remove();
    } else {
      console.log("Not");
    }
  };

  return (
    <>
      {isConnected ? <StackNavigation /> : <NoInternet />}
      <FlashMessage position={"top"} animated={true} />
      <Toast />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
