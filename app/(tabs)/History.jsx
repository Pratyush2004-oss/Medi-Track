import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPreviousDateRange } from '../../service/ConvertDateTime'
import moment from 'moment';
import Colors from '../../constant/Colors';
import { getLocalStorage } from '@/service/storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import MedicationCard from '../../components/MedicationCard';
import { useRouter } from 'expo-router';
export default function History() {
  const [dateRange, setdateRange] = useState();
  const [selectedDate, setselectedDate] = useState(moment().format('DD-MM-YYYY'));
  const [loading, setloading] = useState(false);
  const [medList, setmedList] = useState([]);
  useEffect(() => {
    getDateList();
    getMedicationList(selectedDate);
  }, [selectedDate]);

  const router = useRouter();
  const getDateList = () => {
    const dates = getPreviousDateRange();
    setdateRange(dates);
  }
  const getMedicationList = async (selectedDate) => {
    try {
      setloading(true);
      const user = await getLocalStorage('userDetails');
      setmedList([]);
      const q = query(collection(db, 'medication'),
        where('user', "==", user.email),
        where('dates', 'array-contains', selectedDate));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setmedList(prev => [...prev, doc.data()]);
      })
    } catch (error) {
      console.log(error)
    }
    finally {
      setloading(false);
    }
  }
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: 'white' }}
      data={[]}
      ListHeaderComponent={
        <View style={styles.mainContainer}>
          <Image source={require('../../assets/images/med-history.png')} style={styles.image} />

          <Text style={styles.title}>Medication History</Text>
          {
            dateRange && (
              <FlatList
                style={{ marginVertical: 10 }}
                data={dateRange}
                keyExtractor={(item) => item.date}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) =>
                  <TouchableOpacity style={[styles.itemContainer, {
                    backgroundColor: item.formattedDate == selectedDate ? Colors.PRIMARY : Colors.LIGHT_PRIMARY,
                    borderColor: item.formattedDate == selectedDate ? 'black' : Colors.LIGHT_PRIMARY,
                  }]} onPress={() => {
                    setselectedDate(item.formattedDate)
                  }}>
                    <Text style={[styles.day, {
                      color: item.formattedDate == selectedDate ? Colors.LIGHT_PRIMARY : "black"
                    }]}>{item.day}</Text>
                    <Text style={[styles.date, {
                      color: item.formattedDate == selectedDate ? Colors.LIGHT_PRIMARY : "black"
                    }
                    ]}>{item.date}</Text>
                  </TouchableOpacity>
                } />
            )
          }
          {
            (medList.length > 0) ? (
              <FlatList
                style={{ marginVertical: 10 }}
                onRefresh={() => getMedicationList(selectedDate)}
                refreshing={loading}
                data={medList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.docId}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => router.push({
                    pathname: 'action-modal',
                    params: {
                      ...item,
                      type: JSON.stringify(item.type),
                      action: JSON.stringify(item.action),
                      selectedDate: selectedDate
                    }
                  })
                  }>
                    <MedicationCard medicine={item} selectedDate={selectedDate} />
                  </TouchableOpacity>
                )
                } />
            ) : (
              <View style={styles.container}>
                <Text style={styles.noMedication}>No Medication Found</Text>
              </View>
            )
          }
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
  },
  itemContainer: {
    padding: 15,
    marginRight: 10,
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 2,
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: "bold"
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMedication: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.GRAY,
    textAlign: 'center'
  }
})