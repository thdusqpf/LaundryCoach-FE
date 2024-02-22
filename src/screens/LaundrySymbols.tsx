import React, {useState, useEffect} from "react"
import {ScrollView, StatusBar, StyleSheet, Text} from "react-native"
import {CollapsibleView} from ".";

import { generateClient } from "aws-amplify/api";
import { listWashingMethods, getWashingMethod } from "../graphql/queries";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';
const userSelector = (context) => [context.user];
const client = generateClient();

export default function LaundrySymbols(){    
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


    return (
    <ScrollView style={styles.Background}>
        <StatusBar style="auto"/>
        <Text style={styles.TitleText}>세탁 기호 분류</Text>
        <CollapsibleView
            title="세탁"
            className="Wash"
            classImage={require("../../assets/images/Wash/Wash.png")}
            content={wash}
            color="#92D3F5"
        />
        <CollapsibleView
            title="표백"
            className="bleach"
            classImage={require("../../assets/images/Bleach/Bleach.png")}
            content={bleach}
            color="#F5B692"
        />
        <CollapsibleView
            title="건조"
            className="dry"
            classImage={require("../../assets/images/Dry/Dry.png")}
            content={dry}
            color="#F5DF92"
        />
        <CollapsibleView
            title="다림"
            className="iron"
            classImage={require("../../assets/images/Iron/Iron.png")}
            content={iron}
            color="#88DBA4"
        />
        <CollapsibleView
            title="드라이클리닝"
            className="dryclean"
            classImage={require("../../assets/images/Dryclean/Dryclean.png")}
            content={dryclean}
            color="#C3A0E6"
        />
        <CollapsibleView
            title="짜는방법"
            className="wiring"
            classImage={require("../../assets/images/Wiring/Wiring.png")}
            content={wiring}
            color="#e6a0b2"
        />
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    Background: {
        flex: 1,
        backgroundColor: "#fff",
        fontFamily:'NanumSquareNeo-cBd', 
    },
    Box:{
        margin:'auto',
        width: 330,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#DBDBDB'
    },
    TitleText:{
        marginTop:25,
        fontFamily:'BMHANNA_11yrs_ttf',
        fontSize: 22,
        textAlign:'center',
    },
    WashButton:{
        backgroundColor:"#92D3F5",
        flexDirection: 'row',
        width:70,
        height: 30,
        alignItems: 'center',
        borderRadius:10,
        margin: 10
    },
    BleachButton:{
        backgroundColor:"#F5B692",
        flexDirection: 'row',
        width:70,
        height: 30
    },
    IronButton:{
        backgroundColor:"#88DBA4",
        flexDirection: 'row',
        width:70,
        height: 30
    },
    DryButton:{
        backgroundColor:"#F5DF92",
        flexDirection: 'row',
        width:70,
        height: 30
    },
    Drycleanbutton:{
        backgroundColor:"#C3A0E6",
        flexDirection: 'row',
        width:70,
        height: 30
    },
    ButtonText:{
        fontSize:20,
        color: "#fff",
        fontFamily:'BMHANNA_11yrs_ttf',
        textAlign: 'center',
    }
})