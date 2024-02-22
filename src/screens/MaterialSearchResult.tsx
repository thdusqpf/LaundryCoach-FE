;import React, {useEffect, useState} from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Pressable} from "react-native";
import { CameraView, LoadingScreen, TopBar } from ".";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { generateClient } from "aws-amplify/api";

const client = generateClient()

const apiEndpoint = 'https://f2xjalyryd.execute-api.ap-northeast-2.amazonaws.com/staging';


export default function MaterialSearchResult({route, navigation}) {
    const {searchText, searchMaterialText} = route.params;
    console.log("searchText, searchmaterial:", searchText, searchMaterialText)
    console.log("type searchText, type searchMaterial:", typeof(searchText), typeof(searchMaterialText))
    const apiUrl = `${apiEndpoint}/clothSearch?filter=${encodeURIComponent(searchText)}&material=${encodeURIComponent(searchMaterialText)}`;
    const [title, setTitle] = useState('');
    const [materials, setMaterials] = useState('');
    const [summary, setSummarys] = useState('');
    
    console.log("apiurl2:", apiUrl)
    async function fetchInformation() {
        try {
            console.log("fetching information...")
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log("Data:", data)
            const title = data.title;
            const materials = data.materials;
            const summary = data.summary;
            console.log("information loading....")
            console.log("title:", title);
            console.log("materials:", materials);
            console.log("summary:", summary);
            setTitle(title);
            setMaterials(materials);
            setSummarys(summary);
        } catch (error) {
            console.error('Error fetching search result:', error);
        }
    }
    useEffect(() => {
        fetchInformation();
      }, []);
  
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView>
            <TopBar />
            <View style={styles.searchview}>
                <TextInput 
                    style={[styles.textinput, styles.border]}
                    value={searchMaterialText}
                    />
                <View style={styles.iconview}>
                <Icon name='magnify' size={35} color={'white'} style={{marginTop:5}} />
                </View>
            </View>
            <ScrollView style={[styles.mainbox, styles.border]}>
                <View style={styles.buttonview}>
                    <View style={styles.resultbutton} >
                        <Text style={styles.buttontext}>검색 결과</Text>
                    </View>
                    <Icon name="tray-arrow-down" size={30} color={'#1472FF'} />
                </View>
                {!title || title.length === 0? (
                <>
                <LoadingScreen />
                </>): (
                    <>
                    <Text style={styles.text}>{title}(을)를 세탁하는 일반적인 방법은 다음과 같습니다.</Text>
                    <Text style={styles.text}>{materials}</Text>
                    <Text style={styles.text}>{summary}</Text>
                </>
                )}
            </ScrollView>
                <View style={[styles.materialbox, styles.border]}>
                    <Text style={styles.materialText2}>위의 결과는 옷의 종류에 따른 일반적인 소재와 세탁 방법이므로, 정확한 세탁 방법은 세탁라벨을 확인하시는 것을 권장드립니다.</Text>
                    <Pressable onPress={() => navigation.navigate(CameraView)} style={styles.button}>
                        <Text style={styles.buttonText}>세탁 라벨 이미지 검색</Text>
                    </Pressable>
                </View>

                </ScrollView>
        </SafeAreaView>
    )}


const styles = StyleSheet.create({
    resultbutton: {
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#1472FF',
        width: 130,
        height: 40,
        justifyContent:'center',
        alignItems: 'center',
        marginRight:140
    },
    buttontext: {
        fontFamily: 'NanumSquareNeo-dEb',
        fontSize: 14,
        color: '#1472FF'
    },
    searchview: {
        flexDirection:'row',
        borderWidth:2, 
        borderColor:'#1472FF',
        borderRadius: 20,
        width:347,
        height:50,
        alignItems:'center',
        marginTop: 20,
        marginLeft: 20
    },
    searchview2: {
        flexDirection:'row',
        borderWidth:2, 
        borderColor:'#1472FF',
        borderRadius: 20,
        width:300,
        height:50,
        alignItems:'center',
        marginTop: 20,
        marginLeft: 5
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
    mainbox: { 
        padding: 20,
        width: 345, 
        height: 500, 
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
    text: {
        fontFamily: 'NanumSquareNeo-bRg',
        fontSize: 15,
        color: 'black',
        margin: 10
    },
    buttonview: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    materialbox: { 
        padding: 20,
        width: 345, 
        height: 200, 
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
    materialText: {
        fontFamily: 'BMHANNA_11yrs_ttf',
        fontSize: 18,
        color: 'black',
        marginLeft: 5
    },
    materialText2: {
        fontFamily: 'NanumSquareNeo-bRg',
        fontSize: 14,
        color: 'black'
    },
    button: {
        backgroundColor: '#0057FF',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 300,
        height: 48,
        marginTop: 20
    },
    buttonText:{
        fontFamily: ' NanumSquareNeo-dEb',
        textAlign:"center",
        color:"#fff",
    }
})
