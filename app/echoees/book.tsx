import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useFetchDetailArtistByIdQuery } from '@/redux/features/artistApiSlice'
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const ProgressStepsComponent = () => {
  const [step1Data, setStep1Data] = useState({ eventName: '', eventDate: new Date() });
  const [step2Data, setStep2Data] = useState({ email: '', username: '' });
  const [step3Data, setStep3Data] = useState({ password: '', retypePassword: '' });

  return (
    <View style={styles.container}>
      <ProgressSteps>
        <ProgressStep label="Detail">
          <View style={styles.stepContent}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={step1Data.eventName}
              onChangeText={text => setStep1Data({ ...step1Data, eventName: text })}
            />
            <Text style={styles.label}>Date</Text>
            <DateTimePicker value={new Date()}/>

          </View>
        </ProgressStep>
        <ProgressStep label="Address">
          <View style={styles.stepContent}>
          <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={step2Data.email}
              onChangeText={text => setStep2Data({ ...step2Data, email: text })}
            />
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={step2Data.username}
              onChangeText={text => setStep2Data({ ...step2Data, username: text })}
            />
          </View>
        </ProgressStep>
        <ProgressStep label="Package">
          <View style={styles.stepContent}>
          <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={step3Data.password}
              onChangeText={text => setStep3Data({ ...step3Data, password: text })}
            />
            <Text style={styles.label}>Retype Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Retype Password"
              secureTextEntry={true}
              value={step3Data.retypePassword}
              onChangeText={text => setStep3Data({ ...step3Data, retypePassword: text })}
            />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label:{
    fontSize:16,
    marginHorizontal:5,
    marginTop:10

  },
  stepContent: {
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop:10
  },
});

export default ProgressStepsComponent;
