import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constant/Colors'
import { useRouter } from 'expo-router'

export default function AddMedHeader() {
    const router = useRouter();
    return (
        <View>
            <Image source={require('../assets/images/consult.png')} style={styles.image} />
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle-outline" size={30} color={Colors.PRIMARY} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '100%',
        borderRadius: 10
    },
    backBtn: {
        position: 'absolute',
        top: 10,
        left: 20
    }
})