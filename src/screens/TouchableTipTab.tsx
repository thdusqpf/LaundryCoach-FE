import React, {useState, useEffect} from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, Image } from "react-native";
import { LoadingScreen, TopBar } from ".";
import { getLaundryTips } from "../graphql/queries";
import { generateClient } from 'aws-amplify/api';
import { useRoute } from "@react-navigation/native";

const {width, height} = Dimensions.get("window")
console.log("Width:", width, "height:", height)

const client = generateClient();

export default function TouchableTipTab() {
  const {params:id} = useRoute();
  const [tips, settips] = useState('');
  
    useEffect(() => {
        fetchTips();
      }, []);

    async function fetchTips() {
        try {
          const oneLaundryTips = await client.graphql({
            query: getLaundryTips,
            variables: { id:id.id}
          });
          const tips = oneLaundryTips.data.getLaundryTips
          settips(tips)
        } catch (err) {
          console.log('error fetching launndrytips');
        }
      }
    
    return (
        <SafeAreaView style={styles.container}>
              <TopBar />
              <ScrollView style={[styles.mainbox, styles.border]}>
                
                {!tips || tips.length === 0 ? (
                  <LoadingScreen /> 
                  ) : (
                  <>
                  <View style={styles.resultbutton} >
                    <Text style={styles.buttontext}>{tips.title}</Text>
                  </View>
                  <Image source={{uri: tips.background_img}} style={{width: 300, height: 300}} />
                  {tips.desc.split('\\n').map((line, index) => (
            <Text key={index} style={styles.text}>{line}</Text>
          ))}
        </>
      )}
              
            </ScrollView>
    </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    mainbox: { 
        padding: 20,
        width: 344, 
        height: 650, 
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
    text: {
        fontFamily: 'NanumSquareNeo-bRg',
        fontSize: 15,
        color: 'black'
    },
    titletext: {
      fontFamily: 'NanumSquareNeo-dEb',
      fontSize: 16

    },
    resultbutton: {
      borderRadius: 10,
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: '#1472FF',
      width: 200,
      height: 40,
      justifyContent:'center',
      alignItems: 'center',
      marginRight:140,
      marginBottom: 20
  },
  buttontext: {
      fontFamily: 'NanumSquareNeo-dEb',
      fontSize: 12,
      color: '#1472FF'
  }
})