import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, Pressable, ImageBackground, Modal, ScrollView } from 'react-native';
import { CollapsibleViewCheck, UploadModeModal} from '.';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//npm i react-native-async-storage
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Storage } from 'aws-amplify';

import { generateClient } from "aws-amplify/api";
import { listWashingMethods, getWashingMethod } from "../graphql/queries";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';

const userSelector = (context) => [context.user];
const client = generateClient();


const ClothWrite = ({item, hideModal, onCreate, handleUpdate, handleCancle, onItemUpdate, saveSymbols}) => {
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
    // Load saved data from AsyncStorage when component mounts
    loadData();
  }, []);

  const saveData = async () => {
      try {
        console.log('Selected Image in saveData:', selectedImage.uri); 
        // Save image, name, and content to AsyncStorage
        await AsyncStorage.setItem('selectedImage', selectedImage.uri);
        await AsyncStorage.setItem('title', title);
        await AsyncStorage.setItem('symbols', newSymbols.join(','));
        await AsyncStorage.setItem('notes', note);
        console.log('Data saved successfully!');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

  const handleLaunchCamera = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // 선택한 이미지의 경로를 상태 변수에 저장
        setSelectedImage({ uri: response.uri });
        item.imagePath = response.uri;
        console.log('Selected Image:', response.uri); // 확인용 로그
        saveData(); // 수정된 부분: loadData 대신 saveData 호출
      }
    });
  };


  const loadData = async () => {
    try {
      // Load image, name, and content from AsyncStorage
      console.log('Selected Image in loadData:', selectedImage.uri); // 확인용 로그
    
      const imageUri = await AsyncStorage.getItem('selectedImage');
      const savedtitle = await AsyncStorage.getItem('title');
      const savedSymbols = await AsyncStorage.getItem('Symbols');
      const savedNotes = await AsyncStorage.getItem('Notes');

      if (imageUri) {
        console.log(imageUri);
        setSelectedImage({ uri: imageUri });
      }
      if (savedtitle) {
        setNewTitle(savedtitle);
      }
      if (savedSymbols) {
        setNewSymbols(savedSymbols);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSave = (selectedItems) => {
    // 모달을 닫기 전에 선택된 항목을 저장하고 부모 컴포넌트에 전달
    onSave(selectedItems);
    // 모달을 닫음
    // setIsCollapsed(true);
    setCheckModalVisible(!isCheckModalVisible);
};

const handleSymbolsSave = (selectedSymbols) => {
  // 모달을 닫기 전에 선택된 항목을 저장하고 부모 컴포넌트에 전달
  saveSymbols(selectedSymbols);
  item.symbols = selectedSymbols;
  setNewSymbols(selectedSymbols);
  console.log("입력받은 심볼: ", item.symbols);
  // 모달을 닫음
  // setIsCollapsed(true);
  setCheckModalVisible(!isCheckModalVisible);

};

  const onSave = (selectedItems) => {
    handleUpdate(selectedItems);
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

// 카메라 촬영
const onLaunchCamera = () => {
  launchCamera(imagePickerOption, onPickImage);
};

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
  item.imagePath = selectedImage;
  item.title = newTitle;
  item.symbols = newSymbols;
  item.notes = newNote;
  onCreate(item);
}

  const [photoUri, setPhotoUri] = useState(null);

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

  const uploadToS3 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = `clothImage/${Date.now()}.jpg`; // 폴더 이름을 지정합니다.
      await Storage.put(fileName, blob, { contentType: 'image/jpeg' });
      console.log('Uploaded to S3:', fileName);
      item.imagePath = fileName;
    } catch (error) {
      console.error('Error uploading to S3:', error);
    }
  };


      return (
        <ScrollView>
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

            <TextInput
              style={styles.nameInput}
              placeholder="Item title"
              value={newTitle}
              onChangeText={(text) => setNewTitle(text)}
            />
            <View>
              <Pressable style={styles.savebutton}>
                <Text style={styles.small}>저장</Text>
              </Pressable>
              <Pressable  style={styles.deletebutton}>
                <Text>삭제</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.symbols}>
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
                    <Image source={{uri:match.symbol}} style={{ width: 30, height: 29 }}/>
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
                  handleUpdate={handleUpdate} 
                  setCheckModalVisible={setCheckModalVisible}
                  isCheckModalVisible={isCheckModalVisible}
                  handleSave={handleSave}
                  handleSymbolsSave={handleSymbolsSave}
                ></CollapsibleViewCheck>
              </ScrollView>
              
            </Modal>
            <View style={styles.texts}>
              <Text style={styles.contextTitle}>세탁방법</Text>
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
          <Pressable onPress={itemCreate}>
            <Text>Create</Text>
          </Pressable>
          <Pressable onPress={hideModal}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    marginTop:150,
    width: '80%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  header:{
    borderWidth: 2,
    marginTop:20,
    flexDirection:"row",
    alignItems: 'center',
    textAlign:"center",
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
  },
  input: {
    borderWidth: 2,
    width: 270,
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
    width: 270,
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
    borderWidth: 2,
    width: 50, 
    height: 30,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#14 72FF'
  },
  deletebutton: {
    borderWidth: 2,
    width: 50, 
    height: 30,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'red'
  }
});

export default ClothWrite;