import React, {useEffect} from 'react';
import { View, StyleSheet, Animated, Dimensions,SafeAreaView, Text, ActivityIndicator } from 'react-native';

const {width, height} = Dimensions.get('window')

const SplashScreen = () => {
  const imageScale = new Animated.Value(0.1);
  const imageScale2 = new Animated.Value(0);

  
  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  Animated.timing(imageScale2, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
    delay:700
  }).start();
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <View style={styles.lettercontainer}>
            <ActivityIndicator/>
            <Text
                style={[styles.lettertext]}
            >
                로딩중..
            </Text>
        </View>
        <Animated.Image
            source={require('../../assets/images/wave.png')}
            style={[styles.logoimage, {transform: [
                {
                    translateY: imageScale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -320]
                    })
                }]}]}
                
            />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lettercontainer: {
    height:'100%',
    justifyContent:"center",
    alignItems:'center',
    backgroundColor: 'white'
  },
  logocontainer: {
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    backgroundColor: 'white'
  },
  letterimage: {
    width: 268,
    height: 63
  },
  logoimage: {
    width,
    height: height/2
  },
  lettertext: {
    fontFamily: 'BMHANNA_11yrs_ttf',
    color:'black',
    fontSize: 14
  }
});

export default SplashScreen;