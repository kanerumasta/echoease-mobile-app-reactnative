import React, { useState, useEffect } from "react";
import { TextInput, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import useFetchAddresses from "@/hooks/use-fetch-addresses";
import { Picker } from "@react-native-picker/picker";

import { z } from "zod";
import { UserSchema } from "@/schemas/user-schemas";

interface AddressPickerProps {
  provinceCode: string;
  user:z.infer<typeof UserSchema>
  onFormChange: (formData: any) => void;
}

export const AddressPicker = ({ provinceCode, onFormChange, user }: AddressPickerProps) => {
  const {
    provinces,
    fetchProvinces,
    barangays = [],
    brgyLoading,
    fetchBarangays,
    fetchMunicipalities,
    municipalities = [],
    municipalityLoading,
  } = useFetchAddresses();

  // Local state for form values
  const [street, setStreet] = useState(user.profile.street);
  const [zipcode, setZipcode] = useState(user.profile.zipcode);
  const [selectedProvince, setSelectedProvince] = useState<any>(null)
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<any>(null)
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState<any>(null);
  const [selectedBarangay, setSelectedBarangay] = useState<any>(null);
  const [selectedBarangayCode, setSelectedBarangayCode] = useState<any>(null);

  useEffect(()=>{
    fetchProvinces()
  },[])

  useEffect(() => {
    fetchMunicipalities(selectedProvinceCode);
  }, [selectedProvinceCode]);

  useEffect(() => {
    if (selectedMunicipalityCode) {
      fetchBarangays(selectedMunicipalityCode);
    }
  }, [selectedMunicipalityCode]);


  const getMunicipalityName = (municipalityCode: string) => {
    const municipality = municipalities.find((m) => m.code === municipalityCode);
    return municipality ? municipality.name : "";
  };

  return (
    <View >

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select your Province</Text>
          <View style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.5)',
            borderRadius:5,
          }}>
          <Picker placeholder="Select province" selectedValue={selectedProvinceCode} onValueChange={(code)=>setSelectedProvinceCode(code)}>
            <Picker.Item label={user.profile.province} value={null}/>
            {provinces.map((prov)=>(
                <Picker.Item label={prov.name} value={prov.code} />
            ))}
          </Picker>
          </View>

      </View>
        <View style={styles.inputContainer} >

          <Text style={styles.label}>Select city or municipality</Text>
          <View style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.5)',
            borderRadius:5,
          }}>
          <Picker placeholder="Select city/municipality" selectedValue={selectedMunicipalityCode} onValueChange={(code)=>setSelectedMunicipalityCode(code)}>
          <Picker.Item style={{color:selectedProvince ? 'rgba(0,0,0,0.3)' : '#000'}} label={!selectedProvince ? user.profile.municipality : 'Select Municipality'} value={null}/>
            {municipalities.map((municipality)=>(
                <Picker.Item label={municipality.name} value={municipality.code} />
            ))}
          </Picker>
          </View>

      </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select a barangay</Text>
          <View style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.5)',
            borderRadius:5,
          }}>
          <Picker selectedValue={selectedBarangayCode} onValueChange={(code)=>setSelectedBarangayCode(code)}>
          <Picker.Item style={{color:selectedProvince ? 'rgba(0,0,0,0.3)' : '#000'}} label={!selectedProvince ? user.profile.brgy : 'Select a Barangay'} value={null}/>
            {barangays.map((brgy)=>(
                <Picker.Item label={brgy.name} value={brgy.code}/>
            ))}
          </Picker>
          </View>
      </View>
      <View>
            <Text style={styles.label}>Street</Text>
        <TextInput
        style={styles.input}
          placeholder="Enter your street"
          value={street}
          onChangeText={(text) => {
            setStreet(text);

          }}
        />
      </View>
      <View>
        <Text style={styles.label}>Zipcode</Text>
        <TextInput
        keyboardType="numeric"
        style={styles.input}
          placeholder="Enter Zipcode"
          value={zipcode}
          onChangeText={(text) => {
            setZipcode(text);

          }}
        />
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,

    },
    label:{
        marginBottom: 6,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.5)',
    },
    inputContainer:{
        marginBottom: 14,
    }
})
