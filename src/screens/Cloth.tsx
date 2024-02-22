import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal,Pressable, Image} from 'react-native';
import "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Wash, Bleach, Dry, Iron, Dryclean, ClothUpdate, ClothUpdateNavigation} from '.';
import { useFocusEffect } from '@react-navigation/native';
import { generateClient } from "aws-amplify/api";
import { listMyClosets, getMyCloset, listWashingMethods, getWashingMethod } from "../graphql/queries";
import { createMyCloset, updateMyCloset , deleteMyCloset } from "../graphql/mutations";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';


const userSelector = (context) => [context.user];
const client = generateClient();

const Cloth = ({route, navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      console.log('Navigation state:', navigation.state);
    }, [navigation.state])
  );
  const { item, updateItems, onClothDelete, saveSymbols } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const [wash, setWash] = useState([]);
    const [bleach, setBleach] = useState([]);
    const [dry, setDry] = useState([]);
    const [iron, setIron] = useState([]);
    const [dryclean, setDryclean] = useState([]);
    const [wiring, setWiring] = useState([]);
    const { user, signOut } = useAuthenticator(userSelector);

    useEffect(() => {
        query();
    }, []);
    

    async function query() {
        try {
            const allWashingMethods = await client.graphql({
                query: listWashingMethods
            });
            const symbolsResult = allWashingMethods.data.listWashingMethods.items;
            console.log("symbolResult:", symbolsResult);

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

  const handleUpdate = (newItem) => {  
    console.log("newItem", newItem);
    updateItems(newItem);
    setModalVisible(false);
  };

  const handleCancle = () =>{
    setModalVisible(false);
  }

  const handleDelete = (item) => {
    onClothDelete(item);
    navigation.navigate('MyCloset');
  }

  return (
    <View style={styles.background}>
      <View style={styles.header}>
          <Image source={{uri:item.imagePath} || require('../../assets/images/gallery.png')} style={{width:50, height:50}}/>
          <View style={styles.itemDetails}>
            <Text style={styles.headerText}>{item.title}</Text>
            <Pressable style={styles.icons} onPress={() => navigation.navigate("ClothUpdateNavigation", {item, handleUpdate, handleCancle, saveSymbols})}>
              <Icon name={'pencil-outline'} size={30} color="#333" />
          </Pressable>
            <Pressable style={styles.icons} onPress={() => handleDelete(item)}>
              <Icon name={'trash-can-outline'} size={30} color="#333" />
            </Pressable>
          </View>
          
      </View>

      <View style={styles.contents}>
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
                  <Image source={{uri:match.symbol}} style={{ width: 25, height: 25 }} />
                </View>
              );
            } else {
              return (
                <View key={index}>
                  <Text>{symbol}</Text>
                  <Text>No matching image</Text>
                </View>
              );
            }
          })}
        </View>
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
              <View key={index}>
                <Text>No matching</Text>
              </View>
            );
          }
        })}
        </View>
        
        <View style={styles.noteText}>
          <Text style={styles.contextTitle}>메모</Text>
        <Text>
          {item.notes}
        </Text>
        </View>

        {/* 모달창 */}
        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <ClothUpdate 
          item={item} 
          handleUpdate={handleUpdate} 
          setModalVisible={setModalVisible}
          handleCancle={handleCancle}
          saveSymbols={saveSymbols}
        ></ClothUpdate>
      </Modal> */}

      </View>      
    </View>
  );
};


const styles = StyleSheet.create({
  background:{
    backgroundColor:"#fff",
    height:"100%"
  },
  header:{
    marginTop:20,
    marginLeft: 20,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText:{
    marginRight:150,
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 15,
  },
  itemDetails:{
    flexDirection:"row",
    alignItems: 'center',
    marginRight:10
  },
  icons:{
    marginLeft:10
  },
  contents:{
    width:350,
    height:"auto",
    alignSelf: "center",
    marginTop:20,
    padding: 20,
    borderRadius:10,
    borderWidth:2,
    borderColor:'#DBDBDB',
  },
  symbols:{
    flexDirection:"row",
  },
  symbol:{
    marginRight: 10,
    
  }, 
  texts:{
    marginTop:10
  },
  contextTitle:{
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 15,
    marginTop: 15,
    marginBottom:20,
    
  },
  contentText:{
    marginLeft:10,
    
  },
  noteText:{
    marginTop:15
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // 투명한 배경
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
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
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
})

export default Cloth;