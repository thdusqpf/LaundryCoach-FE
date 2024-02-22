import React, {useState, useEffect} from "react";
import {StatusBar, StyleSheet, Text, View, Pressable, Image, Modal, FlatList} from "react-native";
import { ClothWrite, ClothWriteNavigation} from '.';
import { generateClient } from "aws-amplify/api";
import { listMyClosets, getMyCloset, listWashingMethods, getWashingMethod } from "../graphql/queries";
import { createMyCloset, updateMyCloset , deleteMyCloset } from "../graphql/mutations";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';
const userSelector = (context) => [context.user];
const client = generateClient();

export default function MyCloset({navigation}){ 
    const { user, signOut } = useAuthenticator(userSelector);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [modifyModalVisible, setModifyModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [results, setResults] = useState([]);
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
            const allWashingMethods = await client.graphql({
                query: listWashingMethods
            });
            const symbolsResult = allWashingMethods.data.listWashingMethods.items;

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
    async function fetchMyCloset() {
        try {
            const allMyClosets = await client.graphql({
                query: listMyClosets,
                variables: { user_id: user.username } // 변수로 사용자 ID 전달
            });
            const result = allMyClosets.data.listMyClosets.items;
            const filteredItems = result.filter(item => item.user_id === user.username);

            setResults(filteredItems);
        } catch (error) {
            console.error("Error querying MyClosets:", error);
        }
    }
    const [newItem, setNewItem] = useState({ index: results.length, imagePath: null, title: "", symbols:[], note: "" });

    

    const [newsymbols, setNewSymbols] = useState([]);
    useEffect(() => {
        const symbolsArray = results.map(item => ({
            id: item.id,
            symbols: item.symbols
            }));
            setNewSymbols(symbolsArray);
            fetchMyCloset();
    }, [results]);

    

    const hideModal = () => {
        setCreateModalVisible(!createModalVisible);
        // Reset newItem state after hiding modal
        setNewItem({ id:"", imagePath: "", title: "", symbols: [], notes:"" });
    };

    const saveItem = async () => {
        // Check if required fields are filled
        //newItem.imagePath && 
        console.log("newItem", newItem);
        if (newItem.title) {
        setResults([...results, newItem]);
        const newMyCloset = await client.graphql({
            query: createMyCloset,
            variables: {
                input: {
                "user_id": user.username,
                "title": newItem.title,
                "symbols": newItem.symbols,
                "note": newItem.note,
                "imagePath": newItem.imagePath
            }
            }
        });

        } else {
        console.log("Please fill in all fields.");
        }
    };

    

    const saveSymbols = (newSymbols) => {
        if(newSymbols){
            selectItem.symbols = newSymbols;
            console.log(selectItem.symbols);
        }
    }

    const openModal = (item) => {
        setSelectedItem(item);
        setModifyModalVisible(true);
    };
    
    const closeModal = () => {
        setSelectedItem(null);
        setModifyModalVisible(false);
    };

    const updateItems = async (getItem) => {
        console.log("getItem", getItem);
    
        // Check if getItem is defined and has the expected properties
        if (getItem && typeof getItem === 'object') {
            const { id, title, imagePath, notes, symbols } = getItem;   
            const temp = results.find(item => item.id === id);
            // Check if the index is within the valid range of the items array
            if (temp) {
                // Update the properties only if they are defined in getItem
                if (title !== undefined) {
                    temp.title = title;
                }
                if (imagePath !== undefined) {
                    temp.imagePath = imagePath;
                }
                if (notes !== undefined) {
                    temp.notes = notes;
                }
                if (symbols !== undefined) {
                    temp.symbols = symbols;
                }
                console.log("temp", temp);
                try {
                    const updatedMyCloset = await client.graphql({
                        query: updateMyCloset,
                        variables: {
                            input: {
                                id: temp.id,
                                user_id: user.username,
                                title: temp.title,
                                symbols: temp.symbols,
                                note: temp.notes,
                                imagePath: temp.imagePath
                            }
                        }
                    });
                    console.log("Updated search result:", updatedMyCloset);
                } catch (error) {
                    console.error("Error updating search result:", error);
                }
            } else {
                console.error("Invalid index:", index);
            }
        } else {
            console.error("Invalid getItem object:", getItem);
        }
    };

    const onDelete = (deleteItem) => {
        // Filtering out the item to be deleted
        const updatedItems = items.filter(item => item !== deleteItem);
        setResults(updatedItems);
        setSelectedItem(null);
        navigation.navigate("MyCloset");
        // Optionally, you can add additional logic like deleting from storage or making an API call
    };


    async function onClothDelete(deleteItem) {
        const deletedItem = results.filter(result => result.id !== deleteItem.id);
        setResults(deletedItem, () => {
            console.log("delete 결과", results);
        });
        try {
            const deletedMyCloset = await client.graphql({
                query: deleteMyCloset,
                variables: {
                    input: {
                    id: deleteItem.id
                    }
                }
                });
                console.log("Deleted search result:", deletedMyCloset);
                setSelectedItem(null);
                
            } catch (error) {
                console.error("Error deleting search result:", error);
            }
    }


    const selectItem = (item) => {
        setSelectedItem(item);
        console.log("selectItem", item);
        navigation.navigate("Cloth", { item, newItem, updateItems, onClothDelete, saveSymbols });
    }

    

    return (
    <View style={styles.Container}>
        <StatusBar style="auto"/>
        <View style={styles.header}>
            <Text style={styles.title}>나의 옷장</Text>
            <Pressable
                style={styles.createBtn}
                onPress={() => navigation.navigate("ClothWriteNavigation", {newItem, hideModal, saveItem, setCreateModalVisible, saveSymbols})}
            >
                <Text style={styles.btnText}>추가</Text>
            </Pressable>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={createModalVisible}
                onRequestClose={() => {
                    setCreateModalVisible(!createModalVisible);
                }}>
                <View >
                <View>
                    <ClothWrite item={newItem} hideModal={hideModal} onCreate={saveItem} saveSymbols={saveSymbols} setModalVisible={setCreateModalVisible} isModalVisible={createModalVisible}></ClothWrite>
                </View>
                </View>
            </Modal>

        {results.map((result, index) => (
            <View style={styles.box} key={index}>
                <Pressable 
                    style={styles.cloth}
                    onPress={() => selectItem(result)}
                >
                    <Image source={result.imagePath || require('../../assets/images/gallery.png')} />
                    <View>
                        <Text style={styles.name}>{result.title}</Text>
                        <View style={styles.symbols}>
                            {result.symbols && result.symbols.map((symbol, index) => {
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
                                    <Image key={match.id} source={{uri:match.symbol}} style={{ width: 25, height: 25 }}/>
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
                        <FlatList
                            data={result.symbols}
                            keyExtractor={(symbol, index) => index.toString()}
                            horizontal
                            renderItem={({ item: contentImage }) => (
                            <Image source={contentImage} style={styles.contentImage} />
                            )}
                        />
                    </View>
                </Pressable>
            </View>
        ))}
        {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modifyModalVisible}
                onRequestClose={() => {
                closeModal();
                }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable
                    onPress={() => openModal()}>
                    <Image source={require('../../../assets/back.png')}/>
                    </Pressable>
                    <Cloth item={selectedItem} saveSymbols={saveSymbols} onDelete={onDelete} onCreate={saveItem}/>
                </View>
            </View>
        </Modal> */}
    
    </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#FFF",   
    },
    header:{
        flexDirection:"row",
        margin: 26,
        justifyContent: 'space-between', // 요소들을 가로로 정렬
    },
    title:{
        fontSize: 20,
        fontFamily:'BMHANNA_11yrs_ttf',
        color: "#000"
    },
    name:{
        fontSize: 20,
        fontFamily:'BMHANNA_11yrs_ttf',
        color: "#000",
        margin:10,
    },
    symbols:{
        marginLeft:10
    },
    createBtn:{
        backgroundColor: "#1472FF",
        width: 60,
        height: 25,
        borderRadius:10,       
        alignSelf:"flex-end",
        textAlign:"center"
    },
    btnText:{
        color: "#fff",
        fontSize: 20,
        fontFamily:'BMHANNA_11yrs_ttf',
        textAlign:"center",
    },
    box:{
        width:320,
        height:90,
        alignSelf:"center",
        borderWidth:2,
        borderColor:'#DBDBDB',
        
    },
    cloth: {
        elevation: 10,
        margin: 10,
        flexDirection : "row",
        
        
    },
    contentImage:{
        marginLeft:10
    },
    symbols:{
        flexDirection:"row",
    },
    symbol:{
        marginRight: 10,
        
    }, 
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#0057FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})
