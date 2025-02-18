import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { getLocalStorage } from '../../service/storage'

export default function TabLayout() {
    const router = useRouter();

    useEffect(()=>{
        getUserDetail();
    },[])

    const getUserDetail = async () =>{
        const userInfo = await getLocalStorage('userDetails');
        if(!userInfo){
            router.replace('/login');
        }
    }

    // Check whether the user is logged in or not

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