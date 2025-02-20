import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import MedicationList from "../../components/MedicationList";

export default function HomeScreen() {

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={styles.container}>
          <Header />
          <MedicationList />
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "white",
    height: '100%',
  }
})