import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../service/storage'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constant/Colors';

export default function Header() {
    const [user, setuser] = useState();
    useEffect(() => {
        getUserDetails();
    }, [])
    const getUserDetails = async () => {
        const userInfo = await getLocalStorage('userDetails');
        setuser(userInfo);
    }
    return user && (
        <View style={{ marginTop: -10 }}>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Image source={require('../assets/images/smiley.png')} style={styles.logo} />
                    <Text style={styles.title}>Hello {user.displayName} 👋🏼</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="settings-outline" size={28} color={Colors.DARK_GRAY} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 20
    },
    logo: {
        width: 45,
        height: 45
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {},
})