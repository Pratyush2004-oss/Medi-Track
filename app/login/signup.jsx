import { Alert, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { auth } from '../../config/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
export default function SignupScreen() {
    const router = useRouter();
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const OnCreateAccount = () => {
        if (!email || !password || !fullName) {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.BOTTOM);
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                ToastAndroid.show('Account created successfully', ToastAndroid.BOTTOM);
                router.push('(tabs)');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                if (errorCode == 'auth/email-already-in-use') {
                    ToastAndroid.show('Email already in use', ToastAndroid.BOTTOM);
                    Alert.alert('Error', 'Email already in use');
                }
                // ..
            });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Create new Account</Text>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput placeholder='Full Name' onChangeText={(value) => setfullName(value)} style={styles.textInput} />
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput placeholder='Email' onChangeText={(value) => setEmail(value)} style={styles.textInput} />
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput placeholder='Password' onChangeText={(value) => setPassword(value)} style={styles.textInput} secureTextEntry={true} />
            </View>

            <TouchableOpacity style={styles.btn} onPress={OnCreateAccount}>
                <Text style={styles.btnTxt}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Createbtn} onPress={() => router.push('login/signin')}>
                <Text style={[styles.btnTxt, { color: Colors.PRIMARY }]}>Already have an account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 25
    },
    textHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15
    },
    inputWrapper: {
        marginTop: 25
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 10,
        fontSize: 17,
        marginTop: 5
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30
    },
    Createbtn: {
        backgroundColor: 'white',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    },
    btnTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})