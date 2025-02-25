import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../../components/Colors';
import {responsivePadding} from '../../components/Responsive';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImagePath} from '../../utils/ImagePath';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    fetchLocalData();
    setTimeout(() => {
      navigation.replace('Drawer');
    }, 2000);
  }, []);

  const fetchLocalData = async () => {
    let data = await AsyncStorage.getItem('user_data');
    console.log('Local Storage data:', data);
  };

  return (
    <>
      <View style={styles.main}>
        <SafeAreaView style={{backgroundColor: Colors.white}} />
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
        <View style={styles.imageHolder}>
          <Image
            source={ImagePath.landing}
            style={styles.ImageStyle}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.lowerImageHolder}>
        <Image
          source={ImagePath.splashLower}
          resizeMode="cover"
          style={styles.lowerImageStyle}
        />
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHolder: {
    width: '100%',
    alignItems: 'center',
    height: '25%',
  },
  ImageStyle: {
    height: '100%',
    width: '80%',
  },
  lowerImageHolder: {
    padding: responsivePadding(20),
    position: 'absolute',
    bottom: -25,
    right: -5,
    width: '100%',
    height: '40%',
    backgroundColor: Colors.white,
    alignItems: 'flex-end',
  },
  lowerImageStyle: {
    width: '75%',
    height: '100%',
    alignSelf: 'flex-end',
    marginRight: '-5%',
  },
});
