import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements'; // CheckBox 추가
import PropTypes from 'prop-types';
// npm install react-native-elements
import { generateClient } from "aws-amplify/api";
import { listWashingMethods, getWashingMethod } from "../graphql/queries";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';
const userSelector = (context) => [context.user];
const client = generateClient();

const CollapsibleViewCheck = ({ item, handle, onSave, saveSymbols, handleSymbolsSave}) => {
    const [isWashCollapsed, setIsWashCollapsed] = useState(false);
    const [isBleachCollapsed, setIsBleachCollapsed] = useState(false);
    const [isDryCollapsed, setIsDryCollapsed] = useState(false);
    const [isIronCollapsed, setIsIronCollapsed] = useState(false);
    const [isDrycleanCollapsed, setIsDrycleanCollapsed] = useState(false);
    const [isWiringCollapsed, setIsWiringCollapsed] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const { user, signOut } = useAuthenticator(userSelector);

    const [wash, setWash] = useState([]);
    const [bleach, setBleach] = useState([]);
    const [dry, setDry] = useState([]);
    const [iron, setIron] = useState([]);
    const [dryclean, setDryclean] = useState([]);
    const [wiring, setWiring] = useState([]);
    const [results, setresults] = useState([]);
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

    const categories = [
        { title: "세탁", color: "#92D3F5", classImage: require("../../assets/images/Wash/Wash.png"), content: wash },
        { title: "표백", color: "#F5B692", classImage: require("../../assets/images/Bleach/Bleach.png"), content: bleach },
        { title: "건조", color: "#F5DF92", classImage: require("../../assets/images/Dry/Dry.png"), content: dry },
        { title: "다림", color: "#88DBA4", classImage: require("../../assets/images/Iron/Iron.png"), content: iron },
        { title: "드라이클리닝", color: "#C3A0E6", classImage: require("../../assets/images/Dryclean/Dryclean.png"), content: dryclean },
        { title: "짜는 방법", color: "#e6a0b2", classImage: require("../../assets/images/Wiring/Wiring.png"), content: wiring },
    ];

    useEffect(() => {
        // content의 title과 item의 symbol이 일치할 때만 실행
        if (item) {
            console.log("item",item);
            const matchingSymbols = item.filter(symbol => categories.some(category => category.content.some(contentItem => contentItem.desc === symbol)));
            console.log("matchingSymbols",matchingSymbols);
            if (matchingSymbols && matchingSymbols.length > 0) {
                // matchingSymbols이 하나 이상인 경우에만 setSelectedItmatchingSymbolsems 실행
                setSelectedItems(matchingSymbols);
            }
        }
        
    }, [item, categories.content]);

    const toggleCollapse = (title) => {
        if(title=="세탁"){
            setIsWashCollapsed(!isWashCollapsed);
        } else if(title=="표백"){
            setIsBleachCollapsed(!isBleachCollapsed);
        } else if(title=="건조"){
            setIsDryCollapsed(!isDryCollapsed);
        } else if(title=="다림"){
            setIsIronCollapsed(!isIronCollapsed);
        } else if(title=="드라이클리닝"){
            setIsIronCollapsed(!isDrycleanCollapsed);
        } else {
            setIsDrycleanCollapsed(!isWiringCollapsed);
        }
    };

    const handleCheckBox = (title) => {
        const newSelectedItems = [...selectedItems];
        if (newSelectedItems.includes(title)) {
            newSelectedItems.splice(newSelectedItems.indexOf(title), 1);
            console.log(newSelectedItems);
        } else {
            newSelectedItems.push(title);
            console.log(newSelectedItems);
        }
        setSelectedItems(newSelectedItems);
    };

    const handleSave = () => {
        // Pass selected symbols to the parent component (ClothWrite)
        handleSymbolsSave(selectedItems);
        // Close the collapsible view (optional)
        
    };

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.Button, { backgroundColor: "#92D3F5" }]}>
                        <Image source={require("../../assets/images/Wash/Wash.png")} />
                        <Text style={styles.ButtonText}>{"세탁"}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>toggleCollapse("세탁")}>
                        <Icon
                            name={isWashCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                            size={30}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
                {!isWashCollapsed && (
                    <View style={styles.contentContainer}>
                        {wash.map((image, index) => {
                            return (
                                <View key={`content_${index}`} style={styles.contentBox}>
                                    <CheckBox
                                        checked={selectedItems.includes(image.desc)}
                                        onPress={() => handleCheckBox(image.desc)}
                                        containerStyle={styles.checkBoxContainer}
                                        checkedColor={"#92D3F5"}
                                    />
                                    <Image source={{uri:image.symbol}}  style={{ width: 25, height: 25 }}/>
                                    <Text key={`text_${index}`} style={styles.content}>
                                        {image.desc}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                )}  
            </View> 

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.Button, { backgroundColor: "#F5B692" }]}>
                        <Image source={require("../../assets/images/Bleach/Bleach.png")} />
                        <Text style={styles.ButtonText}>{"표백"}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>toggleCollapse("표백")}>
                        <Icon
                            name={isBleachCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                            size={30}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
                {!isBleachCollapsed && (
                    <View style={styles.contentContainer}>
                        {bleach.map((image, index) => {
                            return (
                                <View key={`content_${index}`} style={styles.contentBox}>
                                    <CheckBox
                                        checked={selectedItems.includes(image.desc)}
                                        onPress={() => handleCheckBox(image.desc)}
                                        containerStyle={styles.checkBoxContainer}
                                        checkedColor={"#F5B692"}
                                    />
                                    <Image source={{uri:image.symbol}}  style={{ width: 25, height: 25 }}/>
                                    <Text key={`text_${index}`} style={styles.content}>
                                        {image.desc}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                )}  
            </View> 


            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.Button, { backgroundColor: "#F5DF92" }]}>
                        <Image source={require("../../assets/images/Dry/Dry.png")} />
                        <Text style={styles.ButtonText}>{"건조"}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>toggleCollapse("건조")}>
                        <Icon
                            name={isDryCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                            size={30}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
                {!isDryCollapsed && (
                    <View style={styles.contentContainer}>
                        {dry.map((image, index) => {
                            return (
                                <View key={`content_${index}`} style={styles.contentBox}>
                                    <CheckBox
                                        checked={selectedItems.includes(image.desc)}
                                        onPress={() => handleCheckBox(image.desc)}
                                        containerStyle={styles.checkBoxContainer}
                                        checkedColor={"#F5DF92"}
                                    />
                                    <Image source={{uri:image.symbol}}  style={{ width: 25, height: 25 }}/>
                                    <Text key={`text_${index}`} style={styles.content}>
                                        {image.desc}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                )}  
            </View> 

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.Button, { backgroundColor: "#88DBA4" }]}>
                        <Image source={require("../../assets/images/Iron/Iron.png")} />
                        <Text style={styles.ButtonText}>{"다림"}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>toggleCollapse("다림")}>
                        <Icon
                            name={isIronCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                            size={30}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
                {!isIronCollapsed && (
                    <View style={styles.contentContainer}>
                        {iron.map((image, index) => {
                            return (
                                <View key={`content_${index}`} style={styles.contentBox}>
                                    <CheckBox
                                        checked={selectedItems.includes(image.desc)}
                                        onPress={() => handleCheckBox(image.desc)}
                                        containerStyle={styles.checkBoxContainer}
                                        checkedColor={"#88DBA4"}
                                    />
                                    <Image source={{uri:image.symbol}}  style={{ width: 25, height: 25 }}/>
                                    <Text key={`text_${index}`} style={styles.content}>
                                        {image.desc}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                )}  
            </View> 

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.Button, { backgroundColor: "#C3A0E6" }]}>
                        <Image source={require("../../assets/images/Dryclean/Dryclean.png")} />
                        <Text style={styles.ButtonText}>{"드라이클리닝"}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>toggleCollapse("드라이클리닝")}>
                        <Icon
                            name={isDrycleanCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                            size={30}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
                {!isDrycleanCollapsed && (
                    <View style={styles.contentContainer}>
                        {dryclean.map((image, index) => {
                            return (
                                <View key={`content_${index}`} style={styles.contentBox}>
                                    <CheckBox
                                        checked={selectedItems.includes(image.desc)}
                                        onPress={() => handleCheckBox(image.desc)}
                                        containerStyle={styles.checkBoxContainer}
                                        checkedColor={"#C3A0E6"}
                                    />
                                    <Image source={{uri:image.symbol}}  style={{ width: 25, height: 25 }}/>
                                    <Text key={`text_${index}`} style={styles.content}>
                                        {image.desc}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                )}  
            </View> 
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.Button, { backgroundColor: "#C3A0E6" }]}>
                        <Image source={require("../../assets/images/Dryclean/Dryclean.png")} />
                        <Text style={styles.ButtonText}>{"짜는 방법"}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>toggleCollapse("짜는 방법")}>
                        <Icon
                            name={isDrycleanCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                            size={30}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
                {!isDrycleanCollapsed && (
                    <View style={styles.contentContainer}>
                        {wiring.map((image, index) => {
                            return (
                                <View key={`content_${index}`} style={styles.contentBox}>
                                    <CheckBox
                                        checked={selectedItems.includes(image.desc)}
                                        onPress={() => handleCheckBox(image.desc)}
                                        containerStyle={styles.checkBoxContainer}
                                        checkedColor={"#e6a0b2"}
                                    />
                                    <Image source={{uri:image.symbol}} style={{ width: 25, height: 25 }}/>
                                    <Text key={`text_${index}`} style={styles.content}>
                                        {image.desc}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                )}                
            </View> 

            <Pressable style={styles.symbolBtn} onPress={handleSave}>
                <Text style={styles.symbolBtnText}>완료</Text>
            </Pressable>
        </View>
    );
}

CollapsibleViewCheck.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    classImage: PropTypes.any,
    content: PropTypes.array,
    color: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#DBDBDB',
        width: 330,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Button: {
        backgroundColor: '#92D3F5',
        flexDirection: 'row',
        width: 'auto',
        height: 30,
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        padding: 5,
    },
    ButtonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'BMHANNA_11yrs_ttf',
        textAlign: 'center',
    },
    contentBox: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },
    content: {
        fontFamily: 'NanumSquareNeo-cBd',
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 15,
        maxWidth:200,
    },
    checkBoxContainer: {
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
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
        fontSize: 15,
        padding:15,
    },
});

export default CollapsibleViewCheck;
