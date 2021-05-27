
import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'

const Record = ( {navigation} ) => {

const [recording, setRecording] = React.useState(false)

async function startRecording() {
  try {
    console.log('requesting permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS : true,
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
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
  }


  return (  
    <SafeAreaView style={{ flex:1 }}>
    <View>
    <Button 
    title="Go to ze Play"
    onPress={() => navigation.navigate('Playback')
    }/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Record