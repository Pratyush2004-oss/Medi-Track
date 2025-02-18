import AsyncStorage from "@react-native-async-storage/async-storage"

// setting data to local storage
export const setLocalStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

// getting data from local storage
export const getLocalStorage = async (key) => {
    const result = await AsyncStorage.getItem(key);
    return JSON.parse(result);
}

// removing data from local storage
export const removeLocalStorage = async () => {
    await AsyncStorage.clear();
}