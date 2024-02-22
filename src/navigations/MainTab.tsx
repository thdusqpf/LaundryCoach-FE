import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Home, LaundrySymbols, LaundryTips, SaveResult, MyCloset, MyPage } from "../screens";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function MainTab({navigation}) {
    return (
        <Tab.Navigator initialRouteName="Home"
                    screenOptions={({ route }) => ({
                        tabBarStyle: {
                            height:60,
                        },
                        headerStyle:{
                            backgroundColor:'#1472FF',
                            height:65
                        },
                        headerLeft: ({ tintColor }) => (
                            <Image source={require('../../assets/images/bubbleicon.png')} style={{marginLeft:10}} resizeMode='stretch' />
                        ),
                        headerRight: ({ tintColor }) => (
                            <Icon name='account-circle-outline' size={35} color={'white'} onPress={() => navigation.navigate(MyPage)} style={{marginRight:10}} />
                        ),
                    })}>
            <Tab.Screen name="SaveResult"
                        component={SaveResult} 
                        options={{
                            tabBarShowLabel: false,
                            title: '세탁코치',
                        headerTintColor: '#ffffff',
                            headerTitleStyle: {
                                fontWeight: '200',
                                fontSize: 28,
                                fontFamily: 'BMHANNA_11yrs_ttf',
                                marginTop:5
                            },
                        tabBarIcon: ({color, size}) => (
                            <Image source={require('../../assets/images/Save.png')}/>
                        )
                        }}/>
            <Tab.Screen name="LaundrySymbols" 
                        component={LaundrySymbols}
                        options={{
                            tabBarShowLabel: false,
                            title: '세탁코치',
                        headerTintColor: '#ffffff',
                            headerTitleStyle: {
                                fontWeight: '200',
                                fontSize: 28,
                                fontFamily: 'BMHANNA_11yrs_ttf',
                                marginTop:5
                            },
                        tabBarIcon: ({color, size}) => (
                            <Image source={require('../../assets/images/Washing_symbol.png')}/>
                        )
                        }}  />
            <Tab.Screen name="Home" 
                        component={Home}
                        options={{
                            tabBarShowLabel: false,
                            title: '세탁코치',
                        headerTintColor: '#ffffff',
                            headerTitleStyle: {
                                fontWeight: '200',
                                fontSize: 28,
                                fontFamily: 'BMHANNA_11yrs_ttf',
                                marginTop:5
                            },
                        tabBarIcon: ({color, size}) => (
                            <Image source={require('../../assets/images/Home.png')}/>
                        )
                        }}  />
            <Tab.Screen name="LaundryTips" 
                        component={LaundryTips}
                        options={{
                            tabBarShowLabel: false,
                            title: '세탁코치',
                        headerTintColor: '#ffffff',
                            headerTitleStyle: {
                                fontWeight: '200',
                                fontSize: 28,
                                fontFamily: 'BMHANNA_11yrs_ttf',
                                marginTop:5
                            },
                        tabBarIcon: ({color, size}) => (
                            <Image source={require('../../assets/images/Tips.png')}/>
                        )
                        }}
            />
            <Tab.Screen name="MyCloset" 
                        component={MyCloset}
                        options={{
                            tabBarShowLabel: false,
                            title: '세탁코치',
                        headerTintColor: '#ffffff',
                            headerTitleStyle: {
                                fontWeight: '200',
                                fontSize: 28,
                                fontFamily: 'BMHANNA_11yrs_ttf',
                                marginTop:5
                            },
                        tabBarIcon: ({color, size}) => (
                            <Image source={require('../../assets/images/Closet.png')}/>
                        )
                        }}  />
        </Tab.Navigator>
    )
}