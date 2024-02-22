import React, {useEffect, useState} from "react";
import { ScrollView, StyleSheet, Text, View, Platform, TextInput,ImageBackground, TouchableOpacity, BackHandler, Alert, Image, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LaundryTips, MyCloset, CameraView, SearchTab } from ".";
import { PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { WeatherMap } from "./WeatherMap";

const API_KEY = 'af9b648cca108a3e1f62ddd87a6e86ef';

export default function Home({navigation}) {
    const [days, setDays] = useState<WeatherMap[]>();

    const GetWeater = async (latitude: number, longitude: number) => {
        try
        {
          const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`,
          );
        const textData = await res.text();
        const daily = JSON.parse(textData)
        setDays(daily)
        }
        catch {
          if (days === undefined) {
          throw new Error('openweathermap ERR: result not Found');
        }
      }
      };
      const CheckPermission = async () => {
        try {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          console.log(result);
          if (result === 'granted') {
            RunLocationFunction(GetWeater);
          }
        } catch (e) {
          console.log(e);
        }
      };
      useEffect(() => {
        CheckPermission();
      }, []);

    const RunLocationFunction = async (
    Func: (lat: number, lon: number) => void,
    ) => {
            return Geolocation.getCurrentPosition(
            position => {
        const {
        coords: {latitude, longitude},
        } = position;
      Func(latitude, longitude);
      console.log(latitude, longitude)
    },
    error => {
      throw new Error('Geolocation ERR:' + error);
    },
    {
      accuracy: {
        android: 'high',
        ios: 'best',
      },
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    },
  );
};
    const [searchText, onChangeText] = React.useState('');
    
   
    const SearchText = () => {
        navigation.navigate("SearchResult", {searchText});
    }
    return (
    <>
        <ScrollView contentContainerStyle={styles.scrollview}>
            <View style={styles.searchview}>
                <TextInput 
                    style={[styles.textinput, styles.border]}
                    onChangeText={onChangeText}
                    value={searchText}
                    placeholder="어떤 옷을 세탁하시나요? "
                    onFocus={() => navigation.navigate(SearchTab)}
                />
                <View style={styles.iconview}>
                    <Icon name='magnify' size={35} color={'white'} style={{marginTop:5}} onPress={() => SearchText()} />
                </View>
            </View>
            <View style={[styles.weatherbox, styles.border]}>
                <Text style={styles.TitleText}>오늘의 날씨 정보</Text>
                {!days || days.length === 0? (
                  <ActivityIndicator />
                ): (<> 
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="map-marker" size={30} color={"#1472FF"} style={{marginLeft: 20}}/>
                  <Text style={styles.citytext}>{days.name}</Text>
                </View>   
                <View style={styles.wetherinfo}>
                    <Image source={{uri: `https://openweathermap.org/img/wn/${days.weather[0].icon}@2x.png`}} style={{width: 35, height: 35}} resizeMode="stretch" />
                    <Text style={styles.ContentText}>{days.main.temp}°C</Text>
                    <Text style={styles.descText}>{days.weather[0].description}</Text>
                </View>
                </>
                )}
  
            </View>
            <ImageBackground source={require("../../assets/images/box.png")} style={{width:347, height:169, margin:20}} resizeMode='stretch'>
                <Text style={styles.laundrydescription}>얼룩을 깨끗하게 {'\n'}제거하고 싶다면?</Text>
                <TouchableOpacity style={styles.laudryButton} onPress={() => navigation.navigate(LaundryTips)}>
                    <Icon name='cloud-question' size={30} color={'black'} style={{marginRight: 5}} />
                    <Text style={styles.laundrybuttontext}>세탁꿀팁 얻어가기</Text>
                </TouchableOpacity>
            </ImageBackground>
            <ImageBackground source={require("../../assets/images/box.png")} style={{width:347, height:169, margin:20}} resizeMode='stretch'>
                <Text style={styles.laundrydescription}> 세탁법 까먹기 전에{'\n'} 적어두자!</Text>
                <TouchableOpacity style={styles.laudryButton} onPress={() => navigation.navigate(MyCloset)}>
                    <Icon name='wardrobe-outline' size={35} color={'black'} />
                    <Text style={styles.laundrybuttontext}>나의 옷장 등록하기</Text>
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>
        <View style= {styles.fab}>
            <Icon name='camera' size={35} color={'white'} onPress={() => navigation.navigate(CameraView)}/>
        </View>
    </>
    )
    
}

const styles = StyleSheet.create({
    scrollview: {
      backgroundColor: "white", 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      flexDirection:'row',
      padding: 20
    },
    searchview: {
      flexDirection:'row',
      borderWidth:2, 
      borderColor:'#1472FF',
      borderRadius: 20,
      width:347,
      height:50,
      alignItems:'center'
    },
    Weather:{
      width: 343,
      height: 116,
    },
    TitleText:{
      fontSize:18,
      fontWeight: '100',
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
      fontFamily: 'BMHANNA_11yrs_ttf',
      color: 'black'
    },
    ContentText:{
      fontSize:16,
      marginLeft: 5,
      fontFamily: 'NanumSquareNeo-bRg',
      color: 'black'
    },
    descText: {
      fontSize:16,
      marginLeft: 15,
      fontFamily: 'NanumSquareNeo-bRg',
      color: 'black'
    },
    searchbox: {height: 50},
    weatherbox: { 
      width: 347, 
      height: 130, 
      backgroundColor:'#ffffff', 
      margin: 20, 
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
    shadowRadius: 3.84,
      elevation: 5
    },
    border: {borderRadius: 20},
    textinput: {
      flex:5,
      fontFamily: 'NanumSquareNeo-bRg', 
      fontSize:14,  
      marginLeft:10
    },
    iconview: {
      flex:1,
      backgroundColor:"#1472FF", 
      borderTopRightRadius:20, 
      borderBottomRightRadius:20,
      height:50,
      width: 70,
      alignItems: 'center'
    },
    wetherinfo: {
      flexDirection: 'row',
      marginLeft: 20,
      alignItems:'center'
    },
    citytext: {
      fontFamily: 'NanumSquareNeo-cBd',
      fontSize: 14,
      marginLeft: 10,
      color: 'black'
    },
    fab: {
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0057FF',
      position: 'absolute',
      right: 30,
      bottom: Platform.select({ios:100, android: 20}),
      padding: 10,
      borderRadius: 35
    },
    laudryButton: {
        flexDirection:'row', 
        alignItems:'center',
        marginTop:45,
        marginLeft:70
    },
    laundrybuttontext: {
        fontFamily: 'BMHANNA_11yrs_ttf', 
        color:'black', 
        fontSize:18 
    },
    laundrydescription: {
        fontFamily: 'NanumSquareNeo-cBd',
        textAlign:'center', 
        color:'black', 
        marginTop:30, 
        fontSize:15
    }
  })
  