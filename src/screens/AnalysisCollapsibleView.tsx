import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnalysisCollapsibleView = ({ save, onDelete}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.Button]}>
                    <Text style={styles.ButtonText}>{save.title}</Text>
                </View>
                
                <TouchableOpacity onPress={toggleCollapse}>
                    <Icon name={isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={30} color="#333" />
                </TouchableOpacity>
            </View>

            {!isCollapsed && (
                <View>
                    <View style={styles.contentContainer}>
                        <Image source={{uri:save.imagePath}} style={{width: 100, height: 100, marginRight: 10}} />
                        <View style={styles.TitleBox}>
                            <Image source={require("../../assets/images/Check.png")} style={{width: 15, height: 15, marginRight: 10}} />
                            <Text style={[styles.contentTitle, {marginTop:30}]}>세탁 방법</Text>
                        </View>
                        {save.symbol && save.symbol.map((symbol, index) => (
                            <Text key={index} style={styles.content}>• {symbol}</Text>
                        ))}
                        <View style={styles.TitleBox}>
                            <Image source={require("../../assets/images/Check.png")} style={{width: 15, height: 15, marginRight: 10}} />
                            <Text style={[styles.contentTitle, {marginTop:30}]}>메모</Text>
                        </View>
                        <Text style={styles.content}>{save.memo}</Text>
                    </View>
                    <Pressable style={styles.icons} onPress={() => onDelete(save)}>
                        <Icon name={'restore-from-trash'} size={40} color="#333" />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:10,
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
        flexDirection: 'row',
        width:'auto',
        height: 40,
        alignItems: 'center',
        borderRadius:10,
        margin: 10,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor: '#2F88FF',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,

    },
    ButtonText:{
        fontSize:20,
        fontFamily:'BMHANNA_11yrs_ttf',
        textAlign: 'center',
        color: 'white',
    },
    
    contentBox:{
        flexDirection:"row",
        margin:10,
    },
    TitleBox:{
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:10,
    },
    TitleCheck:{
        
    },
    contentTitle:{
        fontFamily:'NanumSquareNeo-dEb',
        fontSize:16,
    },
    content: {
        fontFamily:'NanumSquareNeo-dEb',
        fontSize: 14,
        marginTop: 5,
        marginLeft:10,
        marginRight:15,
    },
    icons:{
        alignSelf:"flex-end",
    }
});

export default AnalysisCollapsibleView;