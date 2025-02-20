import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
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
            <Tabs.Screen name='History'
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='history' color={color} size={size} />
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