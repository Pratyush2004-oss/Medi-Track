import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import EmptyState from '../../components/EmptyState'

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Header />
      <EmptyState/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "white",
    height: '100%',
  }
})