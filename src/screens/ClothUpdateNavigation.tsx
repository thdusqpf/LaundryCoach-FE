import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, ImageBackground, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { CollapsibleViewCheck, UploadModeModal} from '.';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { generateClient } from "aws-amplify/api";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { listMyClosets, getMyCloset, listWashingMethods, getWashingMethod } from "../graphql/queries";
import { createMyCloset, updateMyCloset , deleteMyCloset } from "../graphql/mutations";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';
import { useNavigation } from '@react-navigation/native';
import { getUrl } from 'aws-amplify/storage';

const userSelector = (context) => [context.user];
const client = generateClient();

const ClothUpdateNavigation = ({route}) => {
    const {item, handleUpdate, handleCancle, saveSymbols} = route.params;
  const navigation = useNavigation();
  const { user, signOut } = useAuthenticator(userSelector);
  const [isCheckModalVisible, setCheckModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(item.imagePath);
  const [updatedTitle, setUpdatedTitle] = useState(item.title);
  const [updatedNotes, setUpdatedNotes] = useState(item.notes);
  const [updatedSymbols, setUpdatedSymbols] = useState(item.symbols); 
  const [photoUri, setPhotoUri] = useState(null);
  const [ImgModalVisible, setImgModalVisible] = useState(false);

  console.log("item: ", item);
  const [wash, setWash] = useState([]);
    const [bleach, setBleach] = useState([]);
    const [dry, setDry] = useState([]);
    const [iron, setIron] = useState([]);
    const [dryclean, setDryclean] = useState([]);
    const [wiring, setWiring] = useState([]);

    
const handleSymbolsSave = (selectedSymbols) => {
  item.symbols = selectedSymbols;
  setUpdatedSymbols(selectedSymbols);
  console.log("입력받은 심볼: ", item.symbols);
  setCheckModalVisible(!isCheckModalVisible);
};

const handleItemUpdate = () => {
  item.imagePath = selectedImage;
  item.title = updatedTitle;
  item.Symbols = updatedSymbols;
  item.notes = updatedNotes;
  console.log("입력된 값", item);
  handleUpdate(item);
  navigation.navigate("Cloth", {item});
}

    useEffect(() => {
        query();
    }, []);
    
    useEffect(() => {
      async function fetchFiles() {
          console.log("fetching images....")
          const getUrlResult = await getUrl({
              key: "result_image_key.jpg",
          });
          console.log('signed URL: ', getUrlResult.url);
          console.log('URL expires at: ', getUrlResult.expiresAt);
          setSelectedImage(getUrlResult.url.toString());
          console.log("end...")
      }
      fetchFiles();
  }, []);

    async function query() {
        try {
            const allWashingMethods = await client.graphql({
                query: listWashingMethods
            });
            const symbolsResult = allWashingMethods.data.listWashingMethods.items;
            console.log("symbolsResult:", symbolsResult)
            setWash(symbolsResult.filter(item => item.category === "세탁"));
            setBleach(symbolsResult.filter(item => item.category === "표백"));
            setDry(symbolsResult.filter(item => item.category === "건조"));
            setIron(symbolsResult.filter(item => item.category === "다림질"));
            setDryclean(symbolsResult.filter(item => item.category === "드라이클리닝"));
            setWiring(symbolsResult.filter(item => item.category === "짜는 방법"));
        } catch (error) {
            console.error("Error querying WashingMethods:", error);
        }
    }

    // 선택 모달 오픈
    const modalOpen = () => {
        if (Platform.OS === "android") { // 안드로이드
        setImgModalVisible(true); // visible = true
        } else { // iOS
        
        }
    }

    // 카메라 촬영
    const onLaunchCamera = () => {
        launchCamera(imagePickerOption, onPickImage);
    };
    
    // 갤러리에서 사진 선택
    const onLaunchImageLibrary = () => {
        launchImageLibrary(imagePickerOption, onPickImage);
    };

    const takePicture = async () => {
        launchCamera(
          {
            mediaType: 'photo',
            quality: 0.5,
          },
          (response) => {
            if (!response.didCancel && !response.error) {
              setPhotoUri(response.uri);
              uploadToS3(response.uri);
            }
          }
        );
      };
    
      const pickImage = async () => {
        launchImageLibrary(
          {
            mediaType: 'photo',
            quality: 0.5,
          },
          (response) => {
            if (!response.didCancel && !response.error) {
              setPhotoUri(response.uri);
              uploadToS3(response.uri);
            }
          }
        );
      };
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.background}>
        <View style={styles.container}>
            {photoUri && (
                <Image source={{ uri: photoUri }} style={styles.previewImage} />
            )}
        </View>
            <View style={styles.header}>
                <Pressable onPress={modalOpen}>
                    <ImageBackground style={styles.headerImage} source={selectedImage || require('../../assets/images/gallery.png')}>                
                        <Text style={styles.headerImageText}>Select Image</Text>
                    </ImageBackground>              
                </Pressable>
                <UploadModeModal
                    visible={ImgModalVisible} 
                    onClose={() => setImgModalVisible(false)}
                    onLaunchCamera={takePicture}
                    onLaunchImageLibrary={pickImage} />
              {/* <Image source={updatedImagePath} style={styles.modalImage} /> */}
              <TextInput
                style={styles.nameInput}
                placeholder="Item Title"
                value={updatedTitle}
                onChangeText={(text) => setUpdatedTitle(text)}
              />
                <View style={{padding: 5, marginLeft: 50}}>
                    <Pressable style={styles.savebutton} onPress={handleItemUpdate}>
                        <Text style={styles.smalltext}>저장</Text>
                    </Pressable>
                    <Pressable  style={styles.deletebutton} onPress={()=>navigation.navigate("Cloth", { item, handleUpdate, saveSymbols})}>
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
                  item={updatedSymbols} 
                  handleSymbolsSave={handleSymbolsSave}
                ></CollapsibleViewCheck>
              </ScrollView>
                
              </Modal>
              <View style={styles.texts}>
                <Text style={styles.contextTitle}>세탁방법</Text>
                <View style={styles.symbolBox}>
                {item.symbols.map((symbol, index) => {
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
                        <View key={index} style={styles.symbol}>
                        <Image source={{uri:match.symbol}} style={{ width: 25, height: 25 }}/>
                        </View>
                    );
                    } else {
                    return (
                        <View key={index}>
                        <Text>{symbol}</Text>
                        </View>
                    );
                    }
                })}
                </View>
                {item.symbols.map((symbol, index) => {
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
                } else {
                  return (
                    <View key={index}>
                      <Text>No matching</Text>
                    </View>
                  );
                }
              })}

              <Pressable
                onPress={()=>setCheckModalVisible(!isCheckModalVisible)}
              >
                <Icon name={'plus-circle-outline'} size={20} color="#333" />
              </Pressable>
              </View>

        
        <View style={styles.noteText}>
          <Text style={styles.contextTitle}>메모</Text>
          <TextInput
              style={styles.input}
              multiline
              numberOfLines={4}
              placeholder={updatedNotes}
              value={updatedNotes}
              onChangeText={(text) => setUpdatedNotes(text)}
            />
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

export default ClothUpdateNavigation;