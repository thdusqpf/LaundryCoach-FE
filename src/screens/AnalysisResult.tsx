import { head } from "aws-amplify/api";
import React, {useEffect, useState} from "react";
import { SafeAreaView, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, BackHandler, Modal, Alert} from "react-native";
import TopBar from "./TopBar";
import { getUrl } from 'aws-amplify/storage';
import { Wash, Bleach, Dry, Iron, Dryclean, CollapsibleViewCheck, SaveResult } from '.';
import { generateClient } from "aws-amplify/api";
import { listMyClosets, getMyCloset, listWashingMethods, getWashingMethod } from "../graphql/queries";
import { createAnalysisResult } from "../graphql/mutations";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';
import { TextInput } from "react-native-gesture-handler";
const userSelector = (context) => [context.user];
const client = generateClient();

export default function AnalysisResult({navigation}) {
    const [imageUrl, setImageUrl] = useState("");
    const [isCheckModalVisible, setCheckModalVisible] = useState(false);
    const { user, signOut } = useAuthenticator(userSelector);
    const [newSymbols, setNewSymbols] = useState([]); // 나중엔 분석 결과 심볼을 저장할 상태
    const [wash, setWash] = useState([]);
    const [bleach, setBleach] = useState([]);
    const [dry, setDry] = useState([]);
    const [iron, setIron] = useState([]);
    const [dryclean, setDryclean] = useState([]);
    const [wiring, setWiring] = useState([]);

    const [title, setTitle] = useState("");
    const [memo, setMemo] = useState("");

    useEffect(() => {
        query();
    }, []);

    async function query() {
        try {
            // List all items
            const allWashingMethods = await client.graphql({
                query: listWashingMethods
            });
            const result = allWashingMethods.data.listWashingMethods.items;

            setWash(result.filter(item => item.category === "세탁"));
            setBleach(result.filter(item => item.category === "표백"));
            setDry(result.filter(item => item.category === "건조"));
            setIron(result.filter(item => item.category === "다림질"));
            setDryclean(result.filter(item => item.category === "드라이클리닝"));
            setWiring(result.filter(item => item.category === "짜는 방법"));
        } catch (error) {
            console.error("Error querying WashingMethods:", error);
        }
    }

    useEffect(() => {
    const backAction = () => {
        navigation.navigate('Home')
        return true;
    };
    
      // 리스너 등록
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    return () => {
        // 이벤트 리스너 해제
        backHandler.remove();
      };
    }, []);

    useEffect(() => {
        async function fetchFiles() {
            console.log("fetching images....")
            const getUrlResult = await getUrl({
                key: "cb529738-9ae8-4329-a9f7-cfd4c02b23aa.png",
            });
            console.log('signed URL: ', getUrlResult.url);
            console.log('URL expires at: ', getUrlResult.expiresAt);
            setImageUrl(getUrlResult.url.toString());
            console.log("end...")
        }
        fetchFiles();
    }, []);

        async function newAnalysisResult() {
            await client.graphql({
                query: createAnalysisResult,
                variables: {
                    input: {
                    "user_id":  user.username,
                    "title": title,
                    "imagePath": "https://laundrycoachbucket75411-staging.s3.ap-northeast-2.amazonaws.com/public/1353d47b-1017-407f-aedb-f93d8c4aa546.png",
                    "symbol": newSymbols,
                    "memo": memo
                }
                }
            });
        } 
        const goToSearchResult = () => {
            newAnalysisResult(),
            navigation.navigate(SaveResult);
        }
        const handleSymbolsSave = (selectedSymbols) => {
            // 모달을 닫기 전에 선택된 항목을 저장하고 부모 컴포넌트에 전달
            setNewSymbols(selectedSymbols);
            console.log("입력받은 심볼: ", selectedSymbols);
            setCheckModalVisible(!isCheckModalVisible);
        };
    return (
        <SafeAreaView style={styles.backgroundArea}>
            <ScrollView style={styles.backgroundArea}>
                <TopBar />
                <View style={styles.resultView}>
                    <Text style={styles.titletext}>세탁 라벨 검색 결과</Text>
                    {imageUrl && <Image 
                        style={styles.imageview}
                        source={{uri:imageUrl}}
                        resizeMode={'stretch'} />}
                </View>
                <View style={styles.methodview}>
                    <View style={styles.methodtitleview}>
                        <Text style={styles.titletext}>세탁 방법</Text>
                        
                        <Modal
                            style={styles.modalView}
                            animationType="slide"
                            transparent={true}
                            visible={isCheckModalVisible}
                            onRequestClose={() => {
                                setCheckModalVisible(!isCheckModalVisible);
                            }}
                            >
                            <ScrollView style={styles.modalView}>
                            <CollapsibleViewCheck 
                                item={newSymbols} 
                                handleSymbolsSave={handleSymbolsSave}
                                ></CollapsibleViewCheck>
                            </ScrollView>    
                            </Modal>                            
                        
                    </View>
                    <View style={styles.titleBox}>
                        <Text style={styles.titleText}>제목: </Text>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Item Title"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    <View style={styles.titleBox}>
                            <Text style={styles.titleText}>메모: </Text>
                            <TextInput
                                style={styles.titleInputMemo}
                                placeholder="Item memo"
                                value={memo}
                                onChangeText={(text) => setMemo(text)}
                                multiline
                                numberOfLines={4}
                            />
                        </View>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.selectButton} onPress={() => setCheckModalVisible(!isCheckModalVisible)}>
                        <Text style={styles.buttontext}>직접 선택</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectButton} onPress={goToSearchResult}>
                      <Text style={styles.buttontext}>저장</Text>
                    </TouchableOpacity>
                    </View>
                    
                    <View style={styles.symbolBox}>
                          {newSymbols.map((symbol, index) => {
                            let match = wash.find((washItem) => washItem.desc === symbol);
                            if(!match){
                                match = bleach.find((bleachItem) => bleachItem.desc === symbol);
                            }
                            if(!match){
                                match = dry.find((dryItem) => dryItem.desc === symbol);
                            }
                            if(!match){
                                match = iron.find((ironItem) => ironItem.desc === symbol);
                            }
                            if(!match){
                                match = dryclean.find((drycleanItem) => drycleanItem.desc === symbol);
                            }
                            if(!match){
                                match = wiring.find((wiringItem) => wiringItem.desc === symbol);
                            }
                            if (match) {
                                return (
                                <View key={index} style={styles.contentText}>
                                    <Image source={{uri:match.symbol}} style={{ width: 25, height: 25, marginLeft:10 }}/>
                                </View>
                                );
                            }
                        })}  
                        </View>
                    <View style={styles.contentBox}>
                          {newSymbols.map((symbol, index) => {
                            let match = wash.find((washItem) => washItem.desc === symbol);
                            if(!match){
                                match = bleach.find((bleachItem) => bleachItem.desc === symbol);
                            }
                            if(!match){
                                match = dry.find((dryItem) => dryItem.desc === symbol);
                            }
                            if(!match){
                                match = iron.find((ironItem) => ironItem.desc === symbol);
                            }
                            if(!match){
                                match = dryclean.find((drycleanItem) => drycleanItem.desc === symbol);
                            }
                            if(!match){
                                match = wiring.find((wiringItem) => wiringItem.desc === symbol);
                            }
                            if (match) {
                                return (
                                <View key={index} style={styles.contentText}>
                                    <Text>• {symbol}</Text>
                                </View>
                                );
                            }
                        })}  
                        </View>
                        
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundArea: { 
        flex: 1,
        backgroundColor: 'white'
    },
    resultView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    titletext: {
        fontFamily: 'BMHANNA_11yrs_ttf',
        fontSize: 25,
        color: 'black',
        flex: 1
    },
    imageview: {
        width: 300,
        height: 300,
        marginTop: 10
    },
    methodview: {
        height: 350
    },
    methodtitleview: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center'
    },
    selectButton: {
        borderRadius: 10,
        backgroundColor: '#1472FF',
        flex:1,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        margin: 10
    },
    buttontext: {
        fontFamily: 'NanumSquareNeo-bRg',
        fontSize: 14,
        color: 'white'
    },
    modalView:{
        marginTop:260,
        width: '90%',
        height:'auto',
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center'
      },
    contextTitle:{
        fontFamily: 'NanumSquareNeo-cBd',
        fontSize: 14,
        marginTop: 25,
        marginBottom:10,
    },
    titleBox:{
        flexDirection:"row",
        alignItems: 'center',
        marginBottom: 20
    },
    titleInput:{
        borderWidth: 2,
        borderColor: 'gray',
        paddingHorizontal: 10,
        borderRadius: 10,
        width: 280
    },
    titleInputMemo:{
        borderWidth: 2,
        borderColor: 'gray',
        paddingHorizontal: 10,
        borderRadius: 10,
        width: 280
    },
    contentText: {
        fontFamily: 'NanumSquareNeo-cBd',
        fontSize: 14
    },
    symbolBox:{
        marginTop:20,
        marginLeft:20,
        flexDirection:"row"
    },
    contentBox:{
        margin:10,
        paddingLeft:20
    },
    titleText: {
        fontFamily: 'NanumSquareNeo-dEb',
        fontSize: 16,
        color: 'black',
        marginLeft: 10
    }
    

})