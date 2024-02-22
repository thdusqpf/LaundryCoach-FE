import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, ImageBackground, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { CollapsibleViewCheck, LoadingScreen} from '.';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { generateClient } from "aws-amplify/api";
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

const ClothUpdate = ({item, handleUpdate, handleCancle, saveSymbols}) => {
  const navigation = useNavigation();
  const { user, signOut } = useAuthenticator(userSelector);
  const [isCheckModalVisible, setCheckModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(item.imagePath);
  const [updatedTitle, setUpdatedTitle] = useState(item.title);
  const [updatedNotes, setUpdatedNotes] = useState(item.notes);
  const [updatedSymbols, setUpdatedSymbols] = useState(item.symbols); 

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
  return (
    <ScrollView>
          <View style={styles.background}>
            <View style={styles.header}>
              <Pressable onPress={() => navigation.navigate('CameraViewNonavigation')}>
                {selectedImage && <Image 
                        style={styles.headerImage}
                        source={{uri:selectedImage}}
                        resizeMode={'stretch'} />}
                  <Text style={styles.headerImageText}>Select Image</Text>
              </Pressable>
              {/* <Image source={updatedImagePath} style={styles.modalImage} /> */}
              <TextInput
                style={styles.nameInput}
                placeholder="Item Title"
                value={updatedTitle}
                onChangeText={(text) => setUpdatedTitle(text)}
              />
            </View>
            <View style={styles.symbols}>
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
                    <>
                      <LoadingScreen />
                    </>
                  );
                }
              })}
              <Pressable
                onPress={()=>setCheckModalVisible(!isCheckModalVisible)}
              >
                <Icon name={'plus-circle-outline'} size={20} color="#333" />
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
                  handleUpdate={handleUpdate} 
                  setCheckModalVisible={setCheckModalVisible}
                  isCheckModalVisible={isCheckModalVisible}
                  handleSymbolsSave={handleSymbolsSave}
                ></CollapsibleViewCheck>
              </ScrollView>
                
              </Modal>
              <View style={styles.texts}>
                <Text style={styles.contextTitle}>세탁방법</Text>
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
                    <>
                      <LoadingScreen />
                    </>
                  );
                }
              })}
        
        
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
            <Pressable onPress={handleItemUpdate}>
              <Text>Update</Text>
            </Pressable>
            <Pressable onPress={handleCancle}>
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
    marginTop:20,
    marginLeft: 20,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign:"center",
  },
  headerImage:{
    width:60,
    height:60,
    opacity: 0.5
  },
  headerImageText:{
    fontFamily:'NanumSquareNeo-cBd',
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
    margin: 10,
    width: '80%',
  },
  symbols:{
    flexDirection:"row",
  },
  symbol:{
    marginRight: 10,
    
  },
  contextTitle:{
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 15,
    marginTop: 25,
    marginBottom:10, 
  },
  nameInput: {
    marginLeft:60,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 3,
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
});

export default ClothUpdate;