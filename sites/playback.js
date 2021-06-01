import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

const Playback = () => {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
    //    require('./assets/Hello.mp3') // hämta URI från records sida
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
        <Text>
                'i have got someting to say'
            </Text>
      <Button title="Play Sound" onPress={playSound} />
    </View>
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
export default Playback;
