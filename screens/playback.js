import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Playback() {
  const [sound, setSound] = React.useState(new Audio.Sound());

  const getData = async () => {
    let jsonValue = null;
    try {
      await AsyncStorage.getItem('headKey', (error, result) => {jsonValue=result})
      const JSONuri = JSON.parse(jsonValue);
      console.log(JSONuri)
      return JSONuri;    
    } catch (err) {
      console.error('lol ' + err);
    }
  }
  async function playSound() {  
    const ljud = await getData()
    const {mySound} = await Audio.Sound.createAsync(
      { uri: ljud },
      { shouldPlay: true }
      );
      setSound(mySound);      
  }

React.useEffect(() => {
    return sound
      ? () => {
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
