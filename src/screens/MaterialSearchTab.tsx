import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, View, StyleSheet} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function MaterialSearchTab({route, navigation}) {
    const {searchText} = route.params;
    console.log("searchText:", searchText)
    const [searchMaterialText, onChangeText] = React.useState('');
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchbar}>
                <Icon name="arrow-left" size={35} color={'black'} style={{marginLeft: 10}} onPress={() => navigation.goBack()}/>
                <TextInput style={styles.textinput} autoFocus={true} onChangeText={onChangeText} value={searchMaterialText} />
                <Icon name="magnify" size={35} color={'#1472FF'} style={{marginRight: 10}} onPress={() => navigation.navigate('MaterialSearchResult', {searchText, searchMaterialText})}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchbar: {
        flexDirection: 'row',
        height: 60,
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 5,
        padding: 5,
        borderBottomWidth: 2,
        borderColor: '#1472FF'
    },
    textinput: {
        flex: 1,
        backgroundColor: 'white',
        fontFamily: 'NanumSquareNeo-bRg', 
        fontSize:14  
    }
})