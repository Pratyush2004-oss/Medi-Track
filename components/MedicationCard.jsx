import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constant/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function MedicationCard({ medicine }) {
    return (
        <TouchableOpacity style={styles.medicineContainer}>
            <View style={styles.subcontainer}>
                <View style={{ marginRight: 15 }}>
                    <Image source={{ uri: medicine.type.icon }} style={styles.icon} />
                </View>
                <View>
                    <Text style={styles.title}>{medicine.name}</Text>
                    <Text style={styles.font}>{medicine.whenToTake}</Text>
                    <Text style={styles.font}>{medicine.dose} {medicine.type.name}</Text>
                </View>
            </View>
            <View style={styles.timeContainer}>
                <Ionicons name="timer-outline" size={30} color="black" />
                <Text style={styles.time}>{medicine.remainderTime}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    medicineContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: Colors.LIGHT_PRIMARY,
        borderRadius: 15,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        height: 80,
        width: 80,
        borderRadius: 10
    },
    timeContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    time: {
        marginTop:2,
        fontSize: 18,
        fontWeight: 'bold'
    },
    subcontainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    font: {
        fontSize: 17
    }
})