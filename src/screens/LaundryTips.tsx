import React, {useState, useEffect} from "react";
import { SafeAreaView, View, Text,  TouchableOpacity, ImageBackground, StyleSheet, FlatList } from "react-native";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import { LoadingScreen } from ".";
import { listLaundryTips } from "../graphql/queries";
import { generateClient } from 'aws-amplify/api';
import { useNavigation } from "@react-navigation/native";

const client = generateClient();

export default function LaundryTips() {
    const navigation = useNavigation();
    const [tips, settips] = useState([]);
    const [searchText, onChangeText] = React.useState('');
    const [numColumns, setNumColumns] = useState(2);

    useEffect(() => {
        fetchTips();
      }, []);
      
    async function fetchTips() {
        try {
          const tipData = await client.graphql({
            query: listLaundryTips
          });
          const tips = tipData.data.listLaundryTips.items;
          settips(tips)
        } catch (err) {
          console.log('error fetching todos');
        }
    }
    
    type ItemProps = {title: string, background_img: string, id : string};
    const Item = ({title, background_img, id}:ItemProps) => (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TouchableTipTab', {id: id})}>
        <ImageBackground source={{uri: background_img}} style={{flex:1}} imageStyle={{borderRadius: 12, opacity: 0.5}}>
        <Text style={styles.text}>{title}</Text>
        </ImageBackground> 
    </TouchableOpacity>
);  
        return (
        <SafeAreaView style={{backgroundColor:'white', flex:1}}>
            
            <View style={styles.mainview}>
                <Icon name='cloud-question' size={30} color={'black'} style={{marginRight: 5}} />
                <Text style={styles.maintext} >세탁 꿀팁</Text>
            </View>
            {!tips || tips.length === 0? (<LoadingScreen />) : (
            <>
            <FlatList
                data={tips}
                renderItem={({item, index}) => <Item title={item.title} background_img= {item.background_img} id={item.id} />}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                />
            </>)
            }
        </SafeAreaView>
        );
    }
    
    const styles = StyleSheet.create({
        button: {
            width: 159,
            height: 180,
            borderRadius: 12,
            borderColor:'black',
            marginLeft:22,
            marginTop: 10
            
        },
        mainview: {
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
            justifyContent:'center',
            marginTop: 15
        },
        maintext: {
            fontFamily: 'BMHANNA_11yrs_ttf',
            fontSize: 22,
            textAlign: 'center',
            color:'black'
        },
        text: {
            fontFamily: 'NanumSquareNeo-cBd',
            fontSize: 18,
            color: '#4A4A4A',
            textAlign: 'center',
            marginTop: 80
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
            marginLeft:20
        },
        border: {borderRadius: 20},
        iconview: {
            flex:1,
            backgroundColor:"#1472FF", 
            borderTopRightRadius:20, 
            borderBottomRightRadius:20,
            height:50,
            width: 70,
            alignItems: 'center'
        }
    })