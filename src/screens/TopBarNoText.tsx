import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";



export default function TopBarNoText() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.topbarview}>
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