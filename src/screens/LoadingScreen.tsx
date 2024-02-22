import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { WashingMachine } from '.';

export default function LoadingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <WashingMachine />
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'center'
  },
  text: {
    fontFamily: 'BMHANNA_11yrs_ttf',
    fontSize: 16,
    color: 'black'
  },
  view: {
    flexDirection: 'row'
  }
})