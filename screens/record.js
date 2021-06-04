import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'

const Record = ({ navigation }) => {
  const [recording, setRecording] = useState();
  
  const storeData = async (value) => {
    const stringed = JSON.stringify(value);
    try {
      await AsyncStorage.setItem(
        "headKey",
        stringed);
    } catch (error) {
      console.error('error storing sound: ' + error)
    }
  };
  
  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setRecordings(prevState => [...prevState, {title: title, date: date, uri:recording.getURI()}] );
    } catch (err) {
      alert('failed ro start recordning', err);
    }
  }
  
  async function stopRecording() {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(undefined);
      storeData(uri)
    } catch (e) { 
    }   
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Button
          title="Go to ze Sounds"
          onPress={() => navigation.navigate('Playback')
          } />
      </View>
      <View style={styles.container}>
        
        <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}
        />
      </View>
    </SafeAreaView>
  );
}
export default Record

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});