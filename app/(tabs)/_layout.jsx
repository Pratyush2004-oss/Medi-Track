import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'

export default function TabLayout() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(null)

    // Check whether the user is logged in or not
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            setAuthenticated(true);
            // ...
        } else {
            // User is signed out
            // ...
            setAuthenticated(false)
        }
    })
    useEffect(() => {
        if (authenticated === false) {
            router.push('/login');
        }
    }, [authenticated])
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='index'
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='home' color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen name='AddNew'
                options={{
                    tabBarLabel: 'Add New',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='plus' color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen name='Profile'
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='user' color={color} size={size} />
                    )
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({}) 