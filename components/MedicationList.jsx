import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDateRangeToDisplay } from "../service/ConvertDateTime"
import Colors from '@/constant/Colors';
import moment from 'moment';
import { getLocalStorage } from '@/service/storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import MedicationCard from './MedicationCard';
import EmptyState from './EmptyState';

export default function MedicationList() {
    const [medList, setmedList] = useState([]);
    const [dateRange, setdateRange] = useState();
    const [selectedDate, setselectedDate] = useState(moment().format('DD-MM-YYYY'));
    const [loading, setloading] = useState(false);
    useEffect(() => {
        getDatesRangeList();
        getMedicationList(selectedDate);
    }, []);

    const getDatesRangeList = () => {
        const dateList = getDateRangeToDisplay();
        setdateRange(dateList);
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
        <View style={styles.container}>
            <Image source={require("../assets/images/medication.jpeg")} style={styles.image} />
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
                                getMedicationList(item.formattedDate);
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
                (medList.length > 1) ? (
                    <FlatList
                        style={{ marginVertical: 10 }}
                        onRefresh={() => getMedicationList(selectedDate)}
                        refreshing={loading}
                        data={medList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.docId}
                        renderItem={({ item }) => (
                            <MedicationCard medicine={item} />
                        )
                        } />
                ) : (
                    <EmptyState />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25
    },
    image: {
        height: 200,
        width: "100%",
        borderRadius: 15
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
})