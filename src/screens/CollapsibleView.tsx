import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const CollapsibleView = ({ title, className, classImage, content, color }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.Button, {backgroundColor:color}]}>
                    <Image source={classImage}/>
                    <Text style={styles.ButtonText}>{title}</Text>
                </View>
                <TouchableOpacity onPress={toggleCollapse}>
                    <Icon name={isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={30} color="#333" />
                </TouchableOpacity>
            </View>
            {!isCollapsed && (
                <View style={styles.contentContainer}>
                    {content.map((item, index) => {
                        return (
                            <View key={index} style={styles.contentBox}>
                                <Image key={`image_${index}`} source={{uri:item.symbol}} style={{ width: 25, height: 25 }}/>
                                <Text key={`text_${index}`} style={[styles.content]}>
                                    {item.desc}
                                </Text>
                            </View>
                        );
                        })}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:15,
        padding: 10,
        alignSelf: 'center',  // 가운데 정렬
        borderRadius:10,
        borderWidth:2,
        borderColor:'#DBDBDB',
        width:330,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Button:{
        backgroundColor:"#92D3F5",
        flexDirection: 'row',
        width:'auto',
        height: 30,
        alignItems: 'center',
        borderRadius:10,
        margin: 10,
        padding:5
    },
    ButtonText:{
        fontSize:16,
        color: "#fff",
        fontFamily:'BMHANNA_11yrs_ttf',
        textAlign: 'center',
    },
    contentBox:{
        flexDirection:"row",
        margin:10,
        alignItems:'center'
    },
    content: {
        fontFamily: 'NanumSquareNeo-cBd',
        fontSize: 14,
        marginTop: 5,
        marginLeft:10,
        marginRight:15,
        maxWidth:250,
    },
});

export default CollapsibleView;