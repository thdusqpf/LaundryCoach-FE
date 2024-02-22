import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Pressable} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TopBarNoProfile } from ".";
import {
    withAuthenticator,
    useAuthenticator
  } from '@aws-amplify/ui-react-native';

const userSelector = (context) => [context.user];

const SignOutButton = () => {
    const { user, signOut } = useAuthenticator(userSelector);
    return (
      <Pressable onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}>
        로그아웃
        </Text>
      </Pressable>
    );
  };
  const UserInfo = () => {
    const { user, signOut } = useAuthenticator(userSelector);
    return (
        <View style={styles.profile}>
                <Icon name="account-circle-outline" size={70} color={'black'}/>
                <Text style={styles.profileName}>{user.username}</Text> 
            </View>
    )
  }
export default function MyPage({navigation}) {
   
    return (
        <SafeAreaView style={styles.safearea}>
            <TopBarNoProfile />
            <View style={styles.background}>
                <UserInfo />
                <SignOutButton />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1
    },
    background:{
        flex: 1,
        backgroundColor:"#ffffff",
        width:"100%",
        height:"100%",
        alignItems:"center"
    },
    profile:{
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 16, 
        marginTop:20
    },
    profileName:{
        fontFamily: 'NanumSquareNeo-cBd', 
        fontSize:18,
        marginLeft:10,
    },
    button: {
        backgroundColor: '#0057FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
    },
    buttonText:{
        textAlign:"center",
        color:"#fff",
    }
});