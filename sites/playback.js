
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'

const Playback = () => {
    return (
        <View style={styles.container}>
            <Text>
                'i have got someting to say'
            </Text>
        </View>
    )
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
