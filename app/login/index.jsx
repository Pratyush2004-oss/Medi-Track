import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View>
      <View style={styles.ImageContainer}>
        <Image source={require('../../assets/images/login.png')} style={styles.image} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.LoginTitle}>Stay on Track, Stay Healthy!</Text>
        <Text style={styles.tagLine} >Track your meds and take control of your health. Stay consistent, Stay confident </Text>

        <TouchableOpacity onPress={() => router.push('login/signin')} style={styles.button}>
          <Text style={styles.btnTxt}>Continue</Text>
          <FontAwesome name="long-arrow-right" size={20} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.desclaimer}>Note: By clicking the Continue button, you will agree to our terms and conditions.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  image: {
    width: 210,
    height: 450,
    borderRadius: 20
  },
  loginContainer: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    height: '100%',
  },
  LoginTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  },
  tagLine: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize: 17
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 50,
    marginTop: 40,
    alignItems: 'center',
    gap: 15
  },
  btnTxt: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontWeight: "bold",
    letterSpacing: 1
  },
  desclaimer:{
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize:12
  }
})