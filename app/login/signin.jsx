import { Alert, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { auth } from '../../config/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function SigninPage() {
    const router = useRouter();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const OnSignIn = () => {
        if (!email || !password) {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.BOTTOM);
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                ToastAndroid.show("Logged in Successfully", ToastAndroid.BOTTOM);
                router.replace('(tabs)');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == 'auth/invalid-credential') {
                    ToastAndroid.show("Invalid Credentials..", ToastAndroid.BOTTOM);
                    Alert.alert("Invalid Credentials..")
                }
            });


    }
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Let's Sign You In</Text>
            <Text style={styles.subHeader}>Welcome Back</Text>
            <Text style={styles.subHeader}>You've been missed!</Text>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput placeholder='Email' onChangeText={(value) => setemail(value)} style={styles.textInput} />
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput onChangeText={(value) => setpassword(value)} placeholder='Password' style={styles.textInput} secureTextEntry={true} />
            </View>

            <TouchableOpacity style={styles.btn} onPress={OnSignIn}>
                <Text style={styles.btnTxt}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Createbtn} onPress={() => router.push('login/signup')}>
                <Text style={[styles.btnTxt, { color: Colors.PRIMARY }]}>Create Account</Text>
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
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: Colors.GRAY
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