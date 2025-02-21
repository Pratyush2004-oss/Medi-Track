import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constant/Colors'
import { Ionicons } from '@expo/vector-icons'
import { TypeList, WhenToTake } from '../constant/Options'
import { Picker } from '@react-native-picker/picker'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { formatDateForText, FormatDateTime, formatTime, getDatesRange } from '../service/ConvertDateTime'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'
import { getLocalStorage } from '../service/storage'
import { useRouter } from 'expo-router'

export default function AddnewMedicationForm() {

    const router = useRouter();
    const [formData, setformData] = useState();
    const [showStartDate, setshowStartDate] = useState(false);
    const [showEndDate, setshowEndDate] = useState(false);
    const [showTimePicker, setshowTimePicker] = useState(false);
    const [loading, setloading] = useState(false);

    const handleInputChange = (field, value) => {
        setformData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const SaveMedication = async () => {
        try {
            setloading(true);
            const docId = Date.now().toString();
            const user = await getLocalStorage('userDetails');
            if (!(formData || formData?.name || formData?.type || formData?.dose || formData?.whenToTake || formData?.startDate || formData?.endDate || formData?.remainderTime)) {
                ToastAndroid.show('Please fill all the fields', ToastAndroid.BOTTOM);
                Alert.alert('Error', 'Please fill all the fields');
                return;
            }
            const dates = getDatesRange(formData?.startDate, formData?.endDate);
            await setDoc(doc(db, 'medication', docId), {
                ...formData,
                docId: docId,
                user: user?.email,
                dates: dates
            });
            ToastAndroid.show('Medication saved successfully', ToastAndroid.BOTTOM);
            Alert.alert('Success', 'Medication saved successfully', [
                {
                    text: 'Ok',
                    onPress: () => {
                        router.replace('(tabs)');
                    }
                }
            ]);
            setformData();
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setloading(false);
        }
    }
    return (
        <View style={styles.container}>
            {/* Medicine Name */}
            <Text style={styles.title}>Add New Medication</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Medication Name</Text>
                <View style={styles.medicationWrapper}>
                    <Ionicons name='medkit-outline' size={25} color={Colors.PRIMARY} style={styles.icon} />
                    <TextInput placeholder='Medicine Name' style={styles.medicationTextInput}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                </View>
            </View>

            {/* Type */}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={TypeList} key={(id) => id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.inputBtn, { backgroundColor: (formData && formData.type && item.name == formData.type.name) ? Colors.PRIMARY : Colors.LIGHT_PRIMARY }]} onPress={() => handleInputChange('type', item)}>
                        <Text style={{ color: (formData && formData.type && item.name == formData.type.name) ? 'white' : 'black' }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                style={styles.inputBtnWrappers}
            />
            {/* Dose */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Dose</Text>
                <View style={styles.medicationWrapper}>
                    <Ionicons name='eyedrop-outline' size={25} color={Colors.PRIMARY} style={styles.icon} />
                    <TextInput placeholder='Dose Ex: 2, 4' style={styles.medicationTextInput}
                        onChangeText={(value) => handleInputChange('dose', value)}
                    />
                </View>
            </View>

            {/* When To Take */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>When to Take</Text>
                <View style={[styles.medicationWrapper, { paddingVertical: 0 }]}>
                    <Ionicons name='time-outline' size={25} color={Colors.PRIMARY} style={styles.icon} />
                    <Picker
                        style={{ width: "85%" }}
                        selectedValue={''}
                        onValueChange={(value) => handleInputChange('whenToTake', value)}
                    >
                        <Picker.Item label="When To Take" value="" />
                        {WhenToTake.map((item, index) => (
                            <Picker.Item key={index} label={item} value={item} />
                        ))}
                    </Picker>
                </View>
            </View>

            {/* Date Picker */}
            <View style={styles.dateInputGroup}>
                <View style={[styles.formContainer, { flex: 1 }]}>
                    <Text style={styles.label}>Start Date</Text>
                    <TouchableOpacity onPress={() => setshowStartDate(true)} style={styles.medicationWrapper}>
                        <Ionicons name='calendar-outline' size={20} color={Colors.PRIMARY} style={styles.icon} />
                        <Text style={styles.medicationTextInput}>{formData && formData.startDate ? formatDateForText(formData.startDate) : 'Start Date'}</Text>
                        {
                            showStartDate &&
                            <RNDateTimePicker minimumDate={new Date()} onChange={(event) => {
                                handleInputChange('startDate', FormatDateTime(event.nativeEvent.timestamp))
                                setshowStartDate(false)
                            }} value={formData && formData.startDate ? new Date(formData.startDate) : new Date()} />
                        }
                    </TouchableOpacity>
                </View>
                {
                    formData && formData.startDate && (
                        <View style={[{ flex: 1 }, styles.formContainer]}>
                            <Text style={styles.label}>End Date</Text>
                            <TouchableOpacity onPress={() => setshowEndDate(true)} style={styles.medicationWrapper}>
                                <Ionicons name='calendar-outline' size={20} color={Colors.PRIMARY} style={styles.icon} />
                                <Text style={styles.medicationTextInput}>{formData && formData.endDate ? formatDateForText(formData.endDate) : 'End Date'}</Text>
                                {
                                    showEndDate &&
                                    <RNDateTimePicker minimumDate={formData && formData.startDate ? new Date(formData.startDate) : new Date()} onChange={(event) => {
                                        handleInputChange('endDate', FormatDateTime(event.nativeEvent.timestamp))
                                        setshowEndDate(false)
                                    }} value={formData && formData.endDate ? new Date(formData.endDate) : new Date()} />
                                }
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>

            {/* Set Remainder input */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Set Remainder</Text>
                <TouchableOpacity onPress={() => setshowTimePicker(true)} style={styles.medicationWrapper}>
                    <Ionicons name='timer-outline' size={20} color={Colors.PRIMARY} style={styles.icon} />
                    <Text style={styles.medicationTextInput}>{formData && formData.remainderTime ? formData.remainderTime : 'Set Remainder Time'}</Text>
                    {
                        showTimePicker &&
                        <RNDateTimePicker mode='time' onChange={(event) => {
                            handleInputChange('remainderTime', formatTime(event.nativeEvent.timestamp))
                            setshowTimePicker(false)
                        }} value={formData && formData.remainderTime ? new Date(formData.endDate) : new Date()} />
                    }
                </TouchableOpacity>
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.btn} onPress={SaveMedication}>
                {
                    loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.btnTxt}>Add New Medication</Text>
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    formContainer: {
        marginTop: 10,
    },
    label: {
        color: Colors.DARK_GRAY
    },
    medicationWrapper: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 10,
        gap: 10,
        marginTop: 5
    },
    medicationTextInput: {
        fontSize: 16,
        flex: 1,
    },
    icon: {
        borderColor: Colors.GRAY,
        borderRightWidth: 2,
        paddingRight: 10,
    },
    inputBtnWrappers: {
        marginTop: 10
    },
    inputBtn: {
        backgroundColor: Colors.LIGHT_PRIMARY,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5
    },
    dateInputGroup: {
        flexDirection: 'row',
        width: "100%",
        gap: 10
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    btnTxt: {
        color: 'white',
        fontSize: 18
    }
})