import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, Pressable, Dimensions, ImageBackground, Modal, ScrollView, Platform } from 'react-native';
import { CollapsibleViewCheck, TopBarNoText, UploadModeModal} from '.';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//npm i react-native-async-storage
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getUrl } from 'aws-amplify/storage';

import { generateClient } from "aws-amplify/api";
import { listWashingMethods, getWashingMethod } from "../graphql/queries";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';

const userSelector = (context) => [context.user];
const client = generateClient();
const {width, height} = Dimensions.get("window")
console.log("w:", width, "h:", height)

const ClothWriteNavigation = ({route, navigation}) => {
  const {newItem,  saveItem, handleUpdate, handleCancle, saveSymbols, key} = route.params;
    const [isCheckModalVisible, setCheckModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newSymbols, setNewSymbols] = useState([]);
  const [newNote, setNewNote] = useState('');
  // 안드로이드를 위한 모달 visible 상태값
  const [ImgModalVisible, setImgModalVisible] = useState(false);
  const [wash, setWash] = useState([]);
  const [bleach, setBleach] = useState([]);
  const [dry, setDry] = useState([]);
  const [iron, setIron] = useState([]);
  const [dryclean, setDryclean] = useState([]);
  const [wiring, setWiring] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const testurl = 'https://laundrycoachbucket75411-staging.s3.ap-northeast-2.amazonaws.com/public/1f07dd50-227c-4156-8497-a3fc73c96ab5.png'
  console.log("this page is ClothWriteNavigation! key:", key)
  useEffect(() => {
      query();
  }, []);

  if (key !== undefined) {
    useEffect(() => {
      fetchFiles();
    }, []);
    console.log("imageurl1:", imageUrl)
  }
  
 
    async function fetchFiles() {
        console.log("fetching images....")
        const getUrlResult = await getUrl({
            key: key,
        });
        console.log('signed URL: ', getUrlResult.url);
        console.log('URL expires at: ', getUrlResult.expiresAt);
        setImageUrl(getUrlResult.url.toString());
        console.log("end...")
    }


console.log("imageurl2:", imageUrl);

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
const handleSymbolsSave = (selectedSymbols) => {
  // 모달을 닫기 전에 선택된 항목을 저장하고 부모 컴포넌트에 전달
  saveSymbols(selectedSymbols);
  newItem.symbols = selectedSymbols;
  setNewSymbols(selectedSymbols);
  console.log("입력받은 심볼: ", newItem.symbols);
  // 모달을 닫음
  // setIsCollapsed(true);
  setCheckModalVisible(!isCheckModalVisible);

};

  const imagePickerOption = {
    mediaType: "photo",
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === "android",
  };  
// 선택 사진 또는 촬영된 사진 정보
const onPickImage = (res) => { 
  if (res.didCancel || !res) {
    return;
  }
}


// 갤러리에서 사진 선택
const onLaunchImageLibrary = () => {
  launchImageLibrary(imagePickerOption, onPickImage);
};


// 선택 모달 오픈
const modalOpen = () => {
  if (Platform.OS === "android") { // 안드로이드
    setImgModalVisible(true); // visible = true
  } else { // iOS
    
  }
}
const itemCreate = () =>{
    newItem.imagePath = selectedImage;
    newItem.title = newTitle;
    newItem.symbols = newSymbols;
    newItem.notes = newNote;
  saveItem(newItem);
  navigation.navigate("MyCloset");
}

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      (response) => {
        if (!response.didCancel && !response.error) {
          setImageUrl(response.uri)
        }
      }
    );
  };




      return (
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          <TopBarNoText />
        <View style={styles.background}>
      
          <View style={styles.header}>
            
            <UploadModeModal
              visible={ImgModalVisible} 
              onClose={() => setImgModalVisible(false)}
              onLaunchImageLibrary={pickImage} 
              newItem={newItem}
              saveItem={saveItem}
              handleUpdate={handleUpdate}
              handleCancle={handleCancle}
              saveSymbols={saveSymbols}
              />

            <TextInput
              style={styles.nameInput}
              placeholder="Item title"
              value={newTitle}
              onChangeText={(text) => setNewTitle(text)}
            />
            <View style={{padding: 5, marginLeft: 50}}>
              <Pressable style={styles.savebutton} onPress={itemCreate}>
                <Text style={styles.smalltext}>저장</Text>
              </Pressable>
              <Pressable  style={styles.deletebutton} onPress={() => navigation.navigate("MyCloset")}>
                <Text style={styles.smalltext}>취소</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.symbols}>
        

            <Pressable style={styles.selectbutton}
              onPress={
                ()=>setCheckModalVisible(!isCheckModalVisible)
              }
            >
              <Text style={styles.selectbuttontext}>세탁기호 선택</Text>
            </Pressable>
            </View>
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
            <View style={styles.texts}>
              <Text style={styles.contextTitle}>세탁방법</Text>
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
                  <View style={styles.symbol}>
                    <Image key={match.id} source={{uri:match.symbol}} style={{ width: 25, height: 25 }}/>
                  </View>
                );
               }
               else {
                return (
                  <View key={index}>
                    <Text>{symbol}</Text>
                  </View>
                );
              }
            })}
              </View>
              

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
                    <Text style={styles.symbolText}>• {symbol}</Text>
                  </View>
                );
              } else {
                return (
                  <View key={index}>
                    <Text>No matching</Text>
                  </View>
                );
              }
            })}
      
      
      <View style={styles.noteText}>
        <Text style={styles.contextTitle}>메모</Text>
        <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder={newNote}
            value={newNote}
            onChangeText={(text) => setNewNote(text)}
          />
      </View>
      </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    margin: 10,
    width: 364,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center'
  },
  modalView:{
    marginTop:260,
    width: '90%',
    height:"auto",
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
  },
  symbolBtn:{
    width:330,
    height:50,
    backgroundColor:"#1472FF",
    alignSelf:"center",
    borderRadius: 10,
    marginTop:30,
  },
  symbolBtnText:{
    color:"white",
    textAlign:"center",
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 18,
    padding:15,
  },
  symbolBox:{
    flexDirection:"row",
  },
  header:{
    marginTop:20,
    flexDirection:"row",
    alignItems: 'center',
    textAlign:"center",
    justifyContent:'space-around',
    width: 364,

  },
  headerImage:{
    width:60,
    height:60,
    opacity: 0.5
  },
  headerImageText:{
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  pickImageButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  inputContainer: {
    borderWidth: 2,
    margin: 10,
    width: '80%',
  },
  symbols:{
    flexDirection:"row",
  },
  symbol:{
    marginRight: 10,
    
  },
  texts:{
    width:364
  },
  contextTitle:{
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 15,
    marginTop: 25,
    marginBottom:10,
    color:'black'
  },
  nameInput: {
    marginLeft:30,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
    width: 100,
    fontFamily: 'NanumSquareNeo-dEb',
    fontSize: 12
  },
  input: {
    borderWidth: 2,
    width: 360,
    borderColor: 'gray',
    padding: 3,
    borderRadius: 10
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  selectbutton: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#1472FF',
    width: 360,
    height: 50,
    justifyContent:'center',
    alignItems: 'center',
  },
  selectbuttontext: {
    fontFamily: 'NanumSquareNeo-dEb',
    fontSize: 14,
    color: '#1472FF'
  },
  savebutton: {
    width: 70, 
    height: 40,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#1472FF',
    margin: 5
  },
  deletebutton: {
    width: 70, 
    height: 40,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#FF6969',
    margin: 5
  },
  smalltext: {
    fontFamily: 'BMHANNA_11yrs_ttf',
    color: 'white',
  },
  symbolText:{
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 14,
    color: 'black'
  },
  noteText: {
   
  }
});

export default ClothWriteNavigation;