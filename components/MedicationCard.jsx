import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constant/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function MedicationCard({ medicine, selectedDate }) {
    const [status, setstatus] = useState();
    useEffect(() => {
        checkStatus();
    }, [medicine]);

    const checkStatus = async () => {
        const data = medicine?.action?.find((item) => item.date === selectedDate);
        if (data) {
            setstatus(data);
        }
    }
    return (
        <View style={styles.medicineContainer} >
            <View style={styles.subcontainer}>
                <View style={{ marginRight: 10 }}>
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

            {
                status && (
                    <View style={styles.statusContainer}>
                        {
                            status.status === 'Taken' && <Ionicons name="checkmark-circle" size={30} color={Colors.GREEN} />
                        }
                        {
                            status.status === 'Missed' && <Ionicons name="close-circle" size={30} color={'red'} />
                        }
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    medicineContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: Colors.LIGHT_PRIMARY,
        borderRadius: 15,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
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
        marginTop: 2,
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
    },
    statusContainer: {
        position: 'absolute',
        top: 5,
        left: 5
    }
})