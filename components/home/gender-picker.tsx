import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type GenderPickerProps = {
    defaultValue?: string;
    onGenderChange?: (gender: string) => void; // New prop for callback
};

export const GenderPicker = ({ defaultValue = "male", onGenderChange }: GenderPickerProps) => {
    const [gender, setGender] = useState<string>(defaultValue);

    useEffect(() => {
        if (onGenderChange) {
            onGenderChange(gender);
        }
    }, [gender, onGenderChange]);

    return (
        <View style={styles.mainContainer}>
            <GenderItem gender="male" currentGender={gender} setGender={setGender} />
            <GenderItem gender="female" currentGender={gender} setGender={setGender} />
        </View>
    );
};

type GenderItemProps = {
    currentGender: string;
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
};

const GenderItem = ({ gender, currentGender, setGender }: GenderItemProps) => {
    const isSelected = gender === currentGender;
    return (
        <TouchableOpacity
            onPress={() => setGender(gender)}
            style={[
                styles.genderItemContainer,
                { backgroundColor: isSelected ? "dodgerblue" : "lightgray" },
            ]}
        >
            <Ionicons
                size={30}
                color={isSelected ? "#fff" : "#000"}
                name={gender === "male" ? "male" : "female"}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
    genderItemContainer: {
        padding: 20,
        borderRadius: 10,
    },
});
