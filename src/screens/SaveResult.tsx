import React, {useEffect, useState} from "react"
import {StatusBar, StyleSheet, Text, View, ScrollView} from "react-native"
import { SaveCollapsibleView, AnalysisCollapsibleView } from ".";
import { generateClient } from "aws-amplify/api";
import { listSearchResults, getSearchResult, listAnalysisResults, getAnalysisResult} from "../graphql/queries";
import { deleteSearchResult, deleteAnalysisResult } from "../graphql/mutations";
import {
    withAuthenticator,
    useAuthenticator
} from '@aws-amplify/ui-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const userSelector = (context) => [context.user];
const client = generateClient()

export default function SaveResult() {
    const [searchResults, setSearchResults] = useState([]);
    const [analysisResults, setAnalysisResults] = useState([]);
    const { user, signOut } = useAuthenticator(userSelector);
    console.log("username", user.username);;
    useEffect(() => {
        fetchResult();     
    }, []);

    useEffect(() => {
        fetchAnalysisResult();
    }, []);

    async function fetchResult() {
        try {
            // List all items
            const allSearchResults = await client.graphql({
                query: listSearchResults
            });            
            const newResults = allSearchResults.data.listSearchResults.items;
        
            const filteredItems = newResults.filter(item => item.user_id === user.username);
            console.log("filteredItems:", filteredItems);
            
            setSearchResults(filteredItems);
            console.log("searchResults:", searchResults);
            } catch (error) {
            console.error('Error fetching results1:', error);
            // 예외 처리 또는 상태 업데이트 등을 추가로 수행할 수 있습니다.
            }  
        }
        
        async function fetchAnalysisResult() {
            try {
                // List all items
                const allAnalysisResults = await client.graphql({
                    query: listAnalysisResults
                });            
                console.log("allAnalysisResults:", allAnalysisResults);
                const newAnalysisResults = allAnalysisResults.data.listAnalysisResults.items;
            
                const filteredAnalysisItems = newAnalysisResults.filter(item => item.user_id === user.username);
                console.log("filteredAnalysisItems:", filteredAnalysisItems);
                
                setAnalysisResults(filteredAnalysisItems);
                } catch (error) {
                console.error('Error fetching results2:', error);
                // 예외 처리 또는 상태 업데이트 등을 추가로 수행할 수 있습니다.
                }     
            }
    
    async function onSaveDelete(deleteItem) {
        const deletedItem = searchResults.filter(result => result.id !== deleteItem.id);
        setSearchResults(deletedItem, () => {
            console.log("delete 결과", searchResults);
        });
        try {
            const deletedSearchResult = await client.graphql({
                query: deleteSearchResult,
                variables: {
                    input: {
                    id: deleteItem.id
                    }
                }
                });
                console.log("Deleted search searchResults:", deletedSearchResult);
            } catch (error) {
                console.error("Error deleting search searchResults:", error);
            }
    }
    async function onAnalysisSaveDelete(deleteItem) {
        const deletedItem = analysisResults.filter(result => result.id !== deleteItem.id);
        setAnalysisResults(deletedItem, () => {
            console.log("delete 결과", analysisResults);
        });
        try {
            const deletedAnalysisResult = await client.graphql({
                query: deleteAnalysisResult,
                variables: {
                    input: {
                    id: deleteItem.id
                    }
                }
                });
                console.log("Deleted search searchResults:", deletedAnalysisResult);
            } catch (error) {
                console.error("Error deleting search searchResults:", error);
            }
    }


    return (
    <View style={styles.Container}>
        <StatusBar style="auto"/>
            <ScrollView >
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="magnify" size={35} color={'black'} style={{marginTop: 20}} />
                        <Text style={styles.title}>검색 결과 저장</Text>
                    </View>
                {}
                <View>
                {searchResults.map((item, index) => {
                    return (
                        <SaveCollapsibleView
                            key={item.id}
                            save={item}
                            onDelete={onSaveDelete}
                        >
                        </SaveCollapsibleView>
                    );
                })
                }
                {analysisResults.map((item, index) => {
                    return (
                        <AnalysisCollapsibleView
                            key={item.id}
                            save={item}
                            onDelete={onAnalysisSaveDelete}
                        >
                        </AnalysisCollapsibleView>
                    );
                })
                }
            </View>
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    Container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    },
    text: {
    fontSize: 48,
    color: "red",
    },
    title:{
        marginTop:20,
        fontSize: 22,
        fontFamily:'BMHANNA_11yrs_ttf',
        color: "black",
        textAlign: 'center'

    },
})
