import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Playback() {
  const [sound, setSound] = React.useState(new Audio.Sound());
  sound.setOnPlaybackStatusUpdate();

  const getData = async () => {
    let jsonValue = null;
    try {
      await AsyncStorage.getItem('headKey', (error, result) => {jsonValue=result}) // reslutat finns bara i callback 
      return jsonValue;
    
    } catch(e) {
      console.error(e);
    }
  }
  async function playSound() {  
    const ljud = await getData()
    const { mySound } = await Audio.Sound.createAsync(
      { uri: ljud },
      { shouldPlay: true }
      );
      console.log('done playin' + ljud)
      setSound(mySound);
      
    await mySound.playAsync(); 
  }

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
