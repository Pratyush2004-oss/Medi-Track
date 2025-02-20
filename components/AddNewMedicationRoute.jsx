import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Colors from '@/constant/Colors';
import ConstantString from '@/constant/ConstantString';

export default function AddNewMedicationRoute() {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/add-new-medication')}>
            <Text style={styles.btnTxt}>{ConstantString.AddNewMediciationBtn}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    btnTxt: {
        color: 'white',
        fontSize: 18
    }
})