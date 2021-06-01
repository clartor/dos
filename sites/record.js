
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'


const Record = ({ navigation }) => {

const [recording, setRecording] = useState(null);

  async function startRecording() {
    try {
      console.log('requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('start recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('recordning started');
    } catch (err) {
      console.error('failed ro start recordning', err);
    }
  }
  async function stopRecording() {
        console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); // placera i nån fil - exportera för att plocka upp i playback
        console.log('Recording stopped and stored at', uri);
        Audio.setIsEnabledAsync(true)
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
        <Text>{ 'uri' }</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Record