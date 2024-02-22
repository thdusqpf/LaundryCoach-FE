import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CameraView from "../screens/CameraView";
import MainTab from "./MainTab";
import { TouchableTipTab, AnalysisResult, MyPage, Cloth, MyCloset, ClothWriteNavigation,ClothUpdateNavigation, SearchResult, SearchTab, MaterialSearchResult, MaterialSearchTab, CameraViewNonavigation, SplashScreen} from "../screens";


const Stack = createStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
            <Stack.Screen name="Main" component={MainTab} options={{headerShown: false}}/>
            <Stack.Screen name="CameraView" component={CameraView} options={{headerShown: false}} />
            <Stack.Screen name="AnalysisResult" component={AnalysisResult} options={{headerShown: false}}/>
            <Stack.Screen name="TouchableTipTab" component={TouchableTipTab} options={{headerShown: false}}/>
            <Stack.Screen name="MyPage" component={MyPage} options={{headerShown: false}} />
            <Stack.Screen name="Cloth" component={Cloth} options={{headerShown: false}}/>
            <Stack.Screen name="Closet" component={MyCloset} options={{headerShown: false}} />
            <Stack.Screen name="ClothWriteNavigation" component={ClothWriteNavigation} options={{headerShown: false}} />
            <Stack.Screen name="ClothUpdateNavigation" component={ClothUpdateNavigation} options={{headerShown: false}} />
            <Stack.Screen name="SearchResult" component={SearchResult} options={{headerShown: false}}/>
            <Stack.Screen name="SearchTab" component={SearchTab} options={{headerShown: false}}/>
            <Stack.Screen name="MaterialSearchResult" component={MaterialSearchResult} options={{headerShown: false}} />
            <Stack.Screen name="MaterialSearchTab" component={MaterialSearchTab} options={{headerShown: false}} />
            <Stack.Screen name="CameraViewNonavigation" component={CameraViewNonavigation} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}