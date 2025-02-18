import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddMedHeader from '../../components/addMedHeader'
import AddnewMedicationForm from '../../components/AddnewMedicationForm'

export default function AddNewMedicines() {
    return (
        <View style={styles.container}>
            <AddMedHeader/>

            <AddnewMedicationForm/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:10
    },

})