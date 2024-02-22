import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TopBarNoProfile() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.topbarview}>
                <Image source={require('../../assets/images/bubbleicon.png')}
                style={{marginLeft:10}} 
                resizeMode='stretch' /> 
                <Text style={styles.maintext}>세탁코치</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safearea: {
        backgroundColor: '#1472FF'
    },
    topbarview: {
        flexDirection: 'row',
        height: 65,
        alignItems: 'center'
    },
    maintext: {
        fontFamily: 'BMHANNA_11yrs_ttf',
        fontSize: 28,
        color: 'white',
        flex: 1
    }
})