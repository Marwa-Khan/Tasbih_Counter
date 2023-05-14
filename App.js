import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Count from './Components/Count';
export default function App() {
  return (
    <>
    <SafeAreaView style={[{paddingTop:Platform.OS==='android'?StatusBar.currentHeight:0},styles.container]}>
      <Count/>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
