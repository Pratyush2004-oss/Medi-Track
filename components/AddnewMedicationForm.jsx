import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constant/Colors'
import { Ionicons } from '@expo/vector-icons'
import { TypeList, WhenToTake } from '../constant/Options'
import { Picker } from '@react-native-picker/picker'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { formatDateForText, FormatDateTime } from '../service/ConvertDateTime'

export default function AddnewMedicationForm() {
    const [formData, setformData] = useState();
    const [showStartDate, setshowStartDate] = useState(false);
    const [showEndDate, setshowEndDate] = useState(false);

    const handleInputChange = (field, value) => {
        setformData(prev => ({
            ...prev,
            [field]: value
        }));
    };
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
                        <Text>{item.name}</Text>
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
                <View style={[{ flex: 1 }, styles.formContainer]}>
                    <Text style={styles.label}>End Date</Text>
                    <TouchableOpacity onPress={() => setshowEndDate(true)} style={styles.medicationWrapper}>
                        <Ionicons name='calendar-outline' size={20} color={Colors.PRIMARY} style={styles.icon} />
                        <Text style={styles.medicationTextInput}>{formData && formData.endDate ? formatDateForText(formData.endDate) : 'End Date'}</Text>
                        {
                            showEndDate &&
                            <RNDateTimePicker minimumDate={new Date()} onChange={(event) => {
                                handleInputChange('endDate', FormatDateTime(event.nativeEvent.timestamp))
                                setshowEndDate(false)
                            }} value={formData && formData.endDate ? new Date(formData.endDate) : new Date()} />
                        }
                    </TouchableOpacity>
                </View>
            </View>

            {/* Set Remainder */}
            
            {/* Save Button */}

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
    }
})