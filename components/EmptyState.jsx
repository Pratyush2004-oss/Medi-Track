import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constant/Colors'
import ConstantString from "../constant/ConstantString"
import { useRouter } from 'expo-router';
import AddNewMedicationRoute from './AddNewMedicationRoute';

export default function EmptyState() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/medicine.png')} style={styles.image} />
            <Text style={styles.title}>{ConstantString.NoMedication}</Text>
            <Text style={styles.description}>{ConstantString.MedicationSubText} </Text>

            <AddNewMedicationRoute />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: 200
    },
    title: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 20
    },
    description: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.DARK_GRAY,
        marginTop: 10
    },
})