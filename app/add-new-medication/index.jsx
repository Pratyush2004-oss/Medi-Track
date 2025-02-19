import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddMedHeader from '../../components/addMedHeader'
import AddnewMedicationForm from '../../components/AddnewMedicationForm'

export default function AddNewMedicines() {
    return (
        <ScrollView style={styles.container}>
            <AddMedHeader />

            <AddnewMedicationForm />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },

})