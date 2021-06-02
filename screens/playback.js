import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Playback() {
  const [sound, setSound] = React.useState();
  
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('headKey')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
    }
    console.log()
  }
  async function playSound() {
    console.log('Loading Sound');
                                              // här tar det stopp i terminalen 
      const { sound } = await Audio.Sound.createAsync(
      getData()
         //require('./assets/Hello.mp3')
      );
      setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}
export default Playback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
