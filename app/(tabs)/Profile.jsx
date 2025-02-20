import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLocalStorage, removeLocalStorage } from '../../service/storage'
import Colors from "../../constant/Colors";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
export default function Profile() {
  const [user, setuser] = useState();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, [])
  
  const getUser = async () => {
    const userInfo = await getLocalStorage('userDetails');
    setuser(userInfo);
  }

  const handleLogout = async () => {
    await removeLocalStorage();
    ToastAndroid.show('Logged out successfully', ToastAndroid.BOTTOM);
    router.replace('/login');
  }
  return user && (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.container}>
        <Image source={require('../../assets/images/smiley.png')} style={styles.logo} />
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.mail}>{user.email}</Text>
      </View>
      <View style={styles.actionWrapper}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('add-new-medication')}>
          <Ionicons style={styles.btnIcon} name="add-circle" size={28} color={Colors.PRIMARY} />
          <Text style={styles.btnText}>Add New Medication</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('(tabs)')}>
          <Ionicons style={styles.btnIcon} name="medkit" size={28} color={Colors.PRIMARY} />
          <Text style={styles.btnText}>My Medication</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('history')}>
          <Ionicons style={styles.btnIcon} name="time" size={28} color={Colors.PRIMARY} />
          <Text style={styles.btnText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
          <Ionicons style={styles.btnIcon} name="log-out" size={28} color={Colors.PRIMARY} />
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: 'white',
    height: '100%'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  logo: {
    height: 75,
    width: 75
  },
  mail: {
    fontSize: 18,
    marginTop: 10,
    color: Colors.GRAY
  },
  actionWrapper: {
    marginTop: 20,
    gap: 10
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 15,
  },
  btnIcon: {
    padding: 10,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 10
  },
  btnText: {
    fontSize: 18

  }
})