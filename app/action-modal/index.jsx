import { ActivityIndicator, Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constant/Colors'
import MedicationCard from '../../components/MedicationCard'
import { Ionicons } from '@expo/vector-icons'
import { db } from '../../config/firebaseConfig'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import moment from 'moment'

export default function MedicationActionModal() {
  const medicine = useLocalSearchParams();
  if (medicine) {
    medicine.type = JSON.parse(medicine.type);
    if (medicine.action) {
      medicine.action = JSON.parse(medicine.action);
    }
  }
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const UpdateActionStatus = async (status) => {
    try {
      setloading(true);
      const docRef = doc(db, 'medication', medicine?.docId);
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format('LT'),
          date: medicine?.selectedDate
        })
      });
      ToastAndroid.show(`${status}!`, ToastAndroid.BOTTOM);
      Alert.alert(status, `Response Saved!`, [
        {
          text: 'Ok',
          onPress: () => router.replace('(tabs)')
        }
      ]);
    } catch (error) {
      console.log(error);
    }
    finally {
      setloading(false);
    }
  }
  return medicine && (
    <View style={styles.container}>
      <Image source={require('../../assets/images/notification.gif')}
        style={styles.notification}
      />
      <Text style={styles.date}>{medicine.selectedDate}</Text>
      <Text style={styles.remainderTime}>{medicine.remainderTime}</Text>
      <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 10 }}>It's time to take {medicine.name}</Text>

      <View style={{ marginTop: 20, width: '100%' }}>
        <MedicationCard medicine={medicine} />
      </View>

      {
        medicine.action && medicine.action.find((item) => item.date === medicine.selectedDate) ? (
          <View style={styles.btnWrapper}>
            {
              medicine.action.find((item) => item.date === medicine.selectedDate).status === 'Taken' ?
                <Text style={{ color: 'green', fontSize: 18 }}>You have Taken this medication</Text>
                :
                <Text style={{ color: 'red', fontSize: 18 }}>You have missed this medication</Text>
            }
          </View>
        ) : (
          <View style={styles.btnWrapper}>
            <TouchableOpacity onPress={() => UpdateActionStatus('Missed')} style={[styles.btn, { borderColor: 'red' }]}>
              <Ionicons name='close-circle-outline' size={30} color='red' />
              {
                loading ?
                  <ActivityIndicator size='small' color='red' />
                  :
                  <Text style={[styles.btnTxt, { color: 'red' }]}>Missed</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => UpdateActionStatus('Taken')} style={[styles.btn, { borderColor: 'green' }]}>
              <Ionicons name='checkmark-circle-outline' size={30} color='green' />
              {
                loading ?
                  <ActivityIndicator size='small' color='green' />
                  :
                  <Text style={[styles.btnTxt, { color: 'green' }]}>Taken</Text>
              }
            </TouchableOpacity>
          </View>
        )
      }
      <TouchableOpacity style={[styles.btn, { position: 'absolute', bottom: 20, borderWidth: 0 }]} onPress={() => router.back()}>
        <Ionicons name='close-circle' size={50} color={Colors.GRAY} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white'
  },
  notification: {
    width: 120,
    height: 120
  },
  date: {
    fontSize: 18,
  },
  remainderTime: {
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.PRIMARY
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  btnTxt: {
    fontSize: 18
  }
})