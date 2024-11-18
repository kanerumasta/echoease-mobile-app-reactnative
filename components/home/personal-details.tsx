import { z } from "zod";
import { UserSchema } from "@/schemas/user-schemas";
import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import DateTimePicker from '@react-native-community/datetimepicker';


import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice";
import { GenderPicker } from "./gender-picker";
import { AddressPicker } from "./address-picker";

type PersonalDetailsProps = {
    user: z.infer<typeof UserSchema>
};

export default function PersonalDetails({ user }: PersonalDetailsProps) {
    const [addressFormData, setAddressFormData] = useState<any>(null)
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [dateOfBirth, setDateOfBirth] = useState(new Date(user.profile.dob))
    const [phone, setPhone] = useState(user.profile?.phone || '');
    const [gender, setGender] = useState(user.profile?.gender || '');
    const [payload, setPayload] = useState<{ phone?: string, gender?: string, dob?:string }>({});
    const [showDatePicker, setShowDatePicker] = useState(false)



    useEffect(() => {
        setPayload({'gender':gender});
    }, [gender]);

    useEffect(() => {
        setPayload({'phone':phone.toString().slice(3)});
    }, [phone]);
    useEffect(() => {
        setPayload({'dob':`${dateOfBirth.getFullYear()}-${dateOfBirth.getMonth()+1}-${dateOfBirth.getDate()}`});
    }, [dateOfBirth]);

    const handleSave = useCallback(async () => {
        try {
            await updateProfile(payload).unwrap();
            Toast.show({ text2: 'Saved successfully', type: 'success' });
        } catch (error) {
            Toast.show({ text2: 'Error saving changes', type: 'error' });
        }
    }, [payload, updateProfile]);

    console.log(addressFormData)

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}>Personal Details</Text>
            <View>
                <Pair isDisabled title="Email" value={user.email} />
                <Pair isLoading={isLoading} onSave={handleSave} modalTitle="Edit Birthdate" title="Birthday" value={user.profile?.formatted_dob} >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent:'space-between',
                                alignItems: 'center',
                                marginBottom:10
                            }}
                        >
                            <Text>{dateOfBirth.toDateString()}</Text>
                            <TouchableOpacity
                            style={{
                                padding:8,
                                borderRadius:4,
                                backgroundColor:'#bf00fe'
                            }}
                            onPress={() => setShowDatePicker(true)}>
                                <Text
                                    style={{
                                        color:'#fff'
                                    }}
                                >Change Birthdate</Text>
                            </TouchableOpacity>
                        </View>
                        {showDatePicker &&
                        <DateTimePicker onChange={(e, selectedDate)=>{selectedDate && setDateOfBirth(selectedDate); setShowDatePicker(false)}} value={dateOfBirth}/>
}
                </Pair>
                <Pair isLoading={isLoading} onSave={handleSave} title="Gender" value={user.profile.gender}>
                    <GenderPicker defaultValue={user.profile.gender} onGenderChange={(genderValue)=>setGender(genderValue)} />
                </Pair>
                <Pair isLoading={isLoading} title="Phone" onSave={handleSave} modalTitle="Edit Phone" value={phone}>
                    <View style={styles.phoneInputContainer}>
                        <Ionicons name="call" />
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            defaultValue={user.profile.phone}
                        />
                    </View>
                </Pair>
                <Pair title="Address" value={user.profile.complete_address}>
                    <View>
                        <AddressPicker user={user} onFormChange={(data)=>setAddressFormData(data)} provinceCode="072200000" />
                    </View>
                </Pair>
            </View>
        </View>
    );
}
type PairProps = {
    title: string,
    isLoading?: boolean,
    modalTitle?: string,
    value: string,
    onSave?: () => void,
    isDisabled?:boolean,

    children?: React.ReactNode,
};

const Pair = ({ title, value, modalTitle, children, onSave, isLoading,isDisabled=false }: PairProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={styles.pair}>
                <Text>{title}</Text>
                <TouchableOpacity onPress={() => !isDisabled && setModalVisible(true)}>
                    <Text style={styles.valueText}>{value}</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{modalTitle}</Text>
                        {children}
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text
                                style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={async () => {
                                    if (onSave) await onSave();
                                    setModalVisible(false); // Close modal only after save
                                }}
                            >
                                {isLoading ? (
                                    <Text>Loading...</Text>
                                ) : (
                                    <>
                                        <Ionicons style={styles.iconWhite} size={18} name="save" />
                                        <Text style={styles.textWhite}>Save</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        margin: 10,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 7,
    },
    headerText: {
        marginBottom: 10,
        color: '#000000',
        opacity: 0.5,
        fontSize: 16,
    },
    pair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    valueText: {
        textTransform: 'capitalize',
        maxWidth:Dimensions.get('window').width * 0.5,
        textAlign:'left'
    },
    phoneInputContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        gap: 6,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        minWidth: '90%',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    modalTitle: {
        color: 'black',
        opacity: 0.5,
        marginBottom: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'flex-end',
        marginTop: 6,
        gap: 8,
    },
    buttonText: {
        padding:8,
        borderRadius:4,
        backgroundColor:'lightgray',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.5)',

    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        padding: 10,
        borderRadius: 5,
        gap: 6,
    },
    iconWhite: {
        color: '#fff',
    },
    textWhite: {
        color: '#fff',
    },
});
