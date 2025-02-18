import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { auth } from '../../config/firebaseConfig'
import { signOut } from 'firebase/auth'
import { removeLocalStorage } from '../../service/storage'
export default function HomeScreen() {
  const OnSignOut = async () => {
    signOut(auth);
    await removeLocalStorage('userDetails');
    ToastAndroid.show("Logout Successful", ToastAndroid.BOTTOM)
  }
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity style={styles.btn} onPress={OnSignOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30
  },
  btnTxt: {

  }
})